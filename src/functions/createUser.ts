import { db } from "../db";
import { users } from "../db/schema";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export async function createUser(request: CreateUserRequest) {
  const result = await db.insert(users).values({
    name: request.name,
    email: request.email,
    password: request.password,
  }).returning();

  const user = result[0];

  return user;
}