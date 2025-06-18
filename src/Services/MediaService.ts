import { MediaPostRepository } from '../Repositories/MediaRepository';
import { MediaPost } from '../Entities/Media';

const VALID_MEDIA_TYPES = ['image', 'video'];

export class MediaService {
    private mediaRepository = new MediaPostRepository();

    async createMedia(media: Omit<MediaPost, 'id' | 'createdAt' | 'updatedAt'>) {
        if (!media.userId) throw new Error('userId is required.');
        if (!media.placeId) throw new Error('placeId is required.');
        if (!media.mediaType || !VALID_MEDIA_TYPES.includes(media.mediaType))
            throw new Error('mediaType must be "image" or "video".');
        if (!media.mediaUrl || typeof media.mediaUrl !== 'string')
            throw new Error('mediaUrl is required.');
        return await this.mediaRepository.create(media);
    }

    async getMediaById(id: string) {
        const media = await this.mediaRepository.findById(id);
        if (!media) throw new Error('Media post not found.');
        return media;
    }

    async updateMedia(id: string, update: Partial<Omit<MediaPost, 'id' | 'createdAt' | 'updatedAt'>>) {
        if (update.mediaType && !VALID_MEDIA_TYPES.includes(update.mediaType))
            throw new Error('mediaType must be "image" or "video".');
        const updated = await this.mediaRepository.update(id, update);
        if (!updated) throw new Error('Media post not found or update failed.');
        return updated;
    }

    async deleteMedia(id: string) {
        const deleted = await this.mediaRepository.delete(id);
        if (!deleted) throw new Error('Delete failed or media post not found.');
        return true;
    }

    async getAllMedia(page = 1, limit = 20) {
        return await this.mediaRepository.findAll(page, limit);
    }

    async getMediaByUserId(userId: string, page = 1, limit = 20) {
        return await this.mediaRepository.findByUserId(userId, page, limit);
    }

    async getMediaByPlaceId(placeId: string, page = 1, limit = 20) {
        return await this.mediaRepository.findByPlaceId(placeId, page, limit);
    }
}