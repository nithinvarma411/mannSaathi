import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Types } from "mongoose";
import { sendMessage, getMessages, getUserConversations } from "../services/chat.service";
import { User } from "../models/User";

export async function sendMessageController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Validate request body
    const body = z.object({
      receiverId: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid receiverId format"
      }),
      message: z.string().min(1).max(1000)
    }).parse(req.body);

    // The senderId comes from the JWT token
    const senderId = req.user.sub;

    const res = await sendMessage(senderId, body.receiverId, body.message);
    
    if (!res.ok) {
      return reply.code(400).send(res);
    }
    
    return reply.code(200).send(res);
  } catch (err: any) {
    console.error(
      `Error in chat.controller.ts -> sendMessageController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function getMessagesController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Validate request parameters
    const params = z.object({
      userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid userId format"
      })
    }).parse(req.params);

    // The current user ID comes from the JWT token
    const currentUserId = req.user.sub;

    const res = await getMessages(currentUserId, params.userId);
    
    if (!res.ok) {
      return reply.code(400).send(res);
    }
    
    return reply.code(200).send(res);
  } catch (err: any) {
    console.error(
      `Error in chat.controller.ts -> getMessagesController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function getUserConversationsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // The current user ID comes from the JWT token
    const currentUserId = req.user.sub;

    const res = await getUserConversations(currentUserId);
    
    if (!res.ok) {
      return reply.code(400).send(res);
    }
    
    return reply.code(200).send(res);
  } catch (err: any) {
    console.error(
      `Error in chat.controller.ts -> getUserConversationsController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function getAllCounselorsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // The current user ID comes from the JWT token
    const currentUserId = req.user.sub;

    // First, get the user to find their university
    const user = await User.findById(currentUserId).select("universityId");
    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }

    // Get all counselors from the same university
    const counselors = await User.find({
      universityId: user.universityId,
      role: "counsellor"
    }).select("_id name role avgRating ratingCount");

    return reply.code(200).send({ data: counselors });
  } catch (err: any) {
    console.error(
      `Error in chat.controller.ts -> getAllCounselorsController: ${err.message}`
    );
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}