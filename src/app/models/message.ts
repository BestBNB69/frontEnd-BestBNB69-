export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  timestamp: Date;
}

export interface Reservation {
  listingId: number;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}
