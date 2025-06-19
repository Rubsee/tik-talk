import {
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import {PostInputComponent, CommentComponent} from '../../ui';
import {firstValueFrom} from 'rxjs';
import {Post, PostComment, PostService} from "../../data";
import {SvgIconComponent, AvatarCircleComponent, DatetimePipe} from "@tt/common-ui";
import {GlobalStoreService} from "@tt/shared";


@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    DatetimePipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();
  profile = inject(GlobalStoreService).me;
  comments = signal<PostComment[]>([]);
  isCommentInput = input(false);

  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreateComment(commentText: string) {
    firstValueFrom(
      this.postService.createComment({
        text: commentText,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
      })
    ).then(async () => {
      const comments: PostComment[] = await firstValueFrom(
        this.postService.getCommentsByPostId(this.post()!.id)
      );
      this.comments.set(comments);
    });
    return;
  }
}
