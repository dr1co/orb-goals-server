import fastify from "fastify";
import z from "zod";

import { env } from "./env/env";
import { createGoal } from "./functions/createGoal";
import { getWeekPendingGoals } from "./functions/getWeekPendingGoals";
import { createGoalCompletion } from "./functions/createGoalCompletion";

const server = fastify();

server.get("/pending-goals", async () => {
  const { pendingGoals } = await getWeekPendingGoals();

  return pendingGoals;
});

server.post("/goals", async (req) => {
  const CreateRegisterSchema = z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  });

  const { title, desiredWeeklyFrequency } = CreateRegisterSchema.parse(
    req.body
  );

  await createGoal({
    title,
    desiredWeeklyFrequency,
  });
});

server.post("/completions", async (req) => {
  const CreateCompletionSchema = z.object({
    goalId: z.string().cuid2(),
  });

  const { goalId } = CreateCompletionSchema.parse(req.body);

  await createGoalCompletion({
    goalId,
  });
});

server
  .listen({
    port: Number(env.PORT),
  })
  .then(() => {
    console.log("HTTP Server running on port 3333");
  });
