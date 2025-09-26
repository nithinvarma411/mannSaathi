import { FastifyInstance } from "fastify";
import { User } from "../models/User";
import { OtpToken } from "../models/OtpToken";
import { generateOtp, EmailOtpProvider } from "../lib/otp";
import { hashPassword, verifyPassword } from "../utils/password";

const otpProvider = new EmailOtpProvider();

/** Initiate first-time password setup by sending OTP */
export async function initiateFirstPassword(app: FastifyInstance, email: string) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { statusCode: 404, ok: false, message: "User not found" };
    }
    if (user.passwordHash) {
      return { statusCode: 400, ok: false, message: "Password already set" };
    }

    const code = generateOtp();
    await OtpToken.create({ userId: user._id, code, purpose: "SET_PASSWORD" });
    await otpProvider.send(user.email, `Your OTP is ${code}. Valid for 5 minutes.`);

    app.log.info({ email }, "OTP generated for first-time password");
    return { statusCode: 200, ok: true, message: "OTP sent successfully", data: { email } };
  } catch (err: any) {
    console.error(`Error in auth.service.ts -> initiateFirstPassword: ${err.message}`);
    return { statusCode: 500, ok: false, message: "Internal server error" };
  }
}

/** Verify OTP and set the user’s password */
export async function verifyOtpAndSetPassword(userEmail: string, otp: string, newPassword: string) {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return { statusCode: 404, ok: false, message: "User not found" };
    }

    const token = await OtpToken.findOne({ userId: user._id, code: otp, purpose: "SET_PASSWORD" });
    if (!token) {
      return { statusCode: 400, ok: false, message: "Invalid or expired OTP" };
    }

    user.passwordHash = await hashPassword(newPassword);
    await user.save();
    await OtpToken.deleteMany({ userId: user._id, purpose: "SET_PASSWORD" });

    return { statusCode: 200, ok: true, message: "Password set successfully", data: { userId: user._id } };
  } catch (err: any) {
    console.error(`Error in auth.service.ts -> verifyOtpAndSetPassword: ${err.message}`);
    return { statusCode: 500, ok: false, message: "Internal server error" };
  }
}

/** User login with uid + password */
export async function login(uid: string, password: string) {
  try {
    const user = await User.findOne({ uid });
    if (!user || !user.passwordHash) {
      return { statusCode: 401, ok: false, message: "Invalid uid or password" };
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return { statusCode: 401, ok: false, message: "Invalid uid or password" };
    }

    return {
      statusCode: 200,
      ok: true,
      message: "Login successful",
      user
    };
  } catch (err: any) {
    console.error(`Error in auth.service.ts -> login: ${err.message}`);
    return { statusCode: 500, ok: false, message: "Internal server error" };
  }
}
