export interface User {
  _id: string;
  email: string;
  avatar: string;
  userName: string;
}

export interface Comment {
  _id: string;
  text: string;
  createdAt: string; // or Date if you parse it
  user: User;
}

export type CommentList = Comment[]