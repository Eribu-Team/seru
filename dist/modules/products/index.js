"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _modules = require("../../core/modules");

function _default(fastify, options, done) {
  const module = new _modules.Module(__dirname).register();
  console.log("module from plugin", _modules.Module, this, __dirname, module);
  done();
}