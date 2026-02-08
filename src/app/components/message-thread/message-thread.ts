import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Message} from '../../services/messaging.service';
import {MessagingService} from '../../services/messaging.service';

@Component({
  selector: 'app-message-thread',
  imports: [],
  templateUrl: './message-thread.html',
  styleUrl: './message-thread.css',
})
export class MessageThread implements OnInit, OnDestroy, OnChanges{
  @Input() conversationId: string | null = null;

  messages: Message[] = [];
  newMessage = '';
  isSending = false;
  currentUserId = 'demo-user-id';
  subscription: any;

  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    if (this.conversationId) {
      this.loadMessages();
      this.subscribeToNewMessages();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conversationId'] && !changes['conversationId'].firstChange) {
      this.messages = [];
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      if (this.conversationId) {
        this.loadMessages();
        this.subscribeToNewMessages();
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async loadMessages() {
    if (!this.conversationId) return;

    this.messages = await this.messagingService.getConversationMessages(this.conversationId);
    await this.messagingService.markAsRead(this.conversationId, this.currentUserId);

    setTimeout(() => this.scrollToBottom(), 100);
  }

  subscribeToNewMessages() {
    if (!this.conversationId) return;

    this.subscription = this.messagingService.subscribeToMessages(
      this.conversationId,
      (message: Message) => {
        if (!this.messages.find(m => m.id === message.id)) {
          this.messages.push(message);
          setTimeout(() => this.scrollToBottom(), 100);
        }
      }
    );
  }

  async sendMessage(event: Event) {
    event.preventDefault();

    if (!this.conversationId || !this.newMessage.trim() || this.isSending) {
      return;
    }

    this.isSending = true;

    const message = await this.messagingService.sendMessage(
      this.conversationId,
      this.currentUserId,
      this.newMessage.trim()
    );

    if (message) {
      this.newMessage = '';
    }

    this.isSending = false;
  }

  scrollToBottom() {
    const container = document.querySelector('app-message-thread .overflow-y-auto');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
