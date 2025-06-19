import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '@tt/profile';
import { map } from 'rxjs';
import { DateTime } from 'luxon';
import {Chat, LastMessageRes, Message} from "../interfaces/chats.interface";

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);

  me = inject(ProfileService).me;

  // activeChatMessages = signal<Message[]>([])
  groupedChatMessages = signal<{ label: string; messages: Message[] }[]>([]);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });

        //   todo внести сюда messageForGroup
        const groupedMessage = this.messagesForGroup(patchedMessages);
        this.groupedChatMessages.set(groupedMessage);

        // this.activeChatMessages.set(patchedMessages)

        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  messagesForGroup(messages: Message[]) {
    const messagesArray = messages;
    const groupedMessages: Record<string, Message[]> = {};

    const today = DateTime.now().startOf('day');
    const yesterday = today.minus({ days: 1 });

    messagesArray.forEach((message) => {
      const dateKey = DateTime.fromISO(message.createdAt, { zone: 'UTC' })
        .setZone(DateTime.local().zone)
        .startOf('day');

      let dateLabel: string;
      if (dateKey.hasSame(today, 'day')) {
        dateLabel = 'Сегодня';
      } else if (dateKey.hasSame(yesterday, 'day')) {
        dateLabel = 'Вчера';
      } else {
        dateLabel = dateKey.toFormat('dd.MM.yyyy');
      }

      if (!(dateLabel in groupedMessages)) {
        groupedMessages[dateLabel] = [];
      }
      groupedMessages[dateLabel].push(message);
    });

    return Array.from(Object.entries(groupedMessages)).map(
      ([label, messages]) => ({ label, messages })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }
}
