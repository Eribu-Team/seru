import fs from "fs";
import path from "path";
import dbconf from "../../config/db";
import products from "../../modules/products";
import Modules from "../modules/modules";

const cors = require("fastify-cors");
const Knex = require("knex");
const { Model } = require("objection");
const routes = require("../../routes/main.js");

class MainApp {
  baseDir = path.join(__dirname, "../..");

  modulesDir = path.join(`${this.baseDir}/modules`);

  /** Contaniner for controllers */
  controllers = [];

  constructor(fastify) {
    fastify.log.info("MainApp::booting");
    this.fastify = fastify;
    this.hooks();
    this.registers();
  }

  hooks() {
    this.fastify.addHook("onRoute", (routeOptions) => {
      this.fastify.log.info("new route:",
        routeOptions.method,
        routeOptions.schema,
        routeOptions.url,
        routeOptions.bodyLimit,
        routeOptions.logLevel,
        routeOptions.prefix);
    });
  }

  /**
   * async registers - Register all plugins, middlewares, routes, etc...
   * Listen connections after all is initialized.
   *
   * @return {type}  description
   */
  async registers() {
    this.registersPlugins();
    this.registerDb();
    /**
     * Wait for all Controllers and routes are initialized.
     */
    // await this.registersControllers();

    const modules = new Modules(this);
    await modules.init();
    /**
     * Listen connections...
     */
    this.listen();
  }

  async registersControllers() {
    const controllersPath = path.join(__dirname, "../../controllers");
    const files = fs.readdirSync(controllersPath);

    files.forEach(async (file) => {
      const controller = await import(path.join(controllersPath, file));
      if ((controller || {}).default) {
        const instance = new controller.default(); // eslint-disable-line
        this.controllers.push(instance);
        this.registerControlerRoutes(instance);
      }
    });
  }

  registerControlerRoutes(controller) {
    const route = routes.find(
      (r) => controller.constructor.name === r.controller,
    );
    // TODO: Validate rest method
    if (controller && route.method) {
      const restMethod = route.method;
      if (typeof this.fastify[restMethod] === "function") {
        this.fastify[restMethod](
          route.uri,
          route.options,
          controller[route.action],
        );
      } else {
        this.fastify.get(route.uri, route.options, controller[route.action]);
      }
    }
  }

  registerRoutes() {
    routes.forEach((route) => {
      const controller = this.controllers.find(
        (r) => r.constructor.name === route.controller,
      );
      // TODO: Validate rest method
      if (controller && route.method) {
        const restMethod = route.method;
        if (typeof this.fastify[restMethod] === "function") {
          this.fastify[restMethod](
            route.uri,
            route.options,
            controller[route.action],
          );
        } else {
          this.fastify.get(route.uri, route.options, controller[route.action]);
        }
      }
    });
  }

  registersPlugins() {
    this.fastify.register(cors);


    // this.fastify.register(products, {
    //  prefix: "/products",
    // });
  }

  async registerDb() {
    this.knex = Knex(dbconf.development);
    const res = Model.knex(this.knex);
  }

  listen() {
    this.fastify.listen(3001, (err, address) => {
      if (err) {
        this.fastify.log.error(err, address);
        process.exit(1);
      }
    });
  }
}
export default MainApp;
