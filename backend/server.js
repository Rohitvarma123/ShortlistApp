require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.send('Backend is running 🚀');
});

// Gmail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// VERIFY SMTP CONNECTION (IMPORTANT DEBUG STEP)
transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP ERROR ❌:", error);
    } else {
        console.log("SMTP READY ✔ Email service connected");
    }
});

// Send email API
app.post('/send-email', async (req, res) => {

    console.log("REQUEST RECEIVED ✔");

    const { name, email, message } = req.body;

    try {
        console.log("SENDING EMAIL...");

        const info = await transporter.sendMail({
            from: `"Angular App" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'Angular Contact Form',
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
            `
        });

        console.log("EMAIL SENT ✔:", info.messageId);

        return res.status(200).json({
            message: "Email Sent Successfully ✔"
        });

    } catch (error) {
        console.log("EMAIL ERROR ❌:", error);

        return res.status(500).json({
            message: "Email Failed ❌",
            error: error.message
        });
    }
});

// IMPORTANT FOR ECS
app.listen(3000, "0.0.0.0", () => {
    console.log('Server running on port 3000');
});
