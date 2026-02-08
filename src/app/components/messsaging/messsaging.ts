import { Component } from '@angular/core';
import {MessageThread} from '../message-thread/message-thread';
import {ConversationList} from '../conversation-list/conversation-list';

@Component({
  selector: 'app-messsaging',
  imports: [
    MessageThread,
    ConversationList
  ],
  templateUrl: './messsaging.html',
  styleUrl: './messsaging.css',
})
export class Messsaging {
  selectedConversationId: string | null = null;

  onConversationSelected(conversationId: string) {
    this.selectedConversationId = conversationId;
  }
}
