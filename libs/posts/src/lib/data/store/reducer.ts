import {Post, PostComment, PostCreateDto} from "../interfaces/post.interface";
import {createFeature, createReducer, on} from "@ngrx/store";
import {postActions} from "./actions";

export interface PostState {
  posts: Post[];
  comments: PostComment[];
  postCreators: PostCreateDto;
}

export const initialState: PostState = {
  posts: [],
  comments: [],
  postCreators: {
    title: '',
    content: '',
    authorId: 0,
  },
}

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    initialState,
    on(postActions.postsLoaded, (state, payload) => {
      return {
        ...state,
        posts: payload.posts,
      }
    }),
    on(postActions.commentsLoaded, (state, payload) => {
      return {
        ...state,
        comments: payload.comments,
      }
    })
  )
})
