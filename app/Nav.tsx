import Link from "next/link";
import { getServerSession } from "next-auth/next";
import Login from "./auth/Login";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Logged from "./auth/Logged";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href="/">
        <h1 className="font-bold text-2xl text-gray-700 hover:text-gray-500 ease-in-out duration-200">
          Post It.
        </h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user ? (
          <Login />
        ) : (
          <Logged image={session?.user?.image || ""} />
        )}
      </ul>
    </nav>
  );
}
