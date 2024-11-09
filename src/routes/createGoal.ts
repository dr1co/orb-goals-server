import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { createGoal } from "../functions/createGoal";

export const createGoalRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/goals", async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ","");

    if (!token) {
      return res.status(404).send({ message: "Token not found" });
    }

    const CreateRegisterSchema = z.object({
      title: z.string(),
      desiredWeeklyFrequency: z.number().int().min(1).max(7),
    });

    const { title, desiredWeeklyFrequency } = CreateRegisterSchema.parse(
      req.body
    );

    await createGoal({
      userId: token,
      title,
      desiredWeeklyFrequency,
    });
  });
};
