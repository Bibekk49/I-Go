import { Schema, model, Document, Types } from 'mongoose';

export interface MediaPost extends Document {
  user: Types.ObjectId;           // Who posted
  place: Types.ObjectId;          // Where it was pinned
  mediaType: 'image' | 'video';
  mediaUrl: string;               // URL to the uploaded file
  caption?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaPostSchema = new Schema<MediaPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    place: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    mediaType: { type: String, enum: ['image', 'video'], required: true },
    mediaUrl: { type: String, required: true },
    caption: { type: String },
  },
  { timestamps: true }
);

export const MediaPostModel = model<MediaPost>('MediaPost', MediaPostSchema);