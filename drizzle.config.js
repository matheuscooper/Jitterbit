require("dotenv/config");
const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
  dialect: "postgresql",
  schema: "./src/database/index.js",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
