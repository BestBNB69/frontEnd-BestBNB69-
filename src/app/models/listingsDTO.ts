import {photoModel} from './photos';
import {Host} from './host';
import {Amenity, Availability, ListingRules} from './details-annoucement';

export interface ListingsDTO {
  updatedAt?: string;
  title: string,
  description: string,
  city: string,
  country: string,
  address: string,
  postalCode: string,
  pricePerNight: 0,
  maxGuests: 0,
  surface: 0,
  available: boolean,
  location: number[],
  id?: string;
  type?: string;
  capacity?: number;
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
  photos?: photoModel[];
  averageRating?: number;
  totalReviews?: number;
  availability?: Availability[]
  amenities: Amenity[];
  hostInfo?: Host;
  rules?: ListingRules;
  ratings?: number;
}
