import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';

import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SvgIconComponent, AvatarCircleComponent} from "@tt/common-ui";
import {GlobalStoreService} from "@tt/shared";

@Component({
  selector: 'app-post-input',
  imports: [
    AvatarCircleComponent,

    NgIf,
    SvgIconComponent,
    FormsModule,
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  r2 = inject(Renderer2);


  postId = input<number>(0);
  isCommentInput = input(false);
  profile = inject(GlobalStoreService).me;

  @Output() created = new EventEmitter();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }

  postText = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  sendText() {
    this.created.emit(this.postText);
    this.postText = '';
  }
}
