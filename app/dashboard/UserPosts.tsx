"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserPost } from "../types/UserPost";
import EditPost from "./EditPost";
import Skeleton from "../components/Skeleton";

const fetchUserPosts = async () => {
  const response = await axios.get("/api/posts/getUserPosts");
  return response.data;
};

export default function UserPosts() {
  const { data, isLoading } = useQuery<UserPost>(
    ["user-posts"],
    fetchUserPosts
  );
  if (isLoading) return <Skeleton />;
  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPost
          key={post.id}
          postId={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          createdAt={post.createdAt}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
