import { IImage } from "@/constants/common";
import { sql } from "@vercel/postgres";

export async function selectImageById(id?: number) {
    const { rows, fields } = await sql`SELECT * from event_images where eventid = ${id}`;

    return rows[0];
}


export async function insertImage(data: IImage) {
    const { id, eventId, alt, height, path, prefix, size, width } = data;

    const result = await sql`
      INSERT INTO event_images (
        eventid, path, alt, prefix, width, height,size
      ) VALUES (  
        ${eventId}, ${path}, ${alt}, ${prefix}, ${width}, ${height}, ${size}
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