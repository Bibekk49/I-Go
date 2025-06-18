import { ReviewRepository } from '../Repositories/ReviewRepository';
import { Review } from '../Entities/Review';

export class ReviewService {
    private reviewRepository = new ReviewRepository();

    async createReview(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) {
        if (!review.userId) throw new Error('userId is required.');
        if (!review.placeId) throw new Error('placeId is required.');
        return await this.reviewRepository.create(review);
    }

    async getReviewById(id: string) {
        const review = await this.reviewRepository.findById(id);
        if (!review) throw new Error('Review not found.');
        return review;
    }

    async updateReview(id: string, update: Partial<Omit<Review, 'id' | 'createdAt' | 'updatedAt'>>) {
        const updated = await this.reviewRepository.update(id, update);
        if (!updated) throw new Error('Review not found or update failed.');
        return updated;
    }

    async deleteReview(id: string) {
        const deleted = await this.reviewRepository.delete(id);
        if (!deleted) throw new Error('Delete failed or review not found.');
        return true;
    }

    async getAllReviews() {
        return await this.reviewRepository.findAll();
    }

    async findReviewsByPlaceId(placeId: string) {
        return await this.reviewRepository.findByPlaceId(placeId);
    }

    async findReviewsByUserId(userId: string) {
        return await this.reviewRepository.findByUserId(userId);
    }
}