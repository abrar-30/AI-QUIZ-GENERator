import nodemailer from "nodemailer";

// Configure transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // for Gmail
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password for Gmail
  },
});

/**
 * Send quiz result email
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} html - email content in HTML
 */
export async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"AI Quiz " <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Email send error:", err);
  }
}
