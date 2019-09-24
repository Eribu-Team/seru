"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Module {
  constructor(dirname) {
    this.dirname = dirname;
  }

  register() {
    console.log("module register: ", this.dirname); //const routes = import(path.join())
  }

}

exports.default = Module;