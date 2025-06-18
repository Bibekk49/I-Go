import { Schema, model, Document } from 'mongoose';

export interface PlaceDocument extends Document {
  name: string;
  type: string;
  description?: string;
  address?: string;
  landmark?: string;
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };
  photos?: string[];
  videos?: string[];
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
}

const PlaceSchema = new Schema<PlaceDocument>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    landmark: { type: String },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    photos: [{ type: String }],
    videos: [{ type: String }],
    createdById: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

PlaceSchema.index({ coordinates: '2dsphere' });

export const PlaceModel = model<PlaceDocument>('Place', PlaceSchema);