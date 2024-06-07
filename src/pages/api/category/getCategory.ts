import { selectCategory } from "@/services/category";
import { selectEventList, selectEventListById } from "@/services/event";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await selectCategory();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}