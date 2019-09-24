import fs, { Stats } from "fs";
import path from "path";

/**
 * File manipulations for eribu projects
 */
export default class File {
   dirent;

   ext;

   dir;

   root;

   base;

   name;

   filePath;

   constructor(filePath) {
     this.filePath = filePath;
     this.pathParse();
     this.dirent = this.exists() ? fs.statSync(filePath) : null;
   }

   getDir() {
     return this.dir;
   }

   getName() {
     return this.name;
   }

   getFilePath() {
     return this.filePath;
   }

   exists() {
     return fs.existsSync(this.filePath);
   }

   hasReadAccess() {
     if (this.exists()) {
       try {
         fs.accessSync(this.filePath, fs.constants.R_OK);
         return true;
       } catch (err) {
         return false;
       }
     }
     return false;
   }

   hasThumbnail() {
     const thumb = `${global.assetsDir}/cache/${this.name}${this.ext}`;
     try {
       fs.accessSync(thumb, fs.constants.R_OK);
       return true;
     } catch (err) {
       return false;
     }
   }

   pathParse() {
     const pathParts = path.parse(this.filePath);
     this.dir = pathParts.dir;
     this.root = pathParts.root;
     this.base = pathParts.base;
     this.name = pathParts.name;
     this.ext = pathParts.ext;
   }
}
