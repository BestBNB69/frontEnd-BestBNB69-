export interface Comments {
  id: string;
  listingId: string;

  userId: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };

  parentCommentId?: string;
  replies?: Comments[];

  content: string;
  createdAt: string;
}
