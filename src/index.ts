import fastify from "fastify";
import { fastifyCors } from "@fastify/cors";
import z from "zod";

import { env } from "./env/env";
import { createGoalRoute } from "./routes/createGoal";
import { createGoalCompletionRoute } from "./routes/createGoalCompletion";
import { getWeekPendingGoalsRoute } from "./routes/getWeekPendingGoals";
import { getWeekSummaryRoute } from "./routes/getWeekSummary";

const server = fastify();

server.register(fastifyCors, {
  origin: "*",
});

server.register(createGoalRoute);
server.register(createGoalCompletionRoute);
server.register(getWeekPendingGoalsRoute);
server.register(getWeekSummaryRoute);

server
  .listen({
    port: Number(env.PORT),
  })
  .then(() => {
    console.log("HTTP Server running on port 3333");
  });
