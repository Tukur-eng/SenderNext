import nodemailer from 'nodemailer';


export async function sendFile(
  to: string,
  subject: string,
  text: string,
  originalFilename: string,
  fileBuffer: Buffer

) {
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true, // Add this line
      minVersion: 'TLSv1.2',
    }
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject,
    text,
    attachments: [
      {
        filename: originalFilename,
        content: fileBuffer,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}
