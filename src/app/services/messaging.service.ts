import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';
import { Conversation, ConversationBack, Message } from '../models/messages';

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

  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();


  private storageKey = 'bestbnb_conversations';
  private currentUserId = 'current-user-' + Math.random().toString(36).substr(2, 9);
  private apiUrl = 'http://localhost:5235/api/messages'
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });

  constructor(private http: HttpClient) {
    this.loadConversations();
  }

  fetchConversation(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/convs/${id}`, {
      headers: this.headers
    }).pipe(tap(res => {
      // this.getConversations()
    })
    );
  }

  fetchMessages(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.headers
    });
  }

  newConversation(data: ConversationBack): Observable<any> {
    return this.http.post(`${this.apiUrl}/convs`, data, {
      headers: this.headers
    }).pipe(tap(res => {
      this.createConversation(data.title, res)
    })
    );
  }

  newMessages(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data, {
      headers: this.headers
    });
  }

  fetchContacts() {
    return this.http.get(`${this.apiUrl}/contacts`, {
      headers: this.headers
    });
  }

  private loadConversations() {
    const stored = localStorage.getItem(this.storageKey);
    const conversations = stored ? JSON.parse(stored) : [];
    conversations.forEach((conv: Conversation) => {
      conv.messages?.forEach((msg: Message) => {
        msg.timestamp = new Date(msg.timestamp);
      });

      if (conv.last_message_time) {
        conv.last_message_time = new Date(conv.last_message_time);
      }
    });

    this.conversationsSubject.next(conversations);
  }

  setMessages(messages: Message[]) {
    this.messagesSubject.next(messages);
  }

  loadFConversations(convs: Conversation[]) {
    this.conversationsSubject.next(convs);
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

  createConversation(participantName: string, id: any) {
    const newConversation: Conversation = {
      conversationId: id.convsid,
      title: participantName,
      messages: []
    };
    const conversations = this.conversationsSubject.value;
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
    // console.log('ALL CONVS', this.conversationsSubject.value);
    // console.log('SELECT ID', conversationId);
    const conversations = this.conversationsSubject.value;
    const conversation = conversations.find(c => c.conversationId === conversationId);
    // console.log('FOUND', conversation);
    this.currentConversation.next(conversation || null);
  }

  emitCurrentConversation(conv: Conversation) {
    this.currentConversation.next(conv);
  }

  sendMessage(conversationId: string, content: string, senderName: string = 'Vous', Mid: string = 'msg-' + Date.now()) {
    const conversations = this.conversationsSubject.value;
    const conversation = conversations.find(c => c.conversationId === conversationId);
    let messages = this.messagesSubject.value;

    if (conversation) {
      const message: Message = {
        id: Mid,
        sender_id: this.currentUserId,
        sender_name: senderName,
        content: content,
        owner: true,
        timestamp: new Date()
      };
      messages.push(message)
      this.messagesSubject.next(messages)

      // conversation.messages?.push(message);
      // conversation.last_message = content;
      // conversation.last_message_time = new Date();

      // this.conversationsSubject.next(conversations);
      // this.currentConversation.next(conversation);
      // this.saveConversations();
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
