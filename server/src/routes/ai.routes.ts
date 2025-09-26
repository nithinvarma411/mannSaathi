import { FastifyInstance } from "fastify";
import { requireUserAuth } from "../middlewares/auth";
import { getAIResponseController } from "../controllers/ai.controller";

export default async function aiRoutes(app: FastifyInstance) {
  app.register(
    async (userScope) => {
      userScope.addHook("preHandler", requireUserAuth);

      // Get AI response for mental health chatbot
      userScope.post("/ai/chat", getAIResponseController);
    },
    { prefix: "/api" }
  );
}