import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

import {firstValueFrom} from 'rxjs';
import {MyDebounce} from "@tt/shared";
import {postActions, PostService, selectCreatedPosts} from "../../data";
import {PostInputComponent} from "../../ui";
import {GlobalStoreService} from "@tt/shared";
import {PostComponent} from '../post/post.component';
import {Store} from "@ngrx/store";


@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  store = inject(Store)

  feed = this.store.selectSignal(selectCreatedPosts)
  // feed = this.postService.posts;
  profile = inject(GlobalStoreService).me;

  @MyDebounce(300)
  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  constructor() {
    this.store.dispatch(postActions.loadingPostEvents())
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    return this.store.dispatch(postActions.createPostEvents({
      createPosts: {
        title: 'Крутой пост',
        content: postText,
        authorId: this.profile()!.id
      }
    }))

    // firstValueFrom(
    //   this.postService.createPost({
    //     title: 'Крутой пост',
    //     content: postText,
    //     authorId: this.profile()!.id,
    //   })
    // ).then(() => {
    // });
  }
}
