import { FastifyInstance } from "fastify";
import { Admin } from "../models/Admin";
import { OtpToken } from "../models/OtpToken";
import { generateOtp, EmailOtpProvider } from "../lib/otp";
import { hashPassword, verifyPassword } from "../utils/password";

const otpProvider = new EmailOtpProvider();

export async function initiateAdminFirstPassword(app: FastifyInstance, email: string) {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return { ok: false, reason: "NO_ADMIN" };
    if (admin.passwordHash) return { ok: false, reason: "ALREADY_SET" };

    const code = generateOtp();
    await OtpToken.create({ userId: admin._id, code, purpose: "SET_ADMIN_PASSWORD" });
    await otpProvider.send(admin.email, `Your OTP is ${code}. Valid for 5 minutes.`);

    app.log.info({ email }, "OTP generated for admin first-time password");
    return { ok: true };
  } catch (err: any) {
    console.error(`Error in admin.service.ts -> initiateAdminFirstPassword: ${err.message}`);
    return { ok: false, reason: "SERVER_ERROR" };
  }
}

export async function verifyAdminOtpAndSetPassword(email: string, otp: string, newPassword: string) {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return { ok: false, reason: "NO_ADMIN" };

    const token = await OtpToken.findOne({ userId: admin._id, code: otp, purpose: "SET_ADMIN_PASSWORD" });
    if (!token) return { ok: false, reason: "BAD_OTP" };

    admin.passwordHash = await hashPassword(newPassword);
    await admin.save();
    await OtpToken.deleteMany({ userId: admin._id, purpose: "SET_ADMIN_PASSWORD" });

    return { ok: true };
  } catch (err: any) {
    console.error(`Error in admin.service.ts -> verifyAdminOtpAndSetPassword: ${err.message}`);
    return { ok: false, reason: "SERVER_ERROR" };
  }
}

export async function adminLogin(email: string, password: string) {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !admin.passwordHash) return { ok: false, reason: "BAD_CREDENTIALS" };

    const ok = await verifyPassword(password, admin.passwordHash);
    if (!ok) return { ok: false, reason: "BAD_CREDENTIALS" };

    return { ok: true, admin };
  } catch (err: any) {
    console.error(`Error in admin.service.ts -> adminLogin: ${err.message}`);
    return { ok: false, reason: "SERVER_ERROR" };
  }
}
