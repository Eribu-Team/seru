import slugify from "slugify";
import BaseModel from "../../../core/database/objection/classes/BaseModel";
import FilterQuery from "../../../core/database/objection/queries/FilterQuery";
import store from "../../../core/store";

/**
 * Product model
 */
class Product extends BaseModel {
  /**
   * constructor
   */
  constructor() {
    super();
    store.log.info("Product model init");
  }

  static get tableName() {
    return "products__product";
  }

  /**
   * @static get - Custom queries for Products
   * @return {type}  description
   */
  static get QueryBuilder() {
    return FilterQuery;
  }

  static get jsonAttributes() {
    return ["category"];
  }

  /**
   * @static get - Validate schema
   *
   * @return {type}  description
   */
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "description"],

      properties: {
        id: { type: "integer" },
        category: { type: "array" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        slug: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "string" },
        thumb: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  $beforeValidate(jsonSchema, json, opt) {
    return jsonSchema;
  }

  async $beforeInsert(queryContext) {
    store.log.info("Product model $beforeInsert", this);
    this.slug = slugify(this.name, { replacement: "-", remove: null, lower: true });
    await super.$beforeInsert(queryContext);
  }

  async $beforeUpdate(opt, queryContext) {
    store.log.info("Product model $beforeUpdate");
    this.slug = slugify(this.name, { replacement: "-", remove: null, lower: true });
    await super.$beforeUpdate(opt, queryContext);
  }
}
export default Product;
