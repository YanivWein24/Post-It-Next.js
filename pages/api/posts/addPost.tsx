import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "Please sign in to make a post" });

    const prismaUser = await prisma.user.findUnique({
      // @ts-expect-error
      where: { email: session?.user?.email },
    });

    if (!req.body.title)
      return res.status(400).json({ message: "Missing post text" });

    const title: string = req.body.title;
    if (title.length > 300)
      return res.status(403).json({ message: "Post is too long" });

    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          userId: prismaUser?.id ?? "",
        },
      });
      console.log(newPost);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}
