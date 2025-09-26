import { config } from "../config/index";
import nodemailer from "nodemailer";

export interface OtpProvider {
  send(to: string, message: string): Promise<void>;
}

/** Nodemailer provider: send OTP via email */
export class EmailOtpProvider implements OtpProvider {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure, // true for 465, false for 587
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    });
  }

  async send(toEmail: string, message: string) {
    try {
      await this.transporter.sendMail({
        from: `"Hackathon Auth" <${config.smtpUser}>`,
        to: toEmail,
        subject: "Your OTP Code",
        text: message,
      });
      console.log(`✅ OTP email sent to ${toEmail}`);
    } catch (err: any) {
      console.error(
        `Error in otp.ts -> EmailOtpProvider.send: ${err.message || err}`
      );
      throw new Error("Failed to send OTP email");
    }
  }
}

export function generateOtp(length = config.otpLength) {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}
