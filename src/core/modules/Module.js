import path from "path";
import fs from "fs";
import Filesystem from "../libs/helpers/Filesystem";
// import store from "../store";


/**
 * Universal node module for Seru mvc
 */
export default class Module {
  config = null;

  app = null;

  dirname = null;

  constructor(dirname, app) {
    this.dirname = dirname;
    this.app = app;
  }

  /**
   * async register - register current module
   *
   * @return {type}  description
   */
  async register() {
    console.log("module register: ", this.dirname);
    const configFilePath = path.join(this.dirname, "/module.js");
    if (await Filesystem.readable(configFilePath)) {
      const configFileExport = await import(configFilePath);
      // only if its default export and active
      if ((configFileExport || {}).default && this.isActive(configFileExport.default)) {
        await this.registerControllers(this.dirname);
      }
    }
  }

  isActive(obj) {
    if (Object.prototype.hasOwnProperty.call(obj, "active") && obj.active === true) {
      return true;
    }
    return false;
  }

  /**
   * async registersControllers - Register module controllers
   *
   * @return {type}  description
   */
  async registerControllers(moduleDir) {
    const controllersPath = path.join(moduleDir, "/controllers");

    this.app.fastify.log.info("Readable controllers path:", await Filesystem.readable(controllersPath));
    if (await Filesystem.readable(controllersPath)) {
      this.app.fastify.log.info("Scanning controllers path:", controllersPath);
      const files = fs.readdirSync(controllersPath);

      files.forEach(async (file) => {
        const controller = await import(path.join(controllersPath, file));
        console.log(controller);
        if ((controller || {}).default) {
            const instance = new (controller.default)();// eslint-disable-line
          console.log(Object.getOwnPropertyNames(instance));
          this.app.fastify.log.info("Found controller:", instance);
          await this.registerControlerRoutes(instance, moduleDir);
        }
      });
    }
  }

  async registerControlerRoutes(controller, moduleDir) {
    const routesFilePath = path.join(moduleDir, "/routes/index.js");
    this.app.fastify.log.info("Module routes path:", routesFilePath, Filesystem.readable(routesFilePath));
    if (Filesystem.readable(routesFilePath)) {
      const routes = (await import(routesFilePath)).default;
      this.app.fastify.log.info("Module routes:", routes, controller.constructor.name);
      const route = routes.find(
        (r) => controller.constructor.name === r.controller,
      );
      // TODO: Validate rest method
      if (controller && route.method) {
        const restMethod = route.method;
        if (typeof this.app.fastify[restMethod] === "function") {
          this.app.fastify[restMethod](
            route.uri,
            route.options,
            controller[route.action],
          );
        } else {
          this.app.fastify.get(route.uri, route.options, controller[route.action]);
        }
      }
    }
  }
}
