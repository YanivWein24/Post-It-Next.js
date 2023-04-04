"use client";

import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ToggleProps {
  postId: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteModal({ postId, setIsModalOpen }: ToggleProps) {
  const queryClient = useQueryClient();
  let deleteToastId = "this string must not be empty";

  const { mutate } = useMutation(
    async () => await axios.delete("/api/posts/deletePost", { data: postId }),
    {
      onError: (error) => {
        console.log(error); /* eslint-disable-line */
        toast.error("Error - post delete failed", { id: deleteToastId });
      },
      onSuccess: () => {
        toast.success("Post has been deleted", { id: deleteToastId });
        queryClient.invalidateQueries(["user-posts"]); // invalidate the query cache and refetch the data
        queryClient.invalidateQueries(["all-posts"]);
      },
    }
  );

  const deletePost = () => {
    deleteToastId = toast.loading("Deleting your post..", {
      id: deleteToastId,
    });
    mutate();
  };

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        setIsModalOpen(false);
      }}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 animate-fade-in"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">
          Are you sure you want to delete this post? 😥
        </h2>
        <h3 className="text-red-600 text-sm">
          Pressing the delete button will permanently delete your post
        </h3>
        <button
          onClick={() => deletePost()}
          className="bg-red-600 text-sm text-white py-2 px-4 rounded-md"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}
