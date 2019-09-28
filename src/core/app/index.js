import fastify from "fastify";
import "../../config/dotenv";
import MainApp from "./MainApp";
import config from "../../config/server";

const app = new MainApp(fastify(config));
const logger = app.fastify.log;
export { app, logger };
