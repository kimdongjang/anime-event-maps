import { IEvent } from "@/services/event/@types";
import { formatYmd } from "@/utils/date";
import { sql } from "@vercel/postgres";

export async function selectEventList() {
  const { rows } = await sql`SELECT * from event_list`;
  return rows;
}

export async function selectEventListById(id?: number) {
  const { rows, fields  } = await sql`SELECT * from event_list where id = ${id}`;
  
  return rows[0];
}

export async function insertEventList(data: Omit<IEvent, 'id'>) {
  const { title, category, eventName: event, startDate, endDate, eventHall, address, doroAddress, jibunAddress, lat, lng, site } = data;

  const result = await sql`
    INSERT INTO event_list (
      title, category, event_name, start_date, end_date, event_hall, address, doro_address, jibun_address, lat, lng, site
    ) VALUES (  
      ${title}, ${category}, ${event}, ${startDate}, ${endDate}, ${eventHall}, ${address}, ${doroAddress}, ${jibunAddress}, ${lat}, ${lng}, ${site}
    ) RETURNING id;
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