// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import postsData from "../../../mockData/blog.json";

interface PostFilters {
  q?: string;
  categoryId?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query: PostFilters = req.query;
  const { categoryId, q } = query;

  try {
    let data = postsData.posts;
    
    if (categoryId) {
      data = data.filter((post) =>
        post.categories.includes(parseInt(categoryId || ""))
      );
    }

    if(q) {
      data = data.filter((post) => post.title.toLowerCase().includes(q.toLowerCase()))
    }

    res.status(200).json({ data });
  } catch (e) {
    res.status(500).send({ error: "failed to fetch data" });
  }
}
