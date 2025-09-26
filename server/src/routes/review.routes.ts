import { FastifyInstance } from "fastify";
import { requireUserAuth } from "../middlewares/auth";
import { getCounsellorReviewController, addReviewController, deleteReviewController } from "../controllers/review.controller";

export default async function reviewRoutes(app: FastifyInstance) {
  app.register(
    async (userScope) => {
      userScope.addHook("preHandler", requireUserAuth);

      userScope.post("/add-review", addReviewController);
      userScope.get("/get-reviews", getCounsellorReviewController);
      userScope.delete("/delete-review", deleteReviewController);
    },
    { prefix: "/api/review" }
  );
}
