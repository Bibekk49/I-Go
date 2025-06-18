import { ReviewModel } from '../Db/ReviewModel';
import { Review } from '../Entities/Review';

export interface IReviewRepository {
    create(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review>;
    findById(id: string): Promise<Review | null>;
    update(
        id: string,
        update: Partial<Omit<Review, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<Review | null>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<Review[]>;
}

function convertReview(doc: any): Review {
    const t = doc.toJSON();
    return {
        ...t,
        userId: t.userId?.toString(),
        placeId: t.placeId?.toString(),
        mediaPosts: t.mediaPosts?.map((id: any) => id.toString()) ?? [],
    };
}

export class ReviewRepository implements IReviewRepository {
    async create(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review> {
        const created = await ReviewModel.create(review);
        return convertReview(created);
    }

    async findById(id: string): Promise<Review | null> {
        const review = await ReviewModel.findById(id).exec();
        return review ? convertReview(review) : null;
    }

    async update(
        id: string,
        update: Partial<Omit<Review, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<Review | null> {
        const { userId, placeId, ...rest } = update as any;
        const review = await ReviewModel.findByIdAndUpdate(id, rest, { new: true }).exec();
        return review ? convertReview(review) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await ReviewModel.findByIdAndDelete(id).exec();
        return !!result;
    }

    async findAll(): Promise<Review[]> {
        const reviews = await ReviewModel.find().sort({ createdAt: -1 }).exec(); 
        return reviews.map(convertReview);
    }

    async findByPlaceId(placeId: string): Promise<Review[]> {
        const reviews = await ReviewModel.find({ placeId }).sort({ createdAt: -1 }).exec(); 
        return reviews.map(convertReview);
    }

    async findByUserId(userId: string): Promise<Review[]> {
        const reviews = await ReviewModel.find({ userId }).sort({ createdAt: -1 }).exec();
        return reviews.map(convertReview);
    }
}