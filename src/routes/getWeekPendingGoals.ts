import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { getWeekPendingGoals } from "../functions/getWeekPendingGoals";

export const getWeekPendingGoalsRoute: FastifyPluginAsyncZod = async (
  server
) => {
  server.get("/pending-goals", async () => {
    const { pendingGoals } = await getWeekPendingGoals();

    return pendingGoals;
  });
};
