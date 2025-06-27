import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {CommentCreateDto, Post, PostComment, PostCreateDto} from "../interfaces/post.interface";

export const postActions = createActionGroup({
  source: 'post',
  events: {
    //Создание поста
    'create post events': props<{ createPosts: PostCreateDto }>(),
    //Загрузка постов
    'posts loaded': props<{ posts: Post[] }>(),
    //Запрос на загрузку постов
    'loading post events': emptyProps,

    //Создание комента
    'create comment events': props<{ createComment: CommentCreateDto }>(),
    //Загрузка комментов
    'comments loaded': props<{ comments: PostComment[] }>(),
    //Загрузка коментов к посту по id
    'get post comments': props<{ postId: number }>(),
  }
})
