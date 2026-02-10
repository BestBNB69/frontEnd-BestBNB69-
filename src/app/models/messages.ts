export interface Message {
    id: string;
    sender_id: string;
    sender_name: string;
    content: string;
    owner: boolean;
    timestamp: Date;
}

export interface Conversation {
    conversationId: string;
    title: string;
    last_message?: string;
    last_message_time?: Date;
    messages?: Message[];
}

export interface ConversationBack {
    listingId: string;
    title: string;
    last_message?: string;
    last_message_time?: Date;
    messages?: Message[];
}

export interface ConversationParticipant {
    id: string;
    conversation_id: string;
    user_id: string;
    joined_at: string;
    last_read_at?: string;
}