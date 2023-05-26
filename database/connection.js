import * as dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

// console.log({ url: process.env.DATABASE_URL });

// const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  allowExitOnIdle: true,
});
