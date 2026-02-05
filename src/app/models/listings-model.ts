export interface ListingsModel {
  id: string;
  title: string;
  images?: string[] | null;
  city: string;
  postalCode?: string;
  country: string;
  address: string;
  rating: number;
  // icone: string;
  description: string;
  hostnames: string[];
  // Date: string;
  updatedAt: string;
  equipmentT: number[];
  locationT: number[];
  surface: number;
  pricePerNight: number;
}
