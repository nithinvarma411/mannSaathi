import { User } from "../models/User";
import { Review, ReviewDoc } from "../models/Review";
import { Types } from "mongoose";

export async function addReviewService({
  counsellorId,
  reviewerId,
  reviewerUid,
  rating,
  description,
}: {
  counsellorId: string;
  reviewerId: string;
  reviewerUid: string;
  rating: number;
  description?: string;
}): Promise<{
  ok: boolean;
  review?: ReviewDoc;
  avgRating?: number;
  count?: number;
  error?: string;
}> {
  try {
    // 1️⃣ Validate target user is counsellor
    const counsellor = await User.findById(counsellorId);
    if (!counsellor || counsellor.role !== "counsellor") {
      return { ok: false, error: "Target user is not a counsellor" };
    }

    // 2️⃣ Save review
    const review = await Review.create({
      counsellor: new Types.ObjectId(counsellorId),
      reviewer: new Types.ObjectId(reviewerId),
      reviewerUid,
      rating,
      description,
    });

    // 3️⃣ Update counsellor rating totals
    counsellor.avgRating = (counsellor.avgRating || 0) + rating;
    counsellor.ratingCount = (counsellor.ratingCount || 0) + 1;
    await counsellor.save();

    const avgRating = counsellor.avgRating / counsellor.ratingCount;

    return { ok: true, review, avgRating, count: counsellor.ratingCount };
  } catch (err: any) {
    console.error(
      `Error in review.service.ts -> addReviewService: ${err.message}`
    );
    return { ok: false, error: "Internal server error" };
  }
}

/** Get average rating and all reviews for a counsellor */
export async function getCounsellorReviewService(
  counsellorId: string
): Promise<{
  ok: boolean;
  avgRating?: number;
  count?: number;
  reviews?: any[];
  error?: string;
}> {
  try {
    const counsellor = await User.findById(counsellorId);
    if (!counsellor || counsellor.role !== "counsellor") {
      return { ok: false, error: "Target user is not a counsellor" };
    }

    const ratingTotal = counsellor.avgRating ?? 0;
    const ratingCount = counsellor.ratingCount ?? 0;
    const avgRating = ratingCount > 0 ? ratingTotal / ratingCount : 0;

    // Fetch all reviews for this counsellor
    const reviews = await Review.find({ counsellor: counsellorId })
      .populate("reviewer", "name uid")
      .sort({ createdAt: -1 })
      .lean();

    return { ok: true, avgRating, count: ratingCount, reviews };
  } catch (err: any) {
    console.error(
      `Error in review.service.ts -> getCounsellorRatingService: ${err.message}`
    );
    return { ok: false, error: "Internal server error" };
  }
}

/** Delete a review for a counsellor */
export async function deleteReviewService({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string;
}): Promise<{
  ok: boolean;
  avgRating?: number;
  count?: number;
  error?: string;
}> {
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return { ok: false, error: "Review not found" };
    }

    // Ensure only the reviewer who created it can delete
    if (review.reviewer.toString() !== userId) {
      return { ok: false, error: "Not authorized to delete this review" };
    }

    const counsellor = await User.findById(review.counsellor);
    if (!counsellor || counsellor.role !== "counsellor") {
      return { ok: false, error: "Target user is not a counsellor" };
    }

    // Update rating totals
    counsellor.avgRating = Math.max(0, (counsellor.avgRating || 0) - review.rating);
    counsellor.ratingCount = Math.max(0, (counsellor.ratingCount || 0) - 1);
    await counsellor.save();

    // Delete the review
    await review.deleteOne();

    const avgRating = counsellor.ratingCount > 0
      ? counsellor.avgRating / counsellor.ratingCount
      : 0;

    return { ok: true, avgRating, count: counsellor.ratingCount };
  } catch (err: any) {
    console.error(`Error in review.service.ts -> deleteReviewService: ${err.message}`);
    return { ok: false, error: "Internal server error" };
  }
}
