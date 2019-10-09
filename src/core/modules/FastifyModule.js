
import path from "path";
import fs from "fs";
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
    this.dirname = dirname; // TODO: check if readable
    this.app = app;
  }

  async register() {
    console.log("module register: ", this.dirname);
    const configFilePath = path.join(this.dirname, "/module.js");
    if (await Filesystem.readable(configFilePath)) {
      const configFileExport = await import(configFilePath);
      // only if its default export and active
      if ((configFileExport || {}).default && this.isActive(configFileExport.default)) {
        await this.registerFastifyModule(configFileExport.default);
      }
    }
  }

  async registerFastifyModule(config) {
    const controllersPath = path.join(this.dirname, "/controllers");
    this.app.fastify.log.info("Scanning controllers path:", controllersPath);
    const files = fs.readdirSync(controllersPath);

    console.log("Controllers files:", files);

    await files.reduce(
      async (prev, file) => {
        await prev;
        const controller = await import(path.join(controllersPath, file));
        if ((controller || {}).default) {
          const instance = new (controller.default)();// eslint-disable-line
          console.log(Object.getOwnPropertyNames(instance));
          this.app.fastify.log.info("Found controller:", instance);
          //await this.registerControlerRoutes(instance, this.dirname);
        }
      }, Promise.resolve(),
    );

    // if (await Filesystem.readable(controllersPath)) {
    //   const moduleIndex = await import(moduleIndexPath);
    //   if ((moduleIndex || {}).default) {
    //     console.log("Plugin cb: ", await this.getModule());
    //     this.app.fastify.register(await this.getModule(), {
    //       prefix: config.uri,
    //       routes: await this.getRoutes(),
    //       moduleDir,
    //     });
    //   }
    // }
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
   * @param {FastifyInstance} fastify - Fastify Instance.
   * @param {object} options - Options passed by plugin register.
   * @param {Function} done - Done callback.
   */
  async getModule() {
    const moduleCb = (fastify, options, done) => {
      fastify.get("/plugin", (request, reply) => {
        reply.send({ hello: "world" });
      });
      done();
    };
    return moduleCb;
    // console.log("Module options", options);


    // this.registerControllers(options.moduleDir, fastify);

    // const module = new Module(__dirname).register();
    // console.log("module from plugin", this, __dirname);
  }

  isActive(obj) {
    if (Object.prototype.hasOwnProperty.call(obj, "active") && obj.active === true) {
      return true;
    }
    return false;
  }
}
