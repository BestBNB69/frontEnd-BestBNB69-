import { Injectable } from '@angular/core';
import {supabase} from '../envirronement';
import {BehaviorSubject, Observable} from 'rxjs';
export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  participants: string[];
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
@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private conversationsSubject = new BehaviorSubject<Conversation[]>([]);
  public conversations$ = this.conversationsSubject.asObservable();

  private currentConversation = new BehaviorSubject<Conversation | null>(null);
  public currentConversation$ = this.currentConversation.asObservable();

  private storageKey = 'bestbnb_conversations';
  private currentUserId = 'current-user-' + Math.random().toString(36).substr(2, 9);

  constructor() {
    this.loadConversations();
  }

  private loadConversations() {
    const stored = localStorage.getItem(this.storageKey);
    const conversations = stored ? JSON.parse(stored) : [];
    conversations.forEach((conv: Conversation) => {
      conv.messages.forEach((msg: Message) => {
        msg.timestamp = new Date(msg.timestamp);
      });
      if (conv.last_message_time) {
        conv.last_message_time = new Date(conv.last_message_time);
      }
    });
    this.conversationsSubject.next(conversations);
  }

  private saveConversations() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.conversationsSubject.value));
  }

  getConversations(): Observable<Conversation[]> {
    return this.conversations$;
  }

  createConversation(participantName: string): Conversation {
    const newConversation: Conversation = {
      id: 'conv-' + Date.now(),
      participants: [this.currentUserId, participantName],
      messages: []
    };

    const conversations = this.conversationsSubject.value;
    conversations.push(newConversation);
    this.conversationsSubject.next(conversations);
    this.saveConversations();

    return newConversation;
  }

  selectConversation(conversationId: string) {
    const conversations = this.conversationsSubject.value;
    const conversation = conversations.find(c => c.id === conversationId);
    this.currentConversation.next(conversation || null);
  }

  sendMessage(conversationId: string, content: string, senderName: string = 'Vous') {
    const conversations = this.conversationsSubject.value;
    const conversation = conversations.find(c => c.id === conversationId);

    if (conversation) {
      const message: Message = {
        id: 'msg-' + Date.now(),
        sender_id: this.currentUserId,
        sender_name: senderName,
        content: content,
        timestamp: new Date()
      };

      conversation.messages.push(message);
      conversation.last_message = content;
      conversation.last_message_time = new Date();

      this.conversationsSubject.next(conversations);
      this.currentConversation.next(conversation);
      this.saveConversations();
    }
  }

  getCurrentUserId(): string {
    return this.currentUserId;
  }
}
