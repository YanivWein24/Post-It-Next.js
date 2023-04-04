"use client";

import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";

const getAllPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery(["all-posts"], getAllPosts);
  return (
    <main>
      <>
        <AddPost />
        {error && <h1>{error.toString()}</h1>}
        {isLoading && <h1>Loading...</h1>}
        {data?.map((post: any) => (
          <Post
            key={post.id}
            id={post.id}
            name={post.user.name}
            avatar={post.user.image}
            postTitle={post.title}
          />
        ))}
      </>
    </main>
  );
}
