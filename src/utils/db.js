import pg from "pg";

export const prerender = false;

const client = new pg.Client({
  host: import.meta.env.PG_HOST,
  port: import.meta.env.PG_PORT,
  database: import.meta.env.PG_DATABASE,
  user: import.meta.env.PG_USER,
  password: import.meta.env.PG_PASSWORD,
});

await client.connect();

export { client as db };
