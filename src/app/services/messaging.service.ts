import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Conversation} from '../models/conversation';
import {Message} from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private conversationsSubject = new BehaviorSubject<Conversation[]>([]);
  public conversations$ = this.conversationsSubject.asObservable();

  private currentConversationSubject =
    new BehaviorSubject<Conversation | null>(null);
  public currentConversation$ =
    this.currentConversationSubject.asObservable();

  private storageKey = 'bestbnb_conversations';
  private currentUserId = 'current-user';

  constructor() {
    this.loadConversations();
  }

  /* -----------------------------
   * Chargement des conversations
   * ----------------------------- */

  private async loadConversations() {
    const stored = localStorage.getItem(this.storageKey);

    if (stored) {
      const conversations = JSON.parse(stored);
      this.parseAndSetConversations(conversations);
    } else {
      await this.loadFromJSON();
    }
  }

  private async loadFromJSON() {
    try {
      const response = await fetch('assets/data/conversations-data.json');
      const data = await response.json();
      this.parseAndSetConversations(data.conversations);
      this.saveConversations();
    } catch (error) {
      console.error(
        'Erreur lors du chargement des conversations :',
        error
      );
      this.conversationsSubject.next([]);
    }
  }

  private parseAndSetConversations(conversations: Conversation[]) {
    conversations.forEach(conv => {
      conv.messages.forEach(msg => {
        msg.timestamp = new Date(msg.timestamp);
      });

      if (conv.last_message_time) {
        conv.last_message_time = new Date(conv.last_message_time);
      }
    });

    this.conversationsSubject.next(conversations);
  }

  private saveConversations() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.conversationsSubject.value)
    );
  }

  /* -----------------------------
   * Getters
   * ----------------------------- */

  getConversations(): Observable<Conversation[]> {
    return this.conversations$;
  }

  getCurrentUserId(): string {
    return this.currentUserId;
  }
  getOrCreateConversationForListing(
    listingId: number,
    hostName: string
  ) {
    const conversations = this.conversationsSubject.value;

    // 1️⃣ chercher si elle existe déjà
    const existing = conversations.find(
      c => c.listingId === listingId &&
        c.participants.includes(this.currentUserId)
    );

    if (existing) {
      return existing;
    }

    // 2️⃣ sinon la créer
    const newConversation = {
      id: 'conv-' + Date.now(),
      listingId,
      participants: [this.currentUserId, hostName],
      messages: []
    };

    conversations.push(newConversation);
    this.conversationsSubject.next(conversations);
    this.saveConversations();

    return newConversation;
  }


  /* -----------------------------
   * Règle métier principale
   * ----------------------------- */

  canSendMessage(conversation: Conversation | null): boolean {
    if (!conversation || !conversation.reservation) {
      return false;
    }

    return (
      conversation.reservation.userId === this.currentUserId &&
      conversation.reservation.status === 'confirmed'
    );
  }

  /* -----------------------------
   * Sélection / création
   * ----------------------------- */

  selectConversation(conversationId: string) {
    const conversation = this.conversationsSubject.value.find(
      c => c.id === conversationId
    );
    this.currentConversationSubject.next(conversation || null);
  }

  createConversation(participantName: string): Conversation {
    const newConversation: Conversation = {
      id: 'conv-' + Date.now(),
      listingId: 0,
      participants: [this.currentUserId, participantName],
      messages: [],
    };

    const conversations = this.conversationsSubject.value;
    conversations.push(newConversation);

    this.conversationsSubject.next(conversations);
    this.saveConversations();

    return newConversation;
  }

  /* -----------------------------
   * Envoi de message (sécurisé)
   * ----------------------------- */

  sendMessage(
    conversationId: string,
    content: string,
    senderName: string = 'Vous'
  ) {
    const conversations = this.conversationsSubject.value;
    const conversation = conversations.find(
      c => c.id === conversationId
    );

    if (!conversation || !this.canSendMessage(conversation)) {
      console.warn(
        'Envoi bloqué : réservation confirmée requise'
      );
      return;
    }

    const message: Message = {
      id: 'msg-' + Date.now(),
      sender_id: this.currentUserId,
      sender_name: senderName,
      content,
      timestamp: new Date()
    };

    conversation.messages.push(message);
    conversation.last_message = content;
    conversation.last_message_time = new Date();

    this.conversationsSubject.next(conversations);
    this.currentConversationSubject.next(conversation);
    this.saveConversations();
  }

  /* -----------------------------
   * Dev only
   * ----------------------------- */

  resetConversations() {
    localStorage.removeItem(this.storageKey);
    this.loadFromJSON();
  }
}
