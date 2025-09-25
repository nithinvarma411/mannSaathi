import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { config } from "../config/index";
import { FastifyReply, FastifyRequest } from "fastify";

export default fp(async (app) => {
  app.register(jwt, {
    secret: config.jwtSecret,
    cookie: {
      cookieName: "token",
      signed: false,
    },
  });

  // User authentication (students, counsellors, uni-admins all count as "users")
  app.decorate(
    "authenticateUser",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        if (
          !["student", "counsellor", "uni-admin"].includes(request.user.role)
        ) {
          return reply.code(403).send({ error: "Forbidden" });
        }
      } catch {
        reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );

  // Platform Admin authentication
  app.decorate(
    "authenticateAdmin",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        if (request.user.role !== "admin") {
          return reply.code(403).send({ error: "Forbidden" });
        }
      } catch {
        reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );

  // University Admin authentication
  app.decorate(
    "authenticateUniAdmin",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        if (request.user.role !== "uni-admin") {
          return reply.code(403).send({ error: "Forbidden" });
        }
      } catch {
        reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );
});

declare module "fastify" {
  interface FastifyInstance {
    authenticateUser: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authenticateAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authenticateUniAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    user: { sub: string; role: string; uniId?: string };
  }
}

