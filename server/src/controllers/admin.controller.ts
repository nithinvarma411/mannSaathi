import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {
  initiateAdminFirstPassword,
  verifyAdminOtpAndSetPassword,
  adminLogin,
} from "../services/admin.service";

/** Step 1: Initiate first password for admin */
export async function initiateAdminFirstPasswordController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = z.object({ email: z.string().email() }).parse(req.body);
    const res = await initiateAdminFirstPassword(req.server, body.email);

    if (!res.ok) return reply.code(400).send(res);
    return reply.code(200).send({ message: "Sending OTP" });
  } catch (err: any) {
    console.error(
      `Error in admin.controller.ts -> initiateAdminFirstPasswordController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

/** Step 2: Verify OTP and set password */
export async function verifyAdminOtpAndSetPasswordController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = z
      .object({
        email: z.string().email(),
        otp: z.string(),
        password: z.string().min(8),
      })
      .parse(req.body);

    const res = await verifyAdminOtpAndSetPassword(
      body.email,
      body.otp,
      body.password
    );

    if (!res.ok) return reply.code(400).send(res);
    return reply.code(200).send({ message: "OTP Sent Successfully" });
  } catch (err: any) {
    console.error(
      `Error in admin.controller.ts -> verifyAdminOtpAndSetPasswordController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

/** Step 3: Admin login */
export async function adminLoginController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = z
      .object({
        email: z.string().email(),
        password: z.string(),
      })
      .parse(req.body);

    const res = await adminLogin(body.email, body.password);

    if (!res.ok || !res.admin)
      return reply.code(401).send({ error: "Invalid credentials" });

    console.log("Available reply methods:", Object.keys(reply));

    const token = await reply.jwtSign(
      {
        sub: String(res.admin._id),
        role: "admin",
      },
      { expiresIn: "7d" }
    );

    reply.setCookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Changed to be consistent
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return reply.code(200).send({ message: "Admin login Successful" });
  } catch (err: any) {
    console.error(
      `Error in admin.controller.ts -> adminLoginController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}
