import { Module } from "../../core/modules";

export default function (fastify, options, done) {
  fastify.get("/plugin", (request, reply) => {
    reply.send({ hello: "world" });
  });

  // const module = new Module(__dirname).register();
  console.log("module from plugin", Module, this, __dirname);
  done();
}
