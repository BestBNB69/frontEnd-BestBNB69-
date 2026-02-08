import { Injectable } from '@angular/core';
import {supabase} from '../envirronement';
export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  edited_at?: string;
  is_deleted: boolean;
}

export interface Conversation {
  id: string;
  title?: string;
  created_at: string;
  updated_at: string;
  last_message_at?: string;
  last_message?: string;
  participant_name?: string;
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
  async getUserConversations(userId: string): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('conversation_participants')
      .select(`
        conversation_id,
        conversations!inner (
          id,
          title,
          created_at,
          updated_at,
          last_message_at
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }

    const conversations: Conversation[] = data?.map((item: any) => ({
      id: item.conversations.id,
      title: item.conversations.title,
      created_at: item.conversations.created_at,
      updated_at: item.conversations.updated_at,
      last_message_at: item.conversations.last_message_at,
      last_message: undefined
    })) || [];

    for (const conv of conversations) {
      const lastMsg = await this.getLastMessage(conv.id);
      if (lastMsg) {
        conv.last_message = lastMsg.content;
      }
    }

    return conversations;
  }

  async getConversationMessages(conversationId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    return data || [];
  }

  async sendMessage(conversationId: string, senderId: string, content: string): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content: content
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error sending message:', error);
      return null;
    }

    await supabase
      .from('conversations')
      .update({
        last_message_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', conversationId);

    return data;
  }

  async createConversation(title?: string): Promise<string | null> {
    const { data, error } = await supabase
      .from('conversations')
      .insert({ title })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating conversation:', error);
      return null;
    }

    return data?.id || null;
  }

  async addParticipant(conversationId: string, userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('conversation_participants')
      .insert({
        conversation_id: conversationId,
        user_id: userId
      });

    if (error) {
      console.error('Error adding participant:', error);
      return false;
    }

    return true;
  }

  async getLastMessage(conversationId: string): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching last message:', error);
      return null;
    }

    return data;
  }

  async markAsRead(conversationId: string, userId: string): Promise<void> {
    await supabase
      .from('conversation_participants')
      .update({ last_read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('user_id', userId);
  }

  subscribeToMessages(conversationId: string, callback: (message: Message) => void) {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();
  }
}
