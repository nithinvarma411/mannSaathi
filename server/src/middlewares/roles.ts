import { FastifyRequest, FastifyReply } from "fastify";

export const requireRole = (...roles: string[]) =>
  async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).user as { role?: string };

      if (!user || !user.role || !roles.includes(user.role)) {
        return reply.code(403).send({ error: "Forbidden: Insufficient role" });
      }
    } catch (err: any) {
      console.error(`Error in roles.ts -> requireRole: ${err.message || err}`);
      return reply.code(500).send({ error: "Internal Server Error" });
    }
  };
