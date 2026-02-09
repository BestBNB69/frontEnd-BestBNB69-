import { Host } from './host';
import { photoModel } from './photos';

export interface DetailsAnnoucement {
  id: string;
  title: string;
  type: string;
  city: string;
  country: string;
  pricePerNight: number;
  capacity: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  description: string;
  photos: photoModel[];
  averageRating: number;
  totalReviews: number;
  availability: Availability[]
  amenities: Amenity[];
  hostInfo: Host;
  rules: ListingRules;
  ratings: number;
}

export interface Availability {
  date: string;
  available: boolean;
}

export interface Amenity {
  name: string;
  icon: string;
}

export interface ListingRules {
  checkIn: string;
  checkOut: string;
  maxGuests: number;
  cancellationPolicy: string;
  houseRules: string[];
  safetyRules: string[];
}
