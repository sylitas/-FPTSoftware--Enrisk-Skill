import nodemailer from 'nodemailer';

const { adminEmail: user, adminPassword: pass } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: { user, pass },
});

const sendMail = async (email, mailInfo) =>
  transporter.sendMail({
    from: user,
    to: email,
    subject: mailInfo.subject,
    text: mailInfo.text,
  });

export { sendMail };
