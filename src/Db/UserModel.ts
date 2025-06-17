import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  countryCode?: string;
  phoneNumber?: string;
  passwordHash: string;
  profilePictureUrl?: string;
  bio?: string;
  type: 'traveller' | 'guide';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    countryCode: { type: String },
    phoneNumber: { type: String },
    passwordHash: { type: String, required: true },
    profilePictureUrl: { type: String },
    bio: { type: String },
    type: { type: String, required: true, enum: ['traveller', 'guide'] },
  },
  { timestamps: true, discriminatorKey: 'type' }
);

UserSchema.index({ countryCode: 1, phoneNumber: 1 }, { unique: true, sparse: true });

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const UserModel = model<UserDocument>('User', UserSchema);