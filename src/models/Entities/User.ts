export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  profilePictureUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}
