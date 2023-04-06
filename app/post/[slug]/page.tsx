"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { formatDistance } from "date-fns";
import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Post";
import Skeleton from "@/app/components/Skeleton";
import ArrowBack from "../../images/arrowBack.svg";

interface URL {
  // we get this from the browser
  params: {
    slug: string;
  };
  searchParams: string;
}

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading, isError } = useQuery<PostType>(
    ["post-details"],
    () => fetchDetails(url.params.slug)
  );

  const relativeTimeString = (dateInString: string) => {
    return formatDistance(Date.parse(dateInString), new Date(), {
      addSuffix: true,
    });
  };

  if (isLoading) return <Skeleton />;
  if (isError) return "Error - can't get post";

  return (
    <div className="relative animate-fade-in">
      <Link href="/" className="flex align-center gap-2 absolute left-0 -top-12 hover:-left-4 duration-150">
        <Image
          src={ArrowBack}
          alt=""
          width={32}
          height={32}
          className=""
        /> <p className="text-lg">Back</p>
      </Link>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
        createdAt={data?.createdAt}
        comments={data?.comments}
      />
      <AddComment postId={data?.id} />
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm ml-auto">
              {relativeTimeString(comment.createdAt)}
            </h2>
          </div>
          <div className="py-4">{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
