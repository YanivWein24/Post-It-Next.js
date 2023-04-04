export interface PostType {
  id: string;
  title: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
  comments?: {
    id: string;
    postId: string;
    userId: string;
    createdAt: string;
  }[];
}
