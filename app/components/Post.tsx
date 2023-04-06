"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";

interface PostProps {
  id: string;
  name: string;
  avatar: string;
  postTitle: string;
  createdAt: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
    createdAt: string;
  }[];
}

export default function Post({
  id,
  name,
  avatar,
  postTitle,
  createdAt,
  comments,
}: PostProps) {
  const relativeTimeString = (dateInString: string) => {
    return formatDistance(Date.parse(dateInString), new Date(), {
      addSuffix: true,
    });
  };

  return (
    <div className="bg-white my-8 p-8 rounded-lg animate-fade-in">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
        <h2 className="text-sm ml-auto">{relativeTimeString(createdAt)}</h2>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 items-center">
        <Link href={`/post/${id}`} onClick={() => window.scroll({ top: 0 })}>
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comment
          </p>
        </Link>
      </div>
    </div>
  );
}
