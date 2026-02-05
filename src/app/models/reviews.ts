export interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  content: string;
  createdAt: Date;
}
