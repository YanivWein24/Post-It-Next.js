import { getServerSession } from "next-auth/next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import UserPosts from "./UserPosts";
import ArrowBack from "../images/arrowBack.svg";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  return (
    <main className="relative">
      <Link
        href="/"
        className="flex align-center gap-2 absolute left-0 -top-8 hover:-left-4 duration-150"
      >
        <Image src={ArrowBack} alt="" width={32} height={32} />{" "}
        <p className="text-lg">Back</p>
      </Link>
      <h1 className="text-2xl font-bold pt-2">
        Welcome back {session?.user?.name}
      </h1>
      <UserPosts />
    </main>
  );
}
