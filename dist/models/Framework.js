"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slugify = _interopRequireDefault(require("slugify"));

var _BaseModel = _interopRequireDefault(require("../core/database/objection/classes/BaseModel"));

var _FilterQuery = _interopRequireDefault(require("../core/database/objection/queries/FilterQuery"));

var _store = _interopRequireDefault(require("../core/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Framework extends _BaseModel.default {
  constructor() {
    super();

    _store.default.log.info("Framework model init");
  }

  static get tableName() {
    return "framework";
  }
  /**
   * @static get - Custom queries for Frameworks
   *
   * @return {type}  description
   */


  static get QueryBuilder() {
    return _FilterQuery.default;
  }

  static get jsonAttributes() {
    return ["lang", "category"];
  }
  /**
   * @static get - Validate schema
   *
   * @return {type}  description
   */


  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: {
          type: "integer"
        },
        category: {
          type: "array"
        },
        lang: {
          type: "array"
        },
        name: {
          type: "string",
          minLength: 1,
          maxLength: 255
        },
        slug: {
          type: "string",
          minLength: 1,
          maxLength: 255
        },
        description: {
          type: "string"
        },
        thumb: {
          type: "string",
          minLength: 1,
          maxLength: 255
        }
      }
    };
  } // $beforeValidate(jsonSchema, json, opt) {
  //   console.log('$beforeValidate:', this.name);
  //   this.slug = slugify(this.name);
  //   store.log.info("Framework model $beforeValidate");
  //   return jsonSchema;
  // }


  async $beforeInsert(queryContext) {
    _store.default.log.info("Framework model $beforeInsert", this);

    this.slug = (0, _slugify.default)(this.name, {
      replacement: "-",
      remove: null,
      lower: true
    });
    await super.$beforeInsert(queryContext);
  }

  async $beforeUpdate(opt, queryContext) {
    _store.default.log.info("Framework model $beforeUpdate");

    this.slug = (0, _slugify.default)(this.name, {
      replacement: "-",
      remove: null,
      lower: true
    });
    await super.$beforeUpdate(opt, queryContext);
  }

}

var _default = Framework;
exports.default = _default;