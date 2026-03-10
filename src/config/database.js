require("dotenv").config();
const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");

console.log("DATABASE_URL =>", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

module.exports = db;
