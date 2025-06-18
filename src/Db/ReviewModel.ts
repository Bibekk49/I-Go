import { Schema, model, Document, Types } from 'mongoose';

export interface ReviewDocument extends Document {
  userId: Types.ObjectId;
  placeId: Types.ObjectId;
  rating: number;
  comment?: string;
  mediaPosts: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    placeId: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    mediaPosts: [{ type: Schema.Types.ObjectId, ref: 'MediaPost' }],
  },
  { timestamps: true }
);

export const ReviewModel = model<ReviewDocument>('Review', ReviewSchema);