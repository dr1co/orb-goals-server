import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().regex(/^[0-9]+$/),
});

export const env = envSchema.parse(process.env);
