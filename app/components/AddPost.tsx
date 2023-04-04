"use client";

import { useState, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  let toastPostID = "this string must not be empty";

  const { mutate, isLoading } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        error instanceof AxiosError &&
          // this way is shorter than creating an interface for error
          toast.error(error?.response?.data.message, { id: toastPostID });
      },
      onSuccess: (data) => {
        console.log(data);
        setTitle("");
        toast.success("Created new post 🔥", { id: toastPostID });
        queryClient.invalidateQueries(["all-posts"]); // invalidate the query cache and refetch the data
        queryClient.invalidateQueries(["user-posts"]);
      },
    }
  );

  const submitPost = async (event: FormEvent) => {
    toastPostID = toast.loading("Uploading Post", { id: toastPostID });
    event.preventDefault();
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(event) => setTitle(event.target.value)}
          name="title"
          value={title}
          placeholder="What's on your mind?"
          className="resize-none p-4 text-lg rounded-md my-2 bg-gray-200"
          rows={title.length > 150 ? 6 : 3}
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >
          {`${title.length}/300`}
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className={`text-sm bg-teal-600 text-white py-2 px-6 rounded-lg disabled:opacity-25 ${
            !isLoading && "hover:bg-teal-800"
          } transition ease-in-out duration-200`}
        >
          Create a post
        </button>
      </div>
    </form>
  );
}
