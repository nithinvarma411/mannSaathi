import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { getGroqChatResponse } from "../services/ai.service";

export async function getAIResponseController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Validate request body
    const body = z.object({
      message: z.string().min(1).max(2000),
      context: z.string().optional()
    }).parse(req.body);

    // Get the user ID from JWT token
    const userId = req.user?.sub;

    const response = await getGroqChatResponse(body.message, userId, body.context);
    
    return reply.code(200).send({ 
      ok: true, 
      data: { 
        message: response 
      } 
    });
  } catch (err: any) {
    console.error(
      `Error in ai.controller.ts -> getAIResponseController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}