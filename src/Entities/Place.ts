export interface Place {
  id: string;
  name: string;
  type: string;
  description?: string;
  address?: string;
  landmark?: string;
  coordinates: [number, number];
  photos?: string[];
  videos?: string[];
  createdAt: Date;
  updatedAt: Date;
}
