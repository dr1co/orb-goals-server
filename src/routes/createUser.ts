import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import bcrypt from "bcrypt";

import { createUser } from "../functions/createUser";

interface DataInterface {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const createUserRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/users/register", async (req) => {
    const CreateRegisterSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      confirmPassword: z.string(),
    }).refine(data => data.password === data.confirmPassword);

    const { name, email, password } = CreateRegisterSchema.parse(req.body);

    const encrypted = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      email,
      password: encrypted,
    });

    return user;
  });
} 
