import { UserRepository } from '../Repositories/UserRepository';
import { Traveler } from '../Entities/Traveler';

export class TravellerService {
  private userRepository = new UserRepository();

  async getTravelerById(userId: string): Promise<Traveler> {
    const user = await this.userRepository.findById(userId);
    if (!user || user.type !== 'traveller') {
      throw new Error('Traveller not found.');
    }
    return user as Traveler;
  }

  async updateCurrentLocation(userId: string, newLocation: string) {
    if (!newLocation || newLocation.trim().length < 2) {
      throw new Error('Location must be at least 2 characters long.');
    }
    await this.getTravelerById(userId);
    return await this.userRepository.update(userId, { currentLocation: newLocation });
  }

  async updateInterests(userId: string, interests: string[]) {
    if (!Array.isArray(interests) || interests.length === 0) {
      throw new Error('Interests must be a non-empty array.');
    }
    await this.getTravelerById(userId);
    return await this.userRepository.update(userId, { interests });
  }

  async addFriend(userId: string, friendId: string) {
    if (userId === friendId) throw new Error('Cannot add yourself as a friend.');
    const traveler = await this.getTravelerById(userId);
    const friend = await this.userRepository.findById(friendId);
    if (!friend) throw new Error('Friend user not found.');
    if (traveler.friends.includes(friendId)) throw new Error('Already friends.');
    const updatedFriends = [...traveler.friends, friendId];
    return await this.userRepository.update(userId, { friends: updatedFriends });
  }

  async removeFriend(userId: string, friendId: string) {
    const traveler = await this.getTravelerById(userId);
    if (!traveler.friends.includes(friendId)) throw new Error('Not in friends list.');
    const updatedFriends = traveler.friends.filter(id => id !== friendId);
    return await this.userRepository.update(userId, { friends: updatedFriends });
  }

  async addToWishList(userId: string, placeId: string) {
    const traveler = await this.getTravelerById(userId);
    if (traveler.wishList.includes(placeId)) throw new Error('Place already in wish list.');
    const updatedWishList = [...traveler.wishList, placeId];
    return await this.userRepository.update(userId, { wishList: updatedWishList });
  }

  async removeFromWishList(userId: string, placeId: string) {
    const traveler = await this.getTravelerById(userId);
    if (!traveler.wishList.includes(placeId)) throw new Error('Place not in wish list.');
    const updatedWishList = traveler.wishList.filter(id => id !== placeId);
    return await this.userRepository.update(userId, { wishList: updatedWishList });
  }

  async addVisitedPlace(userId: string, placeId: string) {
    const traveler = await this.getTravelerById(userId);
    if (traveler.visitedPlaces.includes(placeId)) throw new Error('Place already marked as visited.');
    const updatedVisited = [...traveler.visitedPlaces, placeId];
    return await this.userRepository.update(userId, { visitedPlaces: updatedVisited });
  }

  async removeVisitedPlace(userId: string, placeId: string) {
    const traveler = await this.getTravelerById(userId);
    if (!traveler.visitedPlaces.includes(placeId)) throw new Error('Place not in visited list.');
    const updatedVisited = traveler.visitedPlaces.filter(id => id !== placeId);
    return await this.userRepository.update(userId, { visitedPlaces: updatedVisited });
  }

  async updateLanguagesSpoken(userId: string, languages: string[]) {
    if (!Array.isArray(languages) || languages.length === 0) {
      throw new Error('Languages must be a non-empty array.');
    }
    await this.getTravelerById(userId);
    return await this.userRepository.update(userId, { languagesSpoken: languages });
  }
}