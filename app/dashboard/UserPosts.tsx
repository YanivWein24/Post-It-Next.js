"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserPost } from "../types/UserPost";

const fetchUserPosts = async () => {
  const response = await axios.get("/api/posts/getUserPosts");
  return response.data;
};

export default function UserPosts() {
  const { data, isLoading } = useQuery<UserPost[]>(
    ["user-posts"],
    fetchUserPosts
  );
  if (isLoading) return <h1>Loading posts...</h1>;
  return <div>posts</div>;
}
