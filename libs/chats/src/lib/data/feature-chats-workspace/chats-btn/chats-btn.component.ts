import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { LastMessageRes } from '../../interfaces/chats.interface';
import { DatetimePipe } from '../../../../../../common-ui/src/lib/pipes/datetime.pipe';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent, DatetimePipe],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chat = input<LastMessageRes>();
}
