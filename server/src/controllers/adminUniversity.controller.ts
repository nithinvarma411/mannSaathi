import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { approveUniversity, declineUniversity } from "../services/university.service";
import { PendingUniversity } from "../models/PendingUniversity";

/** List all pending universities */
export async function listPendingUniversities(req: FastifyRequest, reply: FastifyReply) {
  try {
    const universities = await PendingUniversity.find().sort({ createdAt: -1 });
    return universities;
  } catch (err: any) {
    console.error(`Error in adminUniversity.controller.ts -> listPendingUniversities: ${err.message}`);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

/** Approve a university */
export async function approveUniversityController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const params = z.object({ id: z.string().length(24) }).parse(req.params);
    const uni = await approveUniversity(params.id);
    return reply.code(200).send({message : "University Approved Successfully"});
  } catch (err: any) {
    console.error(`Error in adminUniversity.controller.ts -> approveUniversityController: ${err.message}`);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

/** Decline a university */
export async function declineUniversityController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const params = z.object({ id: z.string().length(24) }).parse(req.params);
    await declineUniversity(params.id);
    return reply.code(200).send({message : "University Declined Successfully"});
  } catch (err: any) {
    console.error(`Error in adminUniversity.controller.ts -> declineUniversityController: ${err.message}`);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}
