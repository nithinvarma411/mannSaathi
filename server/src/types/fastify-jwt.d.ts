import "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { sub: string; role: string; uniId?: string };
    user: { sub: string; role: string; uniId?: string };
  }
}

declare module "fastify" {
  interface FastifyRequest {
    userJwtVerify: () => Promise<void>; // from namespace: "userJwt"
    adminJwtVerify: () => Promise<void>; // from namespace: "adminJwt"
    user?: { sub: string; role: string; uniId?: string };
    admin?: { sub: string; role: "admin" };
  }

  interface FastifyReply {
    userJwtSign: (payload: any, options?: any) => Promise<string>;
    adminJwtSign: (payload: any, options?: any) => Promise<string>;
  }

  interface FastifyInstance {
    authenticateUser: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
    authenticateAdmin: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}
