import { UserRepository } from '../Repositories/UserRepository';
import bcrypt from 'bcryptjs';

const DEFAULT_PROFILE_PICTURE_URL = 'https://example.com/default-profile.png';

export class UserService {
    private userRepository = new UserRepository();

    async changeName(userId: string, newName: string) {
        if (!newName || newName.trim().length < 2) {
            throw new Error('Name must be at least 2 characters long.');
        }
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) throw new Error('User not found.');
            return await this.userRepository.update(userId, { name: newName });
        } catch (error) {
            throw new Error(`Failed to change name: ${(error as Error).message}`);
        }
    }

    async changePassword(userId: string, newPassword: string) {
        if (!newPassword || newPassword.length < 8) {
            throw new Error('Password must be at least 8 characters long.');
        }
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) throw new Error('User not found.');
            const passwordHash = await bcrypt.hash(newPassword, 10);
            return await this.userRepository.update(userId, { passwordHash });
        } catch (error) {
            throw new Error(`Failed to change password: ${(error as Error).message}`);
        }
    }

    async changeProfilePicture(userId: string, newUrl: string) {
        if (!newUrl || !/^https?:\/\/.+\..+/.test(newUrl)) {
            throw new Error('Invalid profile picture URL.');
        }
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) throw new Error('User not found.');
            return await this.userRepository.update(userId, { profilePictureUrl: newUrl });
        } catch (error) {
            throw new Error(`Failed to change profile picture: ${(error as Error).message}`);
        }
    }

    async deleteProfilePicture(userId: string) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) throw new Error('User not found.');
            return await this.userRepository.update(userId, { profilePictureUrl: DEFAULT_PROFILE_PICTURE_URL });
        } catch (error) {
            throw new Error(`Failed to delete profile picture: ${(error as Error).message}`);
        }
    }

    async changeBio(userId: string, newBio: string) {
        if (typeof newBio !== 'string' || newBio.length > 500) {
            throw new Error('Bio must be a string up to 500 characters.');
        }
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) throw new Error('User not found.');
            return await this.userRepository.update(userId, { bio: newBio });
        } catch (error) {
            throw new Error(`Failed to change bio: ${(error as Error).message}`);
        }
    }

    async changePhoneNumber(userId: string, newCountryCode: string, newPhoneNumber: string) {
        if (!newCountryCode || !newPhoneNumber) {
            throw new Error('Country code and phone number are required.');
        }
        try {
            const users = await this.userRepository.findAll();
            const exists = users.find(
                u =>
                    u.id !== userId &&
                    u.countryCode === newCountryCode &&
                    u.phoneNumber === newPhoneNumber
            );
            if (exists) throw new Error('This phone number is already used in this country.');
            return await this.userRepository.update(userId, {
                countryCode: newCountryCode,
                phoneNumber: newPhoneNumber,
            });
        } catch (error) {
            throw new Error(`Failed to change phone: ${(error as Error).message}`);
        }
    }

    async getUserById(userId: string) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) throw new Error('User not found.');
            return user;
        } catch (error) {
            throw new Error(`Failed to get user: ${(error as Error).message}`);
        }
    }

    async deleteUser(userId: string) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) throw new Error('User not found.');
            const deleted = await this.userRepository.delete(userId);
            if (!deleted) throw new Error('Delete failed.');
            return true;
        } catch (error) {
            throw new Error(`Failed to delete user: ${(error as Error).message}`);
        }
    }

    async getAllUsers() {
        try {
            return await this.userRepository.findAll();
        } catch (error) {
            throw new Error(`Failed to get users: ${(error as Error).message}`);
        }
    }

    async getUsersByType(type: 'traveller' | 'guide') {
        try {
            const users = await this.userRepository.findAll();
            return users.filter(u => u.type === type);
        } catch (error) {
            throw new Error(`Failed to get users by type: ${(error as Error).message}`);
        }
    }
}