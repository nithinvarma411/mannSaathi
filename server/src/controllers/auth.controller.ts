import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { initiateFirstPassword, verifyOtpAndSetPassword, login } from "../services/auth.service";

export async function initiateFirstPasswordController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = z.object({ email: z.string().email() }).parse(req.body);
    const res = await initiateFirstPassword(req.server, body.email);

    if (!res.ok) return reply.code(400).send(res);
    return reply.code(200).send({ message : "OTP sent successfully", ok : true});
  } catch (err: any) {
    console.error(
      `Error in auth.controller.ts -> initiateFirstPasswordController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function verifyOtpAndSetPasswordController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = z
      .object({
        email: z.string().email(),
        otp: z.string(),
        password: z.string().min(6),
      })
      .parse(req.body);

    const res = await verifyOtpAndSetPassword(
      body.email,
      body.otp,
      body.password
    );

    if (!res.ok) return reply.code(400).send(res);
    return reply.code(500).send({ message : "Password created successfully", ok : true});
  } catch (err: any) {
    console.error(
      `Error in auth.controller.ts -> verifyOtpAndSetPasswordController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function loginController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = z
      .object({
        uid: z.string(),
        password: z.string(),
      })
      .parse(req.body);

    const res = await login(body.uid, body.password);

    if (!res.ok || !res.user)
      return reply.code(401).send({ error: "Invalid credentials" });

    let payload: any = { 
      sub: String(res.user._id),
      uid: res.user.uid,
    };

    // Case 1: University User
    if ("role" in res.user) {
      payload.role = res.user.role;
      payload.uniId = String(res.user.universityId);
    }
    // Case 2: Platform Admin
    else {
      payload.role = "admin";
    }

    const token = await reply.jwtSign(payload, { expiresIn: "7d" });

    reply.setCookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return reply.code(200).send({ message: "Login Successful", ok: true });
  } catch (err: any) {
    console.error(
      `Error in auth.controller.ts -> loginController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}
