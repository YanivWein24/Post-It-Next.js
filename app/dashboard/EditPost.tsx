"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import DeleteModal from "./DeleteModal";

interface EditPostProps {
  postId: string;
  avatar: string;
  name: string;
  title: string;
  createdAt: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
}

export default function EditPost({
  postId,
  avatar,
  name,
  title,
  createdAt,
  comments,
}: EditPostProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const relativeTimeString = (dateInString: string) => {
    return formatDistance(Date.parse(dateInString), new Date(), {
      addSuffix: true,
    });
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg animate-fade-in">
        <div className="flex items-center gap-2">
          <Image width={32} height={32} src={avatar} alt="avatar" />
          <h3 className="font-bold text-grey-700">{name}</h3>
          <h2 className="text-sm ml-auto">{relativeTimeString(createdAt)}</h2>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={`/post/${postId}`}
            onClick={() => window.scroll({ top: 0 })}
          >
            <p className="text-sm font-bold text-gray-700">
              {comments?.length} Comments
            </p>
          </Link>
          <button
            className="text-sm font-bold text-red-500"
            onClick={() => setIsModalOpen(true)}
          >
            Delete
          </button>
        </div>
      </div>
      {isModalOpen && (
        <DeleteModal setIsModalOpen={setIsModalOpen} postId={postId} />
      )}
    </>
  );
}
