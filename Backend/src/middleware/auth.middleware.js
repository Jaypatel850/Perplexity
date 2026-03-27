const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generic middleware to check validation results and return errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
            })),
        });
    }
    next();
};

// JWT verification middleware to protect routes
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired. Please login again." });
        }
        return res.status(403).json({ message: "Invalid token." });
    }
};

module.exports = { validate, verifyToken };
