import {createSelector} from "@ngrx/store";
import {postFeature} from "./reducer";

export const selectCreatedPosts = createSelector(
  postFeature.selectPosts,
  (posts) => posts,
)

export const selectCommentsByPostId = createSelector(
  postFeature.selectComments,
  (comments) => comments.filter(comment => comment.postId)
);

