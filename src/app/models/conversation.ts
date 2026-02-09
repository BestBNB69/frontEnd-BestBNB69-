import {Reservation, Message} from './message';


export interface Conversation {
  id: string;
  listingId: number;
  participants: string[];
  reservation?: Reservation;
  last_message?: string;
  last_message_time?: Date;
  messages: Message[];
}

export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  joined_at: string;
  last_read_at?: string;
}


