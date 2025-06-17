export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  profilePictureUrl?: string;
  bio?: string;
  type: 'traveller' | 'guide';
  createdAt: Date;
  updatedAt: Date;
}
