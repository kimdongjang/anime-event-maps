import { sql } from "@vercel/postgres";

export async function getCategory() {
    const { rows } = await sql`SELECT * from category_code`;
    return rows;
}

interface IInsertCategory {
    name: string;
}
export async function insertCategory(data: IInsertCategory) {
    const { name } = data;

    const result = await sql`
      INSERT INTO category_code (
        name
      ) VALUES (
        ${name}
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

interface IDeleteCategory {
    id: number;
}
export async function deleteCategory(data: IDeleteCategory) {
    const { id } = data;
    try {
        const result = await sql`
        DELETE FROM category_code WHERE id = ${id}`;
        return true;
    }
    catch (error) {
        console.error('Error deleting:', error);
        return false;
    }
}
