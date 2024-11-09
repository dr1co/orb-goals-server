import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { getWeekSummary } from "../functions/getWeekSummary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (server) => {
  server.get("/summary", async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({ message: "Unauthorized to do this action!" });
    }

    const { result } = await getWeekSummary({
      userId: token,
    });

    return result;
  });
};
