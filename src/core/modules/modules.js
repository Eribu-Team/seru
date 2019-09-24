import fs from "fs";
import path from "path";
import store from "../store";
import File from "../filesysytem/File";

export default class Modules {
  configFiles = [];

  configs = [];

  constructor(dirname) {
    this.dirname = dirname;
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
      store.log.info("OK");
    });
  }

  register() {

  }
}
