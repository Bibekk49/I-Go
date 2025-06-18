import { PlaceModel } from '../Db/PlaceModel';
import { Place } from '../Entities/Place';

export class PlaceRepository {
  async findAll(): Promise<Place[]> {
    const docs = await PlaceModel.find().exec();
    return docs.map(d => d.toJSON() as Place);
  }

  async findById(id: string): Promise<Place | null> {
    const doc = await PlaceModel.findById(id).exec();
    return doc ? (doc.toJSON() as Place) : null;
  }

  async findNearby(coordinates: [number, number], radiusKm: number): Promise<Place[]> {
    const docs = await PlaceModel.find({
      coordinates: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates,
          },
          $maxDistance: radiusKm * 1000,
        },
      },
    }).exec();

    return docs.map(d => d.toJSON() as Place);
  }

  async create(place: Omit<Place, 'id' | 'createdAt' | 'updatedAt'>): Promise<Place> {
    const doc = await PlaceModel.create(place);
    return doc.toJSON() as Place;
  }

  async update(
    id: string,
    update: Partial<Omit<Place, 'id' | 'createdAt' | 'updatedAt' | 'createdById'>>
  ): Promise<Place | null> {
    const { createdById, ...rest } = update as any;
    const doc = await PlaceModel.findByIdAndUpdate(id, rest, { new: true }).exec();
    return doc ? (doc.toJSON() as Place) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await PlaceModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}