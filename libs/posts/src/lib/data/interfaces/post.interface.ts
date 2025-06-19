import {Profile} from "@tt/interfaces/profile";

export interface PostCreateDto {
  title: string;
  content: string;
  authorId: number;
  // communityId: 0
}

export interface Post {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: Profile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  // likes: 0,
  comments: PostComment[];
}

export interface PostComment {
  id: number;
  text: string;
  author: {
    id: 0;
    username: string;
    avatarUrl: string;
    subscribersAmount: 0;
  };
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateDto {
  text: string;
  authorId: number;
  postId: number;
  // commentId: 0
}
