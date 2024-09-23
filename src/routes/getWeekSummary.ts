import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { getWeekSummary } from "../functions/getWeekSummary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (server) => {
  server.get("/summary", async () => {
    const { result } = await getWeekSummary();

    return result;
  });
};
