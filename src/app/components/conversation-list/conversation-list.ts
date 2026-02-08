import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Conversation, MessagingService} from '../../services/messaging.service';

@Component({
  selector: 'app-conversation-list',
  imports: [],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.css',
})
export class ConversationList implements OnInit{
  @Output() conversationSelected = new EventEmitter<string>();

  conversations: Conversation[] = [];
  selectedConversationId: string | null = null;
  currentUserId = 'demo-user-id';

  constructor(private messagingService: MessagingService) {}

  async ngOnInit() {
    await this.loadConversations();
  }

  async loadConversations() {
    this.conversations = await this.messagingService.getUserConversations(this.currentUserId);
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversationId = conversation.id;
    this.conversationSelected.emit(conversation.id);
  }

  async createNewConversation() {
    const title = prompt('Titre de la conversation (optionnel):');
    const conversationId = await this.messagingService.createConversation(title || undefined);

    if (conversationId) {
      await this.messagingService.addParticipant(conversationId, this.currentUserId);
      await this.loadConversations();
      this.selectConversation({ id: conversationId } as Conversation);
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `${diffMins}min`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}j`;

    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }
}
