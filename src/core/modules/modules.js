import { promises as fsp } from "fs";

import path from "path";
import Module from "./FastifyModule";


/**
 * Base Modules Class
 */
export default class Modules {
  /**
   * Application instance
   */
  app = null;

  configFiles = [];

  configs = [];

  constructor(app) {
    this.app = app;
  }

  /**
   * Initiate modules and routes
   * @return [Promise<void>]
   */
  async init() {
    await this.registerActiveModules();
  }

  /**
   * async registerActiveFastifyModules - register modules in fastify way
   * @return {type}  description
   */
  async registerActiveModules() {
    // get all files from modules directory
    const files = await fsp.readdir(this.app.modulesDir);
    this.app.fastify.log.info("Found modules dirs:", files);
    /**
     * Alternative to forEach and for-of loops
     * as says no-restricted-code in airbnb
     * https://github.com/airbnb/javascript/issues/1271
     */
    await files.reduce(
      async (prev, file) => {
        await prev;
        const dirname = path.join(this.app.modulesDir, file);
        const dirent = await fsp.stat(dirname);
        this.app.fastify.log.info("Looking for Module in directory:", dirname, dirent.isDirectory());
        if (dirent.isDirectory()) {        
          const module = new Module(dirname, this.app);
          await module.register();
        }
      }, Promise.resolve(),
    );
  }
}
