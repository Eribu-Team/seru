import { Module } from "../../core/modules";

export default function (fastify, options, done) {
  const module = new Module(__dirname).register();
  console.log("module from plugin", Module, this, __dirname, module);
  done();
}
