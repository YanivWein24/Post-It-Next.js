export interface PostType {
  id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
  };
  comments?: {
    id: string;
    postId: string;
    userId: string;
    createdAt: string;
    message: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
}
