export interface Review {
  id: string;
  userId: string;
  placeId: string;
  rating: number;
  comment?: string;
  mediaPosts: string[];
  createdAt: Date;
  updatedAt: Date;
}