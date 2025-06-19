import { Component, HostBinding, HostListener, input } from '@angular/core';
import { Message } from '../../../../interfaces/chats.interface';
import { AvatarCircleComponent } from '../../../../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
