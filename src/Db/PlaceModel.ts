import { Schema, model, Document } from 'mongoose';

export interface PlaceDocument extends Document {
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

const PlaceSchema = new Schema<PlaceDocument>(
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

PlaceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export const PlaceModel = model<PlaceDocument>('Place', PlaceSchema);
