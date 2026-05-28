const nodemailer = require("nodemailer");

const status = process.env.STATUS;
const runUrl = process.env.RUN_URL;

async function sendMail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `CI/CD Pipeline ${status}`,
    text: `
Pipeline Status: ${status}

Run Details: ${runUrl}

Check GitHub Actions logs for full details.
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent successfully");
}

sendMail().catch(console.error);
