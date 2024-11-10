import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import bcrypt from "bcrypt";

import { findUserByEmail } from "../functions/findUserByEmail";

export const loginUserRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/users/login", async (req, res) => {
    const LoginSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = LoginSchema.parse(req.body);

    const user = await findUserByEmail({
      email,
    });

    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch || !user) {
      return res.status(422).send({ message: "Error: invalid e-mail or password!" });
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });
}