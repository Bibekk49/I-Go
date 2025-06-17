import { TravelerUserModel } from '../Db/TravellerUserModel';
import { Traveler } from '../Entities/Traveler';

export interface ITravelerRepository {
    create(traveler: Omit<Traveler, 'id' | 'createdAt' | 'updatedAt'>): Promise<Traveler>;
    findById(id: string): Promise<Traveler | null>;
    findByEmail(email: string): Promise<Traveler | null>;
    update(
        id: string,
        update: Partial<Omit<Traveler, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<Traveler | null>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<Traveler[]>;
}

function toStringIdArray(arr: any[] | undefined): string[] {
    return arr?.map((id) => id.toString()) ?? [];
}

function convertTraveler(doc: any): Traveler {
    const t = doc.toJSON();
    return {
        ...t,
        friends: toStringIdArray(t.friends),
        reviews: toStringIdArray(t.reviews),
        wishList: toStringIdArray(t.wishList),
        visitedPlaces: toStringIdArray(t.visitedPlaces),
    };
}

export class TravelerRepository implements ITravelerRepository {
    async create(traveler: Omit<Traveler, 'id' | 'createdAt' | 'updatedAt'>): Promise<Traveler> {
        const created = await TravelerUserModel.create(traveler);
        return convertTraveler(created);
    }

    async findById(id: string): Promise<Traveler | null> {
        const traveler = await TravelerUserModel.findById(id).exec();
        return traveler ? convertTraveler(traveler) : null;
    }

    async findByEmail(email: string): Promise<Traveler | null> {
        const traveler = await TravelerUserModel.findOne({ email }).exec();
        return traveler ? convertTraveler(traveler) : null;
    }

    async update(
        id: string,
        update: Partial<Omit<Traveler, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<Traveler | null> {
        const traveler = await TravelerUserModel.findByIdAndUpdate(id, update, { new: true }).exec();
        return traveler ? convertTraveler(traveler) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await TravelerUserModel.findByIdAndDelete(id).exec();
        return !!result;
    }

    async findAll(): Promise<Traveler[]> {
        const travelers = await TravelerUserModel.find().exec();
        return travelers.map(convertTraveler);
    }
}
