"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface LoggedProps {
  image: string;
}

export default function Logged({ image }: LoggedProps) {
  return (
    <li className="flex gap-8 items-center">
      <button
        onClick={() => signOut()}
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-lg disabled:opacity-25 hover:bg-gray-500 transition ease-in-out duration-200"
      >
        Sign Out
      </button>
      <Link href="/dashboard">
        <Image width={64} height={64} src={image} alt="" />
      </Link>
    </li>
  );
}
