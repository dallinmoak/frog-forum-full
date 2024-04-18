import pg from "pg";

export const prerender = false;

const client = new pg.Client({
  host: "bzy67yrnlufjjxwmfiss-postgresql.services.clever-cloud.com",
  port: 50013,
  database: "bzy67yrnlufjjxwmfiss",
  user: "uoocqbu17khov69ffnla",
  password: "SkHIULoXYZ0NaxIblCxZxTK9Cwgh8w",
});

await client.connect();

export { client as db };
