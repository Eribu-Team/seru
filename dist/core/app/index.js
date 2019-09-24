"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports.app = void 0;

var _fastify = _interopRequireDefault(require("fastify"));

var _MainApp = _interopRequireDefault(require("./MainApp"));

var _server = _interopRequireDefault(require("../../config/server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _MainApp.default((0, _fastify.default)(_server.default));
exports.app = app;
const logger = app.fastify.log;
exports.logger = logger;