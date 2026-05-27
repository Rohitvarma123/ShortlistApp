require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Health check route (optional but useful in ECS)
app.get('/', (req, res) => {
    res.send('Backend is running 🚀');
});

// Send email API
app.post('/send-email', async (req, res) => {

    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Angular Contact Form',
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
            `
        });

        res.status(200).send('Email Sent Successfully');

    } catch (error) {
        console.log(error);
        res.status(500).send('Email Failed');
    }
});

// ✅ IMPORTANT FIX FOR ECS (0.0.0.0)
app.listen(3000, "0.0.0.0", () => {
    console.log('Server running on port 3000');
});
