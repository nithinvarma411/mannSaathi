import { FastifyInstance } from "fastify";
import { requireUserAuth } from "../middlewares/auth";
import { 
  sendMessageController, 
  getMessagesController, 
  getUserConversationsController 
} from "../controllers/chat.controller";

export default async function chatRoutes(app: FastifyInstance) {
  app.register(
    async (userScope) => {
      userScope.addHook("preHandler", requireUserAuth);

      // Send a message to another user
      userScope.post("/send-message", sendMessageController);
      
      // Get messages with a specific user
      userScope.get("/messages/:userId", getMessagesController);
      
      // Get all conversations for the current user
      userScope.get("/conversations", getUserConversationsController);
    },
    { prefix: "/api/chat" }
  );
}