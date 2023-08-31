// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import postsData from "../../../mockData/blog.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let data = postsData.categories;
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).send({ error: "failed to fetch data" });
  }
}
