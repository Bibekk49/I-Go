import { User } from './User';

export interface Traveler extends User {
  homeCountry: string;
  currentLocation: string;
  languagesSpoken: string[];
  interests: string[];
  friends: string[];
  reviews: string[];
  wishList: string[];
  visitedPlaces: string[];
}
