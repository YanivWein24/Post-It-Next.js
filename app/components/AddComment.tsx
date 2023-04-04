"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Comment {
  postId?: string;
  title: string;
}

export default function AddComment({ postId }: { postId: string }) {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  let toastPostID = "this string must not be empty";

  const { mutate, isLoading } = useMutation(
    async (data: Comment) =>
      await axios.post("/api/posts/addComment", { data }),
    {
      onError: (error) => {
        error instanceof AxiosError &&
          // this way is shorter than creating an interface for error
          toast.error(error?.response?.data.message, { id: toastPostID });
      },
      onSuccess: () => {
        setTitle("");
        toast.success("Uploaded Successfully 🔥", { id: toastPostID });
        queryClient.invalidateQueries(["post-details"]);
      },
    }
  );

  const submitComment = async (event: FormEvent) => {
    toastPostID = toast.loading("Uploading your comment", { id: toastPostID });
    event.preventDefault();
    mutate({ postId, title });
  };

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3 className="text-xl">Add a comment</h3>

      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-md rounded-md my-2"
          placeholder="Write comment here"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`text-sm bg-teal-600 text-white py-2 px-6 rounded-lg disabled:opacity-25 ${
            !isLoading && "hover:bg-teal-800"
          } transition ease-in-out duration-200`}
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >
          {`${title.length}/300`}
        </p>
      </div>
    </form>
  );
}
