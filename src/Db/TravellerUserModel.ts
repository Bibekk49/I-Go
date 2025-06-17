import { Schema, Types } from 'mongoose';
import { UserModel, UserDocument } from './UserModel';

export interface TravelerDocument extends UserDocument {
  homeCountry: string;
  currentLocation: string;
  languagesSpoken: string[];
  interests: string[];
  friends: Types.ObjectId[];
  reviews: Types.ObjectId[];
  wishList: Types.ObjectId[];
  visitedPlaces: Types.ObjectId[];
}

const TravelerUserSchema = new Schema<TravelerDocument>(
  {
    homeCountry: { type: String, required: true },
    currentLocation: { type: String, required: true },
    languagesSpoken: [{ type: String }],
    interests: [{ type: String }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    wishList: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
    visitedPlaces: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
  },
  { timestamps: true }
);

export const TravelerUserModel = UserModel.discriminator<TravelerDocument>(
  'TravelerUser',
  TravelerUserSchema
);
