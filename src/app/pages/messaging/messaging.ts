import {Component, OnInit} from '@angular/core';
import {Conversation, MessagingService} from '../../services/messaging.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-messaging',
  imports: [
    FormsModule
  ],
  templateUrl: './messaging.html',
  styleUrl: './messaging.css',
})
export class Messaging implements OnInit{
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  messageInput = '';
  isSending = false;
  showNewConversationDialog = false;
  newParticipantName = '';
  currentUserId = '';

  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    this.currentUserId = this.messagingService.getCurrentUserId();
    this.messagingService.getConversations().subscribe(convs => {
      this.conversations = convs;
    });
    this.messagingService.currentConversation$.subscribe(conv => {
      this.selectedConversation = conv;
    });
  }

  selectConversation(conversation: Conversation) {
    this.messagingService.selectConversation(conversation.id);
    this.messageInput = '';
  }

  sendMessage(event: Event) {
    event.preventDefault();
    if (!this.selectedConversation || !this.messageInput.trim() || this.isSending) return;

    this.isSending = true;
    this.messagingService.sendMessage(this.selectedConversation.id, this.messageInput.trim());
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

    const conversation = this.messagingService.createConversation(this.newParticipantName.trim());
    this.selectConversation(conversation);
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
