export interface ListingComment {
  id: string;
  userId: string;
  content: string;
  score?: number; // nullable
  parentCommentId?: string;
  createdAt: string;
  replies: ListingComment[];
}
