import { promises as fsp, constants as fsc } from "fs";

class Filesystem {
  /**
   * @static async - checks if file exists and is readable
   *
   * @param  {String} path description
   * @return {Boolean}      description
   */
  static async readable(path) {
    try {
      await fsp.access(path, fsc.F_OK && fsc.R_OK);
      return true;
    } catch {
      return false;
    }
  }
}

export default Filesystem;
