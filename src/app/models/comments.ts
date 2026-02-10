export interface ListingComment {
  id: string;
  name?: string;
  content: string;
  score?: number; // nullable
  parentCommentId?: string;
  createdAt: string;
  replies: ListingComment[];
}
