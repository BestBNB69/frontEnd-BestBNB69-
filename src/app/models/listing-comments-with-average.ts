import { ListingComment } from './comments';

export interface ListingCommentsWithAverage {
  listingId: string;
  averageRating: number;
  comments: ListingComment[];
}
