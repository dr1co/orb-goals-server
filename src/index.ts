import fastify from "fastify";
import { fastifyCors } from "@fastify/cors";

import { env } from "./env/env";
import { createUserRoute } from "./routes/createUser";
import { createGoalRoute } from "./routes/createGoal";
import { createGoalCompletionRoute } from "./routes/createGoalCompletion";
import { getWeekPendingGoalsRoute } from "./routes/getWeekPendingGoals";
import { getWeekSummaryRoute } from "./routes/getWeekSummary";
import { loginUserRoute } from "./routes/loginUser";

const port = Number(env.PORT);
const server = fastify();

server.register(fastifyCors, {
  origin: "*",
});

server.register(loginUserRoute);
server.register(createUserRoute);
server.register(createGoalRoute);
server.register(createGoalCompletionRoute);
server.register(getWeekPendingGoalsRoute);
server.register(getWeekSummaryRoute);

server
  .listen({
    port,
  })
  .then(() => {
    console.log(`HTTP Server running on port ${port}`);
  });
