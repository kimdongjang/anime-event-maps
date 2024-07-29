import { deleteEventById, selectEventListById, updateEvent } from "@/services/event";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        id,
    } = req.body;
    try {
        const data = await deleteEventById(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}