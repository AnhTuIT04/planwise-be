import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, 
      },
    });
  }

  async sendVerificationEmail(to: string, code: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Email Verification',
      html: `
        <h3>Verify Your Email</h3>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>This code will expire in 5 minutes.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  async sendOtpEmail(to: string, otp: string) {
    const minutes = process.env.OTP_EXP_MINUTES || '5';
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Password Reset OTP',
      html: `
        <h3>Password Reset Request</h3>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This code will expire in ${minutes} minutes.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error('Failed to send OTP email');
    }
  }
}