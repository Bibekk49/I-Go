export interface Place {
  id: string;
  name: string;
  type: string;
  description?: string;
  address?: string;
  landmark?: string;
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };
  photos?: string[];
  videos?: string[];
  createdAt: Date;
  createdById: string;
  updatedAt: Date;
}