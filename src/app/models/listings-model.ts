export interface ListingsModel {
  id: string;
  title: string;
  description: string;
  city: string;
  address: string;
  postalCode?: string;
  country: string;
  photos?: any[] | null;
  // rating: number;
  // icone: string;
  hostnames: string[];
  // Date: string;
  updatedAt: string;
  equipmentT: number[];
  locationT: number[];
  surface: number;
  pricePerNight: number;
}
