// services/Email.service.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendWelcomeEmail = async (recipientEmail, username, verificationToken) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Missing EMAIL_USER or EMAIL_PASS environment variables");
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // This points exactly to your Express backend route
        const baseUrl ="http://localhost:3000";
        const verifyUrl = `${baseUrl}/api/auth/verify/${verificationToken}`;

        const info = await transporter.sendMail({
            from: `"Perplexity Clone" <${process.env.EMAIL_USER}>`,
            to: recipientEmail,
            subject: 'Verify your email address',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Welcome, ${username}!</h2>
                    <p>Please verify your email to unlock your account. This link will expire in 24 hours.</p>
                    <div style="margin: 30px 0;">
                        <a href="${verifyUrl}" style="padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify Email</a>
                    </div>
                    <p style="color: #666; font-size: 14px;">Or click this link directly: <br><a href="${verifyUrl}">${verifyUrl}</a></p>
                </div>
            `,
        });

        console.log('Welcome email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
    }
};

module.exports = sendWelcomeEmail;