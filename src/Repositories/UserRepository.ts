import { UserModel } from '../Db/UserModel';
import { User } from '../Entities/User';

export interface IUserRepository {
    create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(
        id: string,
        update: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
    async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const created = await UserModel.create(user);
        return created.toJSON() as User;
    }

    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id).exec();
        return user ? (user.toJSON() as User) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email }).exec();
        return user ? (user.toJSON() as User) : null;
    }

    async update(
        id: string,
        update: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<User | null> {
        const user = await UserModel.findByIdAndUpdate(id, update, { new: true }).exec();
        return user ? (user.toJSON() as User) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id).exec();
        return !!result;
    }

    async findAll(): Promise<User[]> {
        const users = await UserModel.find().exec();
        return users.map(u => u.toJSON() as User);
    }
}
