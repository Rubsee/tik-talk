import {Component, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {DatetimePipe, AvatarCircleComponent} from "@tt/common-ui";
import {PostComment} from "../../data";


@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, DatetimePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
