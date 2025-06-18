import { Schema, model, Document, Types } from 'mongoose';

export interface MediaPostDocument extends Document {
  user: Types.ObjectId;
  place: Types.ObjectId;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  caption?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaPostSchema = new Schema<MediaPostDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    place: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    mediaType: { type: String, enum: ['image', 'video'], required: true },
    mediaUrl: { type: String, required: true },
    caption: { type: String },
  },
  { timestamps: true }
);

MediaPostSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export const MediaPostModel = model<MediaPostDocument>('MediaPost', MediaPostSchema);