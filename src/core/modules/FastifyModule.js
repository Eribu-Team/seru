
import path from "path";
import Filesystem from "../libs/helpers/Filesystem";
// import store from "../store";


/**
 * @typedef {Function} FastifyInstance
 */
export default class FastifyModule {
  config = null;

  app = null;

  dirname = null;

  constructor(dirname, app) {
    this.dirname = dirname;
    this.app = app;
  }

  async register() {
    console.log("module register: ", this.dirname);
    const configFilePath = path.join(this.dirname, "/module.js");
    if (await Filesystem.readable(configFilePath)) {
      const configFileExport = await import(configFilePath);
      // only if its default export and active
      if ((configFileExport || {}).default && this.isActive(configFileExport.default)) {
        await this.registerFastifyModule(this.dirname, configFileExport.default);
      }
    }
  }

  async registerFastifyModule(moduleDir, config) {
    const moduleIndexPath = path.join(moduleDir, "/index.js");
    if (await Filesystem.readable(moduleIndexPath)) {
      const moduleIndex = await import(moduleIndexPath);
      if ((moduleIndex || {}).default) {
        this.app.fastify.register(this.getModule(), {
          prefix: config.uri,
          routes: await this.getRoutes(),
          moduleDir,
        });
      }
    }
  }

  /**
   * Async getRoutes - description.
   *
   * @returns {Array} Routes for current module.
   */
  async getRoutes() {
    const routesFilePath = path.join(this.dirname, "/routes/index.js");
    if (Filesystem.readable(routesFilePath)) {
      const routesExport = await import(routesFilePath);
      if ((routesExport || {}).default) {
        return routesExport.default;
      }
    }
    return [];
  }

  async registerControllers(moduleDir, fastify) {
    console.log("registerControllers:", moduleDir, fastify);
  }

  /**
   * Returns Fastify plgin function for current module.
   *
   * @param {FastifyInstance} Fastify
   */
  async getModule(fastify, options, done) {
    console.log("Module options", options);

    fastify.get("/plugin", (request, reply) => {
      reply.send({ hello: "world" });
    });

    this.registerControllers(options.moduleDir, fastify);

    // const module = new Module(__dirname).register();
    console.log("module from plugin", this, __dirname);
    done();
  }

  isActive(obj) {
    if (Object.prototype.hasOwnProperty.call(obj, "active") && obj.active === true) {
      return true;
    }
    return false;
  }
}
