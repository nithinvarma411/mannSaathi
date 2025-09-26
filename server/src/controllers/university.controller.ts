import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createPendingUniversity, ingestUsersCsv } from "../services/university.service";
import { University } from "../models/University";
import { PendingUniversity } from "../models/PendingUniversity";
import { getSearch } from "../utils/aishe";

export async function applyUniversityController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = z
      .object({
        aisheCode: z.string().regex(/^([UCS])-\d{3,5}$/),
        domain: z.string().optional(),
        contactEmail: z.string().email(),
        contactPhone: z.string().optional(),
      })
      .parse(req.body);

    // ✅ Local search function
    const search = getSearch();
    const inst = search(body.aisheCode);

    // console.log("Found:", inst);

    if (!inst) {
      return reply.code(400).send({ ok: false, error: "Invalid AISHE code" });
    }

    const existing = await Promise.all([
      PendingUniversity.findOne({ aisheCode: body.aisheCode }),
      University.findOne({ aisheCode: body.aisheCode }),
    ]);

    if (existing[0] || existing[1]) {
      return reply.code(400).send({
        ok: false,
        error: "University with this code already exists",
      });
    }

    const pending = await createPendingUniversity({
      uniName: inst.name,
      aisheCode: inst.aishe_code,
      domain: body.domain,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
    });

    return { ok: true, id: String(pending._id) };
  } catch (err: any) {
    console.error(
      `Error in university.controller.ts -> applyUniversityController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}


/** CSV upload by uni-admin */
export async function uploadUsersCsvController(req: any, reply: FastifyReply) {
  try {
    const params = z.object({ uniId: z.string().length(24) }).parse(req.params);

    if (req.user?.role !== "uni-admin") {
      return reply
        .code(403)
        .send({ error: "Only university admins can upload users" });
    }

    if (req.user?.uniId !== params.uniId) {
      return reply
        .code(403)
        .send({ error: "Cannot upload for another university" });
    }

    const data = await req.file(); // single file
    if (!data) return reply.code(400).send({ error: "No file provided" });
    if (!data.filename.endsWith(".csv"))
      return reply.code(400).send({ error: "CSV required" });

    const res = await ingestUsersCsv(params.uniId, data.file);

    return { ok: true, ingested: res.count };
  } catch (err: any) {
    console.error(
      `Error in university.controller.ts -> uploadUsersCsvController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

/** List approved universities */
export async function listUniversitiesController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const list = await University.find()
      .sort({ uniName: 1 })
      .select("uniName aisheCode");
    return list;
  } catch (err: any) {
    console.error(
      `Error in university.controller.ts -> listUniversitiesController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}
