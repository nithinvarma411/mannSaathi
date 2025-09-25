import { FastifyInstance } from "fastify";
import {
  initiateUniAdminController,
  verifyUniAdminController,
  listCounsellorsController,
  searchUserByUidController
} from "../controllers/uni-admin.controller";
import { requireUserAuth } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";

export default async function uniAdminRoutes(app: FastifyInstance) {
  app.post("/api/uni-admin/initiate", initiateUniAdminController);
  app.post("/api/uni-admin/verify", verifyUniAdminController);

  // Only Uni-Admins can access this
  app.get(
    "/api/uni-admin/counsellors",
    { preHandler: [requireUserAuth, requireRole("uni-admin")] },
    listCounsellorsController
  );

  app.get(
    "/api/uni-admin/user/search",
    { preHandler: [requireUserAuth, requireRole("uni-admin")] },
    searchUserByUidController
  );
}
