import { MediaPostModel } from '../Db/MediaModel';
import { MediaPost } from '../Entities/Media';

export interface IMediaPostRepository {
    create(media: Omit<MediaPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<MediaPost>;
    findById(id: string): Promise<MediaPost | null>;
    update(
        id: string,
        update: Partial<Omit<MediaPost, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<MediaPost | null>;
    delete(id: string): Promise<boolean>;
    findAll(page?: number, limit?: number): Promise<MediaPost[]>;
    findByUserId(userId: string, page?: number, limit?: number): Promise<MediaPost[]>;
    findByPlaceId(placeId: string, page?: number, limit?: number): Promise<MediaPost[]>;
}

function convertMediaPost(doc: any): MediaPost {
    const t = doc.toJSON();
    return {
        ...t,
        userId: t.user?.toString(),
        placeId: t.place?.toString(),
    };
}

export class MediaPostRepository implements IMediaPostRepository {
    async create(media: Omit<MediaPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<MediaPost> {
        const { userId, placeId, ...rest } = media as any;
        const created = await MediaPostModel.create({
            ...rest,
            user: userId,
            place: placeId,
        });
        return convertMediaPost(created);
    }

    async findById(id: string): Promise<MediaPost | null> {
        const media = await MediaPostModel.findById(id).exec();
        return media ? convertMediaPost(media) : null;
    }

    async update(
        id: string,
        update: Partial<Omit<MediaPost, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<MediaPost | null> {
        const { userId, placeId, ...rest } = update as any;
        const media = await MediaPostModel.findByIdAndUpdate(id, rest, { new: true }).exec();
        return media ? convertMediaPost(media) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await MediaPostModel.findByIdAndDelete(id).exec();
        return !!result;
    }

    async findAll(page = 1, limit = 20): Promise<MediaPost[]> {
        const mediaPosts = await MediaPostModel.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        return mediaPosts.map(convertMediaPost);
    }

    async findByUserId(userId: string, page = 1, limit = 20): Promise<MediaPost[]> {
        const mediaPosts = await MediaPostModel.find({ user: userId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        return mediaPosts.map(convertMediaPost);
    }

    async findByPlaceId(placeId: string, page = 1, limit = 20): Promise<MediaPost[]> {
        const mediaPosts = await MediaPostModel.find({ place: placeId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        return mediaPosts.map(convertMediaPost);
    }
}