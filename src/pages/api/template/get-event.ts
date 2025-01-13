import { selectEventTemplate } from "@/services/template";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      // selectEventTemplate 함수로 event_template 테이블에서 데이터를 가져옴
      const data = await selectEventTemplate();
      // 데이터가 잘 받아지면, 클라이언트에 JSON 형식으로 응답
      res.status(200).json(data);
    } catch (error) {
      // 오류가 발생하면 500 상태 코드와 오류 메시지 반환
      res.status(500).json({ error: 'Failed to fetch event template data' });
    }
  }