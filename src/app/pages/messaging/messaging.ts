import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MessagingService } from '../../services/messaging.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Conversation, ConversationBack, Message } from '../../models/messages';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-messaging',
  imports: [
    FormsModule,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './messaging.html',
  styleUrl: './messaging.css',
})
export class Messaging implements OnInit {
  messages: any[] = []
  nc: Conversation[] = [];
  mc: Message[] = []
  selectedConversation: Conversation | null = null;
  messageInput = '';
  isSending = false;
  showNewConversationDialog = false;
  newParticipantName = '';
  routeA!: string | null;
  loading = true
  conversations$: Observable<Conversation[]> | undefined
  selectedConversation$: Observable<Conversation | null> | undefined
  messages$: any;
  messagesSorted$!: Observable<Message[]>;
  newId = ""
  newName = ""

  constructor(private messagingService: MessagingService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.routeA = this.route.snapshot.paramMap.get('id') ?? ""
    this.messagingService.fetchConversation(this.routeA).subscribe(convs => {
      this.nc = convs;
      this.bakeConv(convs)
      // this.cdr.detectChanges();
    });
    this.conversations$ = this.messagingService.conversations$;
    this.messagingService.currentConversation$.subscribe(conv => {
      this.selectedConversation = conv;
      if (conv) {
        this.bakeMessage(conv.conversationId);
      }
      this.selectedConversation$ = this.messagingService.currentConversation$;
      this.messages$ = this.messagingService.messages$;
      this.sortedMessages()
    });
  }

  bakeConv(convs: any[]) {
    this.nc = convs.map(conv => ({
      conversationId: conv.conversationId,
      title: conv.title,
      messages: []
    }));
    this.messagingService.loadFConversations(this.nc);
  }

  bakeMessage(conversationId: string) {
    this.messagingService.fetchMessages(conversationId)
      .subscribe(result => {
        const messages = result.map((e: { messageId: any; userInfo: { userId: any; userName: any; }; content: any; owner: any; createdAt: string | number | Date; }) => ({
          id: e.messageId,
          sender_id: e.userInfo.userId,
          sender_name: e.userInfo.userName,
          content: e.content,
          owner: e.owner,
          timestamp: new Date(e.createdAt)
        }));
        this.messagingService.setMessages(messages);
      });
  }

  sortedMessages() {
    this.messagesSorted$ = this.messagingService.messages$.pipe(
      map(messages =>
        [...messages].sort(
          (a, b) =>
            new Date(a.timestamp).getTime() -
            new Date(b.timestamp).getTime()
        )
      )
    );
  }

  selectConversation(conversation: Conversation) {
    this.messagingService.selectConversation(conversation.conversationId);
    this.messageInput = '';
  }

  sendMessage(event: Event) {
    event.preventDefault();
    if (!this.selectedConversation || !this.messageInput.trim() || this.isSending) return;
    this.isSending = true;
    this.newId = this.selectedConversation.conversationId;
    this.newName = this.messageInput.trim()
    this.messagingService.newMessages({
      conversationId: this.selectedConversation.conversationId,
      content: this.messageInput
    }).subscribe(result => {
      this.messagingService.sendMessage(this.newId, this.newName, result.name, result.id);
    })
    this.messageInput = '';
    this.isSending = false;
  }

  openNewConversationDialog() {
    this.showNewConversationDialog = true;
    this.newParticipantName = '';
  }

  closeNewConversationDialog() {
    this.showNewConversationDialog = false;
    this.newParticipantName = '';
  }

  createNewConversation() {
    if (!this.newParticipantName.trim()) return;
    let conversation: ConversationBack = {
      listingId: this.routeA ?? "",
      title: this.newParticipantName,
    }
    let conversation2: Conversation = {
      conversationId: this.routeA ?? "",
      title: this.newParticipantName,
    }
    this.messagingService.newConversation(conversation).subscribe({
      next: res => {
        console.log(res);
        conversation2.conversationId = res.convsid
      }
    });
    this.selectConversation(conversation2);
    this.closeNewConversationDialog();
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  formatTime(date: Date | string): string {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `${diffMins}min`;
    if (diffHours < 24) return `${diffHours}h`;

    return d.toLocaleDateString('fr-FR');
  }

  formatMessageTime(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
}
