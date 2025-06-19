import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

import {firstValueFrom} from 'rxjs';
import {MyDebounce} from "../../../../../shared/src/lib/data/helpers/decorators/mydebounce-decorator";
import {PostService} from "../../data";
import {PostComponent} from "@tt/posts";
import {PostInputComponent} from "../../ui";
import {GlobalStoreService} from "@tt/shared";


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

  feed = this.postService.posts;
  profile = inject(GlobalStoreService).me;

  @MyDebounce(300)
  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
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

    firstValueFrom(
      this.postService.createPost({
        title: 'Крутой пост',
        content: postText,
        authorId: this.profile()!.id,
      })
    ).then(() => {
    });
  }
}
