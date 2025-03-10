import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { to, subject, formData, formType } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let emailContent = '';
    const timestamp = new Date().toLocaleString();

    switch (formType) {
      case 'contact':
        emailContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          ${formData.email ? `<p><strong>Email:</strong> ${formData.email}</p>` : ''}
          <p><strong>Message:</strong> ${formData.message}</p>
        `;
        break;

      case 'tour':
        emailContent = `
          <h2>New Campus Tour Request</h2>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          ${formData.email ? `<p><strong>Email:</strong> ${formData.email}</p>` : ''}
          <p><strong>Preferred Location:</strong> ${formData.location}</p>
          <p><strong>Preferred Date:</strong> ${formData.date}</p>
          <p><strong>Preferred Time:</strong> ${formData.time}</p>
          <p><strong>Program of Interest:</strong> ${formData.program}</p>
        `;
        break;

      case 'enrollment':
        emailContent = `
          <h2>New Enrollment Request</h2>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          ${formData.email ? `<p><strong>Email:</strong> ${formData.email}</p>` : ''}
          <p><strong>Course:</strong> ${formData.course}</p>
          <p><strong>Start Date:</strong> ${formData.startDate}</p>
          <p><strong>Location:</strong> ${formData.location}</p>
        `;
        break;

      default:
        throw new Error('Invalid form type');
    }

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 