import fastify from "fastify";

import { env } from "./env/env";

const server = fastify();

server
  .listen({
    port: Number(env.PORT),
  })
  .then(() => {
    console.log("HTTP Server running on port 3333");
  });
