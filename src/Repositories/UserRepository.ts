import { UserModel } from '../Db/UserModel';
import { User } from '../Entities/User';
import { Traveler } from '../Entities/Traveler';

function toStringIdArray(arr: any[] | undefined): string[] {
    return arr?.map((id) => id.toString()) ?? [];
}

function convertUser(doc: any): User | Traveler {
    const u = doc.toJSON();
    if (u.type === 'traveller') {
        return {
            ...u,
            friends: toStringIdArray(u.friends),
            reviews: toStringIdArray(u.reviews),
            wishList: toStringIdArray(u.wishList),
            visitedPlaces: toStringIdArray(u.visitedPlaces),
        } as Traveler;
    }
    return u as User;
}

export interface IUserRepository {
    create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User | Traveler>;
    findById(id: string): Promise<User | Traveler | null>;
    findByEmail(email: string): Promise<User | Traveler | null>;
    update(
        id: string,
        update: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> | Partial<Omit<Traveler, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<User | Traveler | null>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<(User | Traveler)[]>;
    findAllTravelers(): Promise<Traveler[]>;
}

export class UserRepository implements IUserRepository {
    async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User | Traveler> {
        const created = await UserModel.create(user);
        return convertUser(created);
    }

    async findById(id: string): Promise<User | Traveler | null> {
        const user = await UserModel.findById(id).exec();
        return user ? convertUser(user) : null;
    }

    async findByEmail(email: string): Promise<User | Traveler | null> {
        const user = await UserModel.findOne({ email }).exec();
        return user ? convertUser(user) : null;
    }

    async update(
        id: string,
        update: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> | Partial<Omit<Traveler, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<User | Traveler | null> {
        const user = await UserModel.findByIdAndUpdate(id, update, { new: true }).exec();
        return user ? convertUser(user) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id).exec();
        return !!result;
    }

    async findAll(): Promise<(User | Traveler)[]> {
        const users = await UserModel.find().exec();
        return users.map(convertUser);
    }

    async findAllTravelers(): Promise<Traveler[]> {
        const travelers = await UserModel.find({ type: 'traveller' }).exec();
        return travelers.map(convertUser) as Traveler[];
    }
}