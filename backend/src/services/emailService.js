import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: +SMTP_PORT,
    secure: false,
    auth: SMTP_USER
      ? {
          user: SMTP_USER,
          pass: SMTP_PASS,
        }
      : undefined,
  });
};

const transporter = createTransporter();

export const sendConfirmationEmail = async (patientEmail, patientName) => {
  try {
    const mailOptions = {
      from: '"Patient Registration" <noreply@example.com>',
      to: patientEmail,
      subject: 'Registration Confirmation',
      html: `
        <h1>Welcome ${patientName}!</h1>
        <p>Your registration has been successfully completed.</p>
        <p>Thank you for registering with our service.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${patientEmail}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};
