export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postID: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
