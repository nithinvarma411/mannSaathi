import { FastifyInstance } from "fastify";
import { requireAdminAuth } from "../middlewares/auth";  // changed
import { listPendingUniversities, approveUniversityController, declineUniversityController } from "../controllers/adminUniversity.controller";

export default async function adminRoutes(app: FastifyInstance) {
  app.register(
    async (adminScope) => {
      // all routes in here require admin
      adminScope.addHook("preHandler", requireAdminAuth);

      adminScope.get("/pending-universities", listPendingUniversities);
      adminScope.post("/university/:id/approve", approveUniversityController);
      adminScope.post("/university/:id/decline", declineUniversityController);
    },
    { prefix: "/api/admin" }
  );
}
