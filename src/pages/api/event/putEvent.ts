import { selectEventListById, updateEvent } from "@/services/event";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        id,
        address,
        category,
        doroAddress,
        eventName,
        eventHall,
        jibunAddress,
        lat,
        lng,
        site,
        priceList,
        startDate,
        endDate,
        title,
    } = req.body;
    try {
        const data = await updateEvent(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}