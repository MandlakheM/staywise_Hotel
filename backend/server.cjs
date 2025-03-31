const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("EMAIL_USER or EMAIL_PASS environment variables are not set");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/send", (req, res) => {
  const { from, to, subject, message } = req.body;

  if (!from || !to || !subject || !message) {
    return res.status(400).send("Missing required fields");
  }

  const mailOptions = {
    from,
    to,
    subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email: " + error.message);
    }
    res.status(200).send("Email sent successfully");
  });
});

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Server running on port ${port}`));
