import {Host} from './host';

export interface DetailsAnnoucement {
  id: number;
  title: string;
  type: string;
  city: string;
  country: string;
  price: number;
  capacity: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  description: string;
  images: string[];
  averageRating: number;
  totalReviews: number;
  availability : Availability[]
  amenities: Amenity[];
  host: Host;
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
