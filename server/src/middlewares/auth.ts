import { FastifyRequest, FastifyReply } from "fastify";

// Require user JWT
export async function requireUserAuth(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
    if (req.user.role !== "uni-admin" && req.user.role !== "student" && req.user.role !== "counsellor") {
      return reply.code(403).send({ error: "Forbidden (User only)" });
    }
  } catch (err: any) {
    console.error(`Error in auth.ts -> requireUserAuth: ${err.message || err}`);
    return reply.code(401).send({ error: "Unauthorized (User)" });
  }
}

// Require admin JWT
export async function requireAdminAuth(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
    if (req.user.role !== "admin") {
      return reply.code(403).send({ error: "Forbidden (Admin only)" });
    }
  } catch (err: any) {
    console.error(`Error in auth.ts -> requireAdminAuth: ${err.message || err}`);
    return reply.code(401).send({ error: "Unauthorized (Admin)" });
  }
}
