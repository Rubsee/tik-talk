import {
  Component,
  inject,
  input,
  OnInit, signal,
} from '@angular/core';

import {PostInputComponent, CommentComponent} from '../../ui';
import {Post, postActions, PostComment, selectCommentsByPostId} from "../../data";
import {SvgIconComponent, AvatarCircleComponent, DatetimePipe} from "@tt/common-ui";
import {GlobalStoreService} from "@tt/shared";
import {Store} from "@ngrx/store";


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
  store = inject(Store);

  post = input<Post>();
  profile = inject(GlobalStoreService).me;
  comments = signal<PostComment[]>([]);
  // comments = this.store.selectSignal(selectCommentsByPostId);
  isCommentInput = input(false);


  async ngOnInit() {
    this.comments.set(this.post()!.comments);
    // this.store.dispatch(postActions.getPostComments({postId: this.post()!.id}))
  }

  onCreateComment(commentText: string) {
    this.store.dispatch(postActions.createCommentEvents({
        createComment: {
          text: commentText,
          authorId: this.profile()!.id,
          postId: this.post()!.id
        }
      })
    )
  }
}
