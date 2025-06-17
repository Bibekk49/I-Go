import { PlaceModel } from '../Db/PlaceModel';
import { Place } from '../Entities/Place';

export interface IPlaceRepository {
    create(place: Omit<Place, 'id' | 'createdAt' | 'updatedAt'>): Promise<Place>;
    findById(id: string): Promise<Place | null>;
    update(
        id: string,
        update: Partial<Omit<Place, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<Place | null>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<Place[]>;
}

export class PlaceRepository implements IPlaceRepository {
    async create(place: Omit<Place, 'id' | 'createdAt' | 'updatedAt'>): Promise<Place> {
        const created = await PlaceModel.create(place);
        return created.toJSON() as Place;
    }

    async findById(id: string): Promise<Place | null> {
        const place = await PlaceModel.findById(id).exec();
        return place ? (place.toJSON() as Place) : null;
    }

    async update(
        id: string,
        update: Partial<Omit<Place, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<Place | null> {
        const place = await PlaceModel.findByIdAndUpdate(id, update, { new: true }).exec();
        return place ? (place.toJSON() as Place) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await PlaceModel.findByIdAndDelete(id).exec();
        return !!result;
    }

    async findAll(): Promise<Place[]> {
        const places = await PlaceModel.find().exec();
        return places.map(p => p.toJSON() as Place);
    }
}