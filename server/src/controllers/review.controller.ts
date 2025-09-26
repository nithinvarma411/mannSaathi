import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { addReviewService, getCounsellorReviewService, deleteReviewService } from "../services/review.service";

/** Controller to add a review for a counsellor */
export async function addReviewController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const body = z.object({
      counsellorId: z.string().length(24),
      rating: z.number().min(1).max(5),
      description: z.string().optional(),
    }).parse(req.body);

    if (!req.user || !req.user.sub) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    
    const res = await addReviewService({
      counsellorId: body.counsellorId,
      reviewerId: req.user.sub,
      reviewerUid: (req.user as any).uid || "unknown",
      rating: body.rating,
      description: body.description,
    });

    if (!res.ok) return reply.code(400).send({ error: res.error });

    return reply.code(200).send({
      message: "Review added successfully",
      review: res.review,
      avgRating: res.avgRating,
      count: res.count,
    });
  } catch (err: any) {
    console.error(`Error in review.controller.ts -> addReviewController: ${err.message}`);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

/** Get average rating and reviews for a counsellor */
export async function getCounsellorReviewController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const query = z.object({
      counsellorId: z.string().length(24),
    }).parse(req.query);

    const res = await getCounsellorReviewService(query.counsellorId);

    if (!res.ok) return reply.code(400).send({ error: res.error });

    return reply.code(200).send({
      avgRating: res.avgRating,
      count: res.count,
      reviews: res.reviews,
    });
  } catch (err: any) {
    console.error(`Error in review.controller.ts -> getCounsellorRatingController: ${err.message}`);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

/** Delete a review */
export async function deleteReviewController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const query = z.object({
      reviewId: z.string().length(24),
    }).parse(req.query);

    if (!req.user || !req.user.sub) {
      return reply.code(401).send({ error: "Unauthorized" });
    }

    const res = await deleteReviewService({
      reviewId: query.reviewId,
      userId: req.user.sub,
    });

    if (!res.ok) return reply.code(400).send({ error: res.error });

    return reply.code(200).send({
      message: "Review deleted successfully",
      avgRating: res.avgRating,
      count: res.count,
    });
  } catch (err: any) {
    console.error(`Error in review.controller.ts -> deleteReviewController: ${err.message}`);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

