import { Schema, model, Document } from 'mongoose';

export interface Place extends Document {
  name: string;
  type: string;
  description?: string;
  address?: string;
  landmark?: string;
  coordinates: [number, number];
  photos?: string[];
  videos?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PlaceSchema = new Schema<Place>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    landmark: { type: String },
    coordinates: { type: [Number], required: true, unique: true },
    photos: [{ type: String }],
    videos: [{ type: String }],
  },
  { timestamps: true }
);

export const PlaceModel = model<Place>('Place', PlaceSchema);