import { sql } from "@vercel/postgres";

export default async function Test({
  params
} : {
  params: { user: string }
}){
  const { rows } = await sql`SELECT * from TEST_TABLE where user_id=${params.user}`;
  return rows;
}