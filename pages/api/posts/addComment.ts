import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

interface addCommentProps {
  title: string;
  postId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Please sign in" });
  if (!req.body.data.title)
    return res.status(400).json({ message: "Missing comment text" });

  const prismaUser = await prisma.user.findUnique({
    // @ts-expect-error
    where: { email: session?.user?.email },
  });

  if (req.method === "POST") {
    const { title, postId }: addCommentProps = req.body.data;

    try {
      const result = await prisma.comment.create({
        // @ts-expect-error
        data: {
          message: title,
          userId: prismaUser?.id,
          postId,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}
