// controllers/auth.controller.js
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendWelcomeEmail = require("../services/Email.service");
require("dotenv").config();

// Reusable cookie options for production-grade security
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // Protects against CSRF attacks
    maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Generate token AND a 24-hour expiration date
        const verificationToken = crypto.randomBytes(20).toString('hex');
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); 

        const newUser = await User.create({ 
            username, 
            email, 
            password: hashedPassword, 
            verificationToken,
            verificationTokenExpiry
        });

        // Fire off the email WITHOUT awaiting it so the user isn't stuck waiting 
        // if Gmail's servers are slow, and so a failed email doesn't crash the registration.
        sendWelcomeEmail(newUser.email, newUser.username, verificationToken).catch(err => {
            console.error("Non-fatal: Failed to send email to new user:", err);
        });

        // Notice: We do NOT generate a JWT or set a cookie here anymore.
        // They must verify their email first!
        res.status(201).json({ message: "User created successfully. Please check your email to verify." });

    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params; 
        const user = await User.findOne({ verificationToken: token });

        const frontendUrl ="http://localhost:5173";

        // Check if user exists OR if the token has expired
        if (!user || user.verificationTokenExpiry < Date.now()) {
            return res.redirect(`${frontendUrl}/login?error=invalid_token`);
        }

        // Verify user and clean up database fields
        user.verified = true;
        user.verificationToken = undefined; 
        user.verificationTokenExpiry = undefined;
        await user.save();

        // Now that they are verified, log them in automatically!
        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", authToken, cookieOptions);

        return res.redirect(`${frontendUrl}/login?verified=true`);

    } catch (error) {
        console.error("Verification error:", error);
        const frontendUrl ="http://localhost:5173";
        res.redirect(`${frontendUrl}/login?error=server_error`);
    }
};

const ResendVerificationMail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.verified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        // Generate a fresh token and a new 24-hour expiration date
        const verificationToken = crypto.randomBytes(20).toString("hex");
        user.verificationToken = verificationToken;
        user.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await user.save();

        // Await is fine here since the user explicitly clicked a "Resend" button 
        // and expects a loading state until it finishes
        await sendWelcomeEmail(user.email, user.username, verificationToken);
        
        res.status(200).json({ message: "Verification email resent successfully" });

    } catch (error) {
        console.error("Resend verification email error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        // Block unverified users immediately
        if (user.verified === false) {
            return res.status(403).json({ message: "Please verify your email before logging in", needsVerification: true });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, cookieOptions);
        
        // Return the user (excluding password) along with the success message
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({ 
            message: "Login successful",
            user: userResponse
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const logout = (req, res) => {
    res.clearCookie("token", cookieOptions);
    res.status(200).json({ message: "Logout successful" });
};
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Get me error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { register, verifyEmail, ResendVerificationMail, login, getMe , logout};