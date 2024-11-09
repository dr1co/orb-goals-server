import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

interface LoginRequest {
  email: string;
}

export const findUserByEmail = async (request: LoginRequest) => {
  const result = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    password: users.password,
  }).from(users).where(eq(users.email, request.email));

  return result[0];
}