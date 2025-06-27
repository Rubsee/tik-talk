import {inject, Injectable} from "@angular/core";
import {PostService} from "../services/post.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {postActions} from "./actions";
import {map, switchMap} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostEffects {
  postService = inject(PostService);
  actions$ = inject(Actions);

  createPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createPostEvents),
      switchMap(({createPosts}) => {
        return this.postService.createPost(createPosts)
      }),
      map(res => postActions.postsLoaded({posts: res}))
    )
  })

  loadingPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.loadingPostEvents),
      switchMap(({}) => {
        return this.postService.fetchPosts()
      }),
      map(res => postActions.postsLoaded({posts: res}))
    )
  })

  createComments = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createCommentEvents),
      switchMap(({createComment}) => {
        return this.postService.createComment(createComment)
      }),
      map(res => postActions.commentsLoaded({comments: [res]}))
    )
  })

  getPostComments = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.getPostComments),
      switchMap(({postId}) => {
        return this.postService.getCommentsByPostId(postId)
      }),
      map(res => postActions.commentsLoaded({comments: res}))
    )
  })
}
