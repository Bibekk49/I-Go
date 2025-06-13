import { Schema, Types } from 'mongoose';
import { User, GeneralUserModel } from './User';

// Traveler user interface
export interface Traveler extends User {
  homeCountry: string;
  currentLocation: string;
  languagesSpoken: string[];
  interests: string[];
  friends: Types.ObjectId[];
  reviews: Types.ObjectId[];
  wishList: Types.ObjectId[];
  visitedPlaces: Types.ObjectId[];
}

// Traveler user schema (discriminator)
export const TravelerUserModel = GeneralUserModel.discriminator<Traveler>(
  'TravelerUser',
  new Schema<Traveler>({
    homeCountry: { type: String, required: true },
    currentLocation: { type: String, required: true },
    languagesSpoken: [{ type: String }],
    interests: [{ type: String }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    wishList: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
    visitedPlaces: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
  })
);