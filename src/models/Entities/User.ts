import { Schema, model, Document } from 'mongoose';

// General user interface
export interface User extends Document {
  name: string;
  email: string;
  passwordHash: string;
  profilePictureUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

// General user schema
const GeneralUserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    passwordHash: { type: String, required: true },
    profilePictureUrl: { type: String },
    bio: { type: String },
  },
  { timestamps: true, discriminatorKey: 'role' }
);

// toJSON transformation
GeneralUserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// General user model
export const GeneralUserModel = model<User>('User', GeneralUserSchema);