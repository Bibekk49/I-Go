export interface MediaPost {
  id: string;
  userId: string;
  placeId: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  caption?: string;
  createdAt: Date;
  updatedAt: Date;
}
