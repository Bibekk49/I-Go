import { Schema, model, Document, Types } from 'mongoose';

export interface Review extends Document {
  user: Types.ObjectId;
  place: Types.ObjectId;
  rating: number;
  comment?: string;
  mediaPosts: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<Review>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    place: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    mediaPosts: [{ type: Schema.Types.ObjectId, ref: 'MediaPost' }],
  },
  { timestamps: true }
);

export const ReviewModel = model<Review>('Review', ReviewSchema);