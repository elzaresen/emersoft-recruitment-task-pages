// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import postsData from "../../../mockData/blog.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const { posts } = postsData;

    const currentPostIndex = postsData.posts.findIndex(
      (post) => post.id.toString() == id
    );
    const nextPostIndex =
      currentPostIndex < posts.length ? currentPostIndex + 1 : undefined;
    const prevPostIndex =
      currentPostIndex > 0 ? currentPostIndex - 1 : undefined;

    const post = posts[currentPostIndex];
    const nextPostId = nextPostIndex ? posts[nextPostIndex].id : null;
    const prevPostId = prevPostIndex ? posts[prevPostIndex].id : null;

    res.status(200).json({ post, nextPostId, prevPostId });
  } catch (e) {
    res.status(500).send({ error: "failed to fetch data" });
  }
}
