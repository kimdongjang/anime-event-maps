import { IEvent } from "@/services/event/@types";
import { formatYmd } from "@/utils/date";
import { sql } from "@vercel/postgres";

export async function selectEventList() {
  const { rows } = await sql`SELECT * from event_list`;
  return rows;
}

export async function selectEventListById(id: string) {
  const { rows, fields  } = await sql`SELECT * from event_list where id = ${id}`;
  
  return rows[0];
}

export async function updateEvent(event:IEvent){
  const { id, title, category, eventName, startDate, endDate, eventHall, address, doroAddress, jibunAddress, lat, lng, site, titleImage} = event;
  console.log(event)
  try {
    const result = await sql`
      UPDATE event_list
      SET
        title = ${title},
        category = ${category},
        event_name = ${eventName},
        event_hall = ${eventHall},
        start_date = ${startDate},
        end_date = ${endDate},
        address = ${address},
        doro_address = ${doroAddress},
        jibun_address = ${jibunAddress},
        lat = ${lat},
        lng = ${lng},
        site = ${site}
      WHERE id = ${id}
    `;
    console.log('Event updated:', result.rowCount);
  } catch (err) {
    console.error('Error updating event:', err);
  }
}
export async function updateEventImage(id: number, titleImage: string){
  try {
    const result = await sql`
      UPDATE event_list
      SET
        title_image = ${titleImage}
      WHERE id = ${id}
    `;
    console.log('Event updated:', result.rowCount);
  } catch (err) {
    console.error('Error updating event:', err);
  }
}

export async function insertEventList(data: Omit<IEvent, 'id'>) {
  const { title, category, eventName: event, startDate, endDate, eventHall, address, doroAddress, jibunAddress, lat, lng, site, titleImage } = data;

  const result = await sql`
    INSERT INTO event_list (
      title, category, event_name, start_date, end_date, event_hall, address, doro_address, jibun_address, lat, lng, site, title_image
    ) VALUES (  
      ${title}, ${category}, ${event}, ${startDate}, ${endDate}, ${eventHall}, ${address}, ${doroAddress}, ${jibunAddress}, ${lat}, ${lng}, ${site}, ${titleImage}
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


export async function deleteEventById(eventId: number) {
  // eventId가 유효한지 확인
  if (!eventId) {
    console.error('Invalid event ID');
    return -1;
  }

  try {
    const result = await sql`
      DELETE FROM event_list
      WHERE id = ${eventId}
      RETURNING id;
    `;

    // result.rows는 배열입니다.
    if (result.rows.length > 0) {
      console.log('Deleted event ID:', result.rows[0].id);
      return result.rows[0].id;
    } else {
      console.error('No rows returned');
      return -1;
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    return -1;
  }
}