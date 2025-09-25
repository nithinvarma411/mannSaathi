import { FastifyInstance } from "fastify";
import multipart from "@fastify/multipart";
import { config } from "../config/index";
import { requireUserAuth } from "../middlewares/auth";5
import { requireRole } from "../middlewares/roles";
import { 
  applyUniversityController, 
  uploadUsersCsvController, 
  listUniversitiesController 
} from "../controllers/university.controller";

export default async function universityRoutes(app: FastifyInstance) {
  app.register(multipart, {
    limits: {
      fileSize: config.maxCsvSizeMb * 1024 * 1024,
      files: 1,
    },
  });

  // Anyone can apply for a university
  app.post("/api/university/apply", applyUniversityController);

  // Only university admins can upload CSV
  app.post(
    "/api/university/:uniId/users/upload",
    { preHandler: [requireUserAuth, requireRole("uni-admin")] },
    uploadUsersCsvController
  );

  // Public list of universities
  app.get("/api/universities", listUniversitiesController);
}
