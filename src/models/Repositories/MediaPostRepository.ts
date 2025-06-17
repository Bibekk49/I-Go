import { MediaPostModel } from '../MongooseModel/MediaModel';
import { MediaPost } from '../Entities/MediaPost';

export interface IMediaPostRepository {
    create(media: Omit<MediaPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<MediaPost>;
    findById(id: string): Promise<MediaPost | null>;
    update(
        id: string,
        update: Partial<Omit<MediaPost, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<MediaPost | null>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<MediaPost[]>;
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
        const created = await MediaPostModel.create(media);
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
        const media = await MediaPostModel.findByIdAndUpdate(id, update, { new: true }).exec();
        return media ? convertMediaPost(media) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await MediaPostModel.findByIdAndDelete(id).exec();
        return !!result;
    }

    async findAll(): Promise<MediaPost[]> {
        const mediaPosts = await MediaPostModel.find().exec();
        return mediaPosts.map(convertMediaPost);
    }
}