import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { createGoalCompletion } from "../functions/createGoalCompletion";

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async (
  server
) => {
  server.post("/completions", async (req, res) => {
    const CreateCompletionSchema = z.object({
      goalId: z.string().cuid2(),
    });

    const { goalId } = CreateCompletionSchema.parse(req.body);

    await createGoalCompletion({
      goalId,
    });
  });
};
