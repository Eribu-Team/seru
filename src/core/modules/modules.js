import fs, { promises as fsp, constants as fsc } from "fs";

import path from "path";
import store from "../store";
import File from "../filesysytem/File";
import Filesystem from "../libs/helpers/Filesystem";


export default class Modules {
  configFiles = [];

  controllers = [];

  configs = [];

  constructor(app) {
    this.app = app;
  }

  /**
   * Initiate modules and routes
   * @return [Promise<void>]
   */
  async init() {
    // await this.readConfigs();
    await this.registerActiveModules();
  }

  async registerActiveModules() {
    // get all files from modules directory
    try {
      const files = await fsp.readdir(store.app.modulesDir);
      this.app.fastify.log.info("Found modules dirs:", files);

      /**
       * Alternative to forEach and for-of loops
       * as says no-restricted-code in airbnb
       * https://github.com/airbnb/javascript/issues/1271
       */
      await files.reduce(
        async (prev, file) => {
          await prev;
          const dirFile = path.join(store.app.modulesDir, file);
          const dirent = await fsp.stat(dirFile);
          this.app.fastify.log.info("Looking for Module in directory:", dirFile, dirent.isDirectory());
          if (dirent.isDirectory()) {
            // get module config
            const configFilePath = path.join(dirFile, "/module.js");
            // Check file exists and has Read Access
            if (await Filesystem.readable(configFilePath)) {
              // TODO: check if its really default export
              const configFileExport = await import(configFilePath);
              // only if its default export and active
              if ((configFileExport || {}).default && this.isModuleActive(configFileExport.default)) {
                await this.registerControllers(dirFile);
              }
            }
          }
        }, Promise.resolve(),
      );
    } catch (e) {
      console.log(e);
    }
  }

  isModuleActive(obj) {
    if (Object.prototype.hasOwnProperty.call(obj, "active") && obj.active === true) {
      return true;
    }
    return false;
  }

  /**
   * Read config object files for each module
   * @return [description]
   */
  readConfigsFiles() {
    const files = fs.readdirSync(store.app.modulesDir);
    files.forEach((file) => {
      store.log.info(`Try to register module: ${file}`);

      const dirFile = path.join(store.app.modulesDir, file);
      const dirent = fs.statSync(dirFile);

      if (dirent.isDirectory()) {
        const configFilePath = path.join(dirFile, "/module.js");
        const configFile = new File(configFilePath);
        if (configFile.hasReadAccess()) {
          this.configFiles.push(configFile);
        } else {
          store.log.info.error(`Module ${file} has no readable config.`);
        }
      } else {
        store.log.info(`Module ${file} is not directory`);
      }
    });
    store.log.info("Registered config files: ", this.configFiles);
  }

  /* Read EribuConfig objects for each module
   * @return [description]
   */
  async readConfigs() {
    this.readConfigsFiles();
    this.configFiles.forEach(async (configFile) => {
      store.log.info(`Reading ${configFile.getFilePath()} config file...`);
      const obj = await import(configFile.getFilePath());
      const config = obj.default;
      config.configFile = configFile;
      this.configs.push(config);
      store.log.info("Module configs loaded: ", this.configs);
    });
  }


  /**
   * async registersControllers - description
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
          // this.controllers.push(instance);
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
      this.app.fastify.log.info("Module routes:", routes);
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

  /**
   * Get only active EribuConfig array
   * @return [description]
   */
  getActiveConfigs() {
    return this.configs.filter((o) => o.active === true);
  }

  register() {

  }
}
