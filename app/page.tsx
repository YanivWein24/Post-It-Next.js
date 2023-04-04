"use client";

import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { PostType } from "./types/Post";
import Skeleton from "./components/Skeleton";

const getAllPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>(
    ["all-posts"],
    getAllPosts
  );
  return (
    <main>
      <>
        <AddPost />
        {error && <h1>{error.toString()}</h1>}
        {isLoading && <Skeleton />}
        {data?.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            name={post.user.name}
            avatar={post.user.image}
            postTitle={post.title}
            createdAt={post.createdAt}
            comments={post.comments}
          />
        ))}
      </>
    </main>
  );
}
