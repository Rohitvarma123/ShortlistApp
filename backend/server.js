require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({

    service: 'gmail',

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


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


app.listen(3000, () => {

    console.log('Server running on port 3000');

});
