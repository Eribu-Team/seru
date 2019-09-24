"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _db = _interopRequireDefault(require("../../config/db"));

var _products = _interopRequireDefault(require("../../modules/products"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const cors = require("fastify-cors");

const Knex = require("knex");

const {
  Model
} = require("objection");

const routes = require("../../routes/main.js");

class MainApp {
  constructor(fastify) {
    _defineProperty(this, "baseDir", _path.default.join(__dirname, "../.."));

    fastify.log.info("MainApp::booting");
    this.fastify = fastify;
    /** Contaniner for controllers */

    this.controllers = [];
    this.registers();
  }
  /**
   * async registers - Register all plugins, middlewares, routes, etc...
   * Listen connections after all is initialized.
   *
   * @return {type}  description
   */


  async registers() {
    this.registersPlugins();
    this.registerDb();
    /**
     * Wait for all Controllers and routes are initialized.
     */

    await this.registersControllers();
    /**
     * Listen connections...
     */

    this.listen();
  }

  async registersControllers() {
    const controllersPath = _path.default.join(__dirname, "../../controllers");

    const files = _fs.default.readdirSync(controllersPath);

    files.forEach(async file => {
      const controller = await Promise.resolve().then(() => _interopRequireWildcard(require(`${_path.default.join(controllersPath, file)}`)));

      if ((controller || {}).default) {
        const instance = new controller.default(); // eslint-disable-line

        this.controllers.push(instance);
        this.registerControlerRoutes(instance);
      }
    });
  }

  registerControlerRoutes(controller) {
    const route = routes.find(r => controller.constructor.name === r.controller); // TODO: Validate rest method

    if (controller && route.method) {
      const restMethod = route.method;

      if (typeof this.fastify[restMethod] === "function") {
        this.fastify[restMethod](route.uri, route.options, controller[route.action]);
      } else {
        this.fastify.get(route.uri, route.options, controller[route.action]);
      }
    }
  }

  registerRoutes() {
    routes.forEach(route => {
      const controller = this.controllers.find(r => r.constructor.name === route.controller); // TODO: Validate rest method

      if (controller && route.method) {
        const restMethod = route.method;

        if (typeof this.fastify[restMethod] === "function") {
          this.fastify[restMethod](route.uri, route.options, controller[route.action]);
        } else {
          this.fastify.get(route.uri, route.options, controller[route.action]);
        }
      }
    });
  }

  registersPlugins() {
    this.fastify.register(cors);
    this.fastify.register(_products.default, {
      prefix: "/products"
    });
  }

  async registerDb() {
    this.knex = Knex(_db.default.development);
    const res = Model.knex(this.knex);
  }

  listen() {
    this.fastify.listen(3001, (err, address) => {
      if (err) {
        this.fastify.log.error(err, address);
        process.exit(1);
      }
    });
  }

}

var _default = MainApp;
exports.default = _default;