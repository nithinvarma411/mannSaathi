import { FastifyInstance } from "fastify";
import { OtpToken } from "../models/OtpToken";
import { User } from "../models/User";
import { University } from "../models/University";
import { generateOtp, EmailOtpProvider } from "../lib/otp";
import { hashPassword, verifyPassword } from "../utils/password";

const otpProvider = new EmailOtpProvider();

/** Step 1: Initiate Uni-Admin creation by sending OTP */
export async function initiateUniAdmin(
  app: FastifyInstance,
  aisheCode: string,
  name: string,
  email: string,
  phone: string,
  uid: string
) {
  try {
    // ✅ Find university by AISHE code
    const uni = await University.findOne({ aisheCode });
    if (!uni) {
      return { statusCode: 404, ok: false, message: "University not found" };
    }

    // ✅ Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return { statusCode: 400, ok: false, message: "User already exists with this email" };
    }    

    // ✅ Generate OTP
    const code = generateOtp();

    await OtpToken.create({
      email,
      code,
      purpose: "UNI_ADMIN_REG",
      meta: {
        universityId: uni._id, // get from the found university
        name,
        phone,
        uid
      },
    });

    await otpProvider.send(email, `Your OTP for Uni-Admin setup is ${code}. Valid for 5 minutes.`);
    

    app.log.info({ email, universityId: uni._id }, "OTP generated for Uni-Admin creation");

    return {
      statusCode: 200,
      ok: true,
      message: "OTP sent successfully",
      data: { email },
    };
  } catch (err: any) {
    console.error(`Error in uni-admin.service.ts -> initiateUniAdmin: ${err.message}`);
    return { statusCode: 500, ok: false, message: "Internal server error" };
  }
}


/** Step 2: Verify OTP and create Uni-Admin user */
export async function verifyOtpAndCreateUniAdmin(email: string, otp: string, password: string) {
  try {
    const token = await OtpToken.findOne({ email, code: otp, purpose: "UNI_ADMIN_REG" });
    if (!token) {
      return { statusCode: 400, ok: false, message: "Invalid or expired OTP" };
    }

    console.log("token", token);
    

    const { universityId, name, phone, uid } = token.meta || {};
    console.log("uid", uid);
    
    if (!universityId || !name || !phone || !uid) {
      return { statusCode: 400, ok: false, message: "Missing registration details" };
    }

    const user = await User.create({
      universityId,
      name,
      uid,
      email,
      phone,
      role: "uni-admin",
      passwordHash: await hashPassword(password),
      isActive: true,
    });

    await OtpToken.deleteMany({ email, purpose: "UNI_ADMIN_REG" });
    

    return { statusCode: 201, ok: true, message: "Uni-admin created successfully", data: { userId: user._id } };
  } catch (err: any) {
    console.error(`Error in uni-admin.service.ts -> verifyOtpAndCreateUniAdmin: ${err.message}`);
    return { statusCode: 500, ok: false, message: "Internal server error" };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    // Step 1: Find the user by email. Explicitly select the password hash.
    const user = await User.findOne({ email }).select("+passwordHash");

    // Step 2: If no user is found, return an authentication error.
    if (!user) {
      return { statusCode: 401, ok: false, message: "Invalid email or password" };
    }
    if(!user.passwordHash){
      return { statusCode: 401, ok: false, message: "Invalid password" };
    }
    // Step 3: Compare the provided password with the stored hash.
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return { statusCode: 401, ok: false, message: "Invalid email or password" };
    }

    // Step 4: Check if the user's account is active.
    if (!user.isActive) {
      return { statusCode: 403, ok: false, message: "Account is inactive. Please contact support." };
    }

    //JWT HERE

    const userData = user.toObject();
    delete userData.passwordHash;

    return {
      statusCode: 200,
      ok: true,
      message: "Login successful",
      data: {
        //token
        user: userData,
      },
    };
  } catch (err: any) {
    console.error(`Error in auth.service.ts -> loginUser: ${err.message}`);
    return { statusCode: 500, ok: false, message: "Internal server error" };
  }
}