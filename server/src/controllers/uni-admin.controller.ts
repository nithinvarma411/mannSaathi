import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../models/User";
import { z } from "zod";
import { initiateUniAdmin, loginUser, verifyOtpAndCreateUniAdmin } from "../services/uni-admin.service";

/** Step 1: Send OTP for Uni-Admin setup */
export async function initiateUniAdminController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const body = z.object({
      aisheCode: z.string().regex(/^([UCS])-\d{4,5}$/),
      name: z.string().min(3),
      email: z.string().email(),
      phone: z.string().min(10),
      uid: z.string()
    }).parse(req.body);

    const res = await initiateUniAdmin(req.server, body.aisheCode, body.name, body.email, body.phone, body.uid);

    return reply.code(res.statusCode).send(res);
  } catch (err: any) {
    console.error(`Error in uni-admin.controller.ts -> initiateUniAdminController: ${err.message}`);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

/** Step 2: Verify OTP and create Uni-Admin user */
export async function verifyUniAdminController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const body = z.object({
      email: z.string().email(),
      otp: z.string(),
      password: z.string().min(6),
    }).parse(req.body);

    const res = await verifyOtpAndCreateUniAdmin(body.email, body.otp, body.password);
    console.log(res);
    

    return reply.code(res.statusCode).send(res);
  } catch (err: any) {
    console.error(`Error in uni-admin.controller.ts -> verifyUniAdminController: ${err.message}`);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}
export async function loginUniAdmin(req: FastifyRequest, reply: FastifyReply) {
  try {
    const body = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }).parse(req.body);

    const res = await loginUser(body.email, body.password);
    console.log(res);
    

    return reply.code(res.statusCode).send(res);
  } catch (err: any) {
    console.error(`Error in uni-admin.controller.ts -> verifyUniAdminController: ${err.message}`);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function listCounsellorsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Only uni-admins allowed
    if (req.user.role !== "uni-admin") {
      return reply.code(403).send({ error: "Forbidden: Uni-Admin only" });
    }

    const uniId = req.user.uniId;
    if (!uniId) {
      return reply.code(400).send({ error: "Missing university ID in token" });
    }

    // Pagination: parse query params
    const querySchema = z.object({
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).default(20),
    });
    const { page, limit } = querySchema.parse(req.query);

    const maxLimit = 100; // Prevent too large requests
    const limitNum = Math.min(limit, maxLimit);
    const skip = (page - 1) * limitNum;

    // Total counsellors count
    const total = await User.countDocuments({
      universityId: uniId,
      role: "counsellor",
    });

    // Fetch paginated counsellors
    const counsellors = await User.find(
      { universityId: uniId, role: "counsellor" },
      { password: 0 } // exclude password
    )
      .skip(skip)
      .limit(limitNum)
      .lean();

    return reply.code(200).send({
      data: counsellors,
      pagination: {
        total,
        page,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err: any) {
    console.error(
      `Error in uni-admin.controller.ts -> listCounsellorsController:`,
      err?.stack || err
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function searchUserByUidController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Only uni-admins allowed
    if (req.user.role !== "uni-admin") {
      return reply.code(403).send({ error: "Forbidden: Uni-Admin only" });
    }

    const uniId = req.user.uniId;
    if (!uniId) {
      return reply.code(400).send({ error: "Missing university ID in token" });
    }

    // Parse query param: uid
    const querySchema = z.object({
      uid: z.string().min(1, "UID is required"),
    });
    const { uid } = querySchema.parse(req.query);

    // Search user only within this university
    const user = await User.findOne(
      { universityId: uniId, uid },
      { password: 0 } // exclude sensitive info
    ).lean();

    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }

    return reply.code(200).send({ data: user });
  } catch (err: any) {
    console.error(
      `Error in uni-admin.controller.ts -> searchUserByUidController:`,
      err?.stack || err
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}