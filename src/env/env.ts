import z from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().regex(/^[0-9]+$/),
});

export const env = envSchema.parse(process.env);
