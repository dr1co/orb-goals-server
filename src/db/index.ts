import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

import * as schema from "./schema";
import { env } from "../env/env";

export const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });
