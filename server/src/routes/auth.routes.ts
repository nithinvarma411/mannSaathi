import { FastifyInstance } from "fastify";
import { initiateFirstPasswordController, verifyOtpAndSetPasswordController, loginController } from "../controllers/auth.controller";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/api/auth/initiate", initiateFirstPasswordController);
  app.post("/api/auth/verify-otp", verifyOtpAndSetPasswordController);
  app.post("/api/auth/login", loginController);
}
