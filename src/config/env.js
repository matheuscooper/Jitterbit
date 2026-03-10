require("dotenv").config();
const { z } = require("zod");

const envSchema = z.object({
  PORT: z.string().min(1).default("3000"),
  DATABASE_URL: z.string().min(1),
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),
  JWT_SECRET: z.string().min(1),
});

async function loadEnvs() {
  return envSchema.parse(process.env);
}

module.exports = {
  loadEnvs,
};
