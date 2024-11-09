import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { getWeekPendingGoals } from "../functions/getWeekPendingGoals";

export const getWeekPendingGoalsRoute: FastifyPluginAsyncZod = async (
  server
) => {
  server.get("/pending-goals", async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({ message: "Unauthorized to do this action!" });
    }

    const { pendingGoals } = await getWeekPendingGoals({
      userId: token,
    });

    return pendingGoals;
  });
};
