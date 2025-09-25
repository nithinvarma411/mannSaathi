import { FastifyInstance } from "fastify";
import {
  initiateAdminFirstPasswordController,
  verifyAdminOtpAndSetPasswordController,
  adminLoginController,
} from "../controllers/admin.controller";

export default async function adminRoutes(app: FastifyInstance) {
  app.post("/api/admin/initiate", initiateAdminFirstPasswordController);
  app.post("/api/admin/verify-otp", verifyAdminOtpAndSetPasswordController);
  app.post("/api/admin/login", adminLoginController);
}
