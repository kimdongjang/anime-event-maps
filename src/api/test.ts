import { sql } from "@vercel/postgres";

export default async function Test({
  params
} : {
  params: { user: string }
}){
  const { rows } = await sql`SELECT * from event_list`;
  return rows;
}