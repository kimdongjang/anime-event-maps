import { QueryResultRow, sql } from "@vercel/postgres";
import { IEventHallTemplate, IEventTemplate } from "./@types";

export async function selectEventTemplate() {
    const { rows } = await sql`SELECT * FROM event_template`;
     // rows를 IEventTemplate[] 타입으로 변환
  const templates: IEventTemplate[] = rows.map(row => ({
    id: row.id,
    eventName: row.event_name,
    category: row.category,
    websiteUrl: row.website_url,
    imageUrl: row.image_url,
  }));
  return templates;
}

export async function selectEventHallTemplate() {
    const { rows } = await sql`SELECT * FROM eventhall_template`;
    const templates: IEventHallTemplate[] = rows.map(row => ({
        id: row.id,
        hallName: row.hall_name,
        roadAddress: row.road_address,
        jibunAddress: row.jibun_address,
        latitude: row.latitude,
        longitude: row.longitude,
      }));
      return templates;
}

// event_template 테이블에 데이터 삽입
export async function insertEventTemplate(values: {
    eventName: string;
    category: string;
    websiteUrl: string;
    imageUrl: string;
}) {
    const { eventName, category, websiteUrl, imageUrl } = values;

    const result = await sql`
      INSERT INTO event_template (event_name, category, website_url, image_url)
      VALUES (${eventName}, ${category}, ${websiteUrl}, ${imageUrl})
      RETURNING id;  -- 삽입된 행의 ID 반환
    `;

    // result.rows는 배열입니다.
    if (result.rows.length > 0) {
        console.log('Inserted event ID:', result.rows[0].id);
        return result.rows[0].id;
    } else {
        console.error('No rows returned');
        return -1;
    }
}

// eventhall_template 테이블에 데이터 삽입
export async function insertEventHallTemplate(values: {
    hallName: string;
    roadAddress: string;
    jibunAddress: string;
    latitude: number;
    longitude: number;
}) {
    const { hallName, roadAddress, jibunAddress, latitude, longitude } = values;

    const result = await sql`
      INSERT INTO eventhall_template (hall_name, road_address, jibun_address, latitude, longitude)
      VALUES (${hallName}, ${roadAddress}, ${jibunAddress}, ${latitude}, ${longitude})
      RETURNING id;  -- 삽입된 행의 ID 반환
    `;

    // result.rows는 배열입니다.
    if (result.rows.length > 0) {
        console.log('Inserted event ID:', result.rows[0].id);
        return result.rows[0].id;
    } else {
        console.error('No rows returned');
        return -1;
    }
}
