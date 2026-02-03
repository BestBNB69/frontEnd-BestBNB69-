export interface Review {
  id: number;
  userName: string;
  userPhoto: string;
  rating: number;
  date: Date;
  comment: string;
}

export interface ReviewStats {
  cleanliness: number;
  communication: number;
  checkIn: number;
  location: number;
}
