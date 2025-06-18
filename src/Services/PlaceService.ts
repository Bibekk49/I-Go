import { PlaceRepository } from '../Repositories/PlaceRepository';
import { Place } from '../Entities/Place';
import Fuse from 'fuse.js';

export class PlaceService {
  private placeRepository = new PlaceRepository();

  async addPlace(place: Omit<Place, 'id' | 'createdAt' | 'updatedAt'>): Promise<Place> {
    if (!place.createdById) throw new Error('createdById is required.');
    return await this.placeRepository.create(place);
  }

  async getPlaceById(id: string): Promise<Place> {
    const place = await this.placeRepository.findById(id);
    if (!place) throw new Error('Place not found.');
    return place;
  }

  async updatePlace(
    id: string,
    update: Partial<Omit<Place, 'id' | 'createdAt' | 'updatedAt' | 'createdById'>>
  ): Promise<Place> {
    const updated = await this.placeRepository.update(id, update);
    if (!updated) throw new Error('Place not found or update failed.');
    return updated;
  }

  async deletePlace(id: string): Promise<boolean> {
    const deleted = await this.placeRepository.delete(id);
    if (!deleted) throw new Error('Delete failed or place not found.');
    return true;
  }

  async getAllPlaces(): Promise<Place[]> {
    return await this.placeRepository.findAll();
  }

  async findPlaces(
    query: string,
    options?: {
      coordinates?: [number, number];
      radiusKm?: number;
    }
  ): Promise<Place[]> {
    let places: Place[];

    if (options?.coordinates && options?.radiusKm !== undefined) {
      places = await this.placeRepository.findNearby(options.coordinates, options.radiusKm);
    } else {
      places = await this.placeRepository.findAll();
    }

    if (!query.trim()) {
      return places;
    }

    const fuse = new Fuse(places, {
      keys: [
        { name: 'name', weight: 0.4 },
        { name: 'type', weight: 0.3 },
        { name: 'description', weight: 0.1 },
        { name: 'address', weight: 0.1 },
        { name: 'landmark', weight: 0.1 },
      ],
      threshold: 0.4,
    });

    const results = fuse.search(query);
    return results.map(r => r.item);
  }

  async addPhoto(placeId: string, photoUrl: string): Promise<Place> {
    const place = await this.getPlaceById(placeId);
    const photos = place.photos ? [...place.photos, photoUrl] : [photoUrl];
    return await this.updatePlace(placeId, { photos });
  }

  async removePhoto(placeId: string, photoUrl: string): Promise<Place> {
    const place = await this.getPlaceById(placeId);
    if (!place.photos) return place;
    const photos = place.photos.filter(url => url !== photoUrl);
    return await this.updatePlace(placeId, { photos });
  }

  async addVideo(placeId: string, videoUrl: string): Promise<Place> {
    const place = await this.getPlaceById(placeId);
    const videos = place.videos ? [...place.videos, videoUrl] : [videoUrl];
    return await this.updatePlace(placeId, { videos });
  }

  async removeVideo(placeId: string, videoUrl: string): Promise<Place> {
    const place = await this.getPlaceById(placeId);
    if (!place.videos) return place;
    const videos = place.videos.filter(url => url !== videoUrl);
    return await this.updatePlace(placeId, { videos });
  }
}