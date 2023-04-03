"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <li className="list-none">
      <button
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-lg disabled:opacity-25 hover:bg-gray-500 transition ease-in-out duration-200"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </li>
  );
}
