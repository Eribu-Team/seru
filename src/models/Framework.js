import slugify from "slugify";
import BaseModel from "../core/database/objection/classes/BaseModel";
import FilterQuery from "../core/database/objection/queries/FilterQuery";
import store from "../core/store";

class Framework extends BaseModel {
  constructor() {
    super();
    store.log.info("Framework model init");
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
    return FilterQuery;
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
        id: { type: "integer" },
        category: { type: "array" },
        lang: { type: "array" },

        name: { type: "string", minLength: 1, maxLength: 255 },
        slug: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "string" },
        thumb: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }


  // $beforeValidate(jsonSchema, json, opt) {
  //   console.log('$beforeValidate:', this.name);
  //   this.slug = slugify(this.name);
  //   store.log.info("Framework model $beforeValidate");
  //   return jsonSchema;
  // }
  async $beforeInsert(queryContext) {
    store.log.info("Framework model $beforeInsert", this);
    this.slug = slugify(this.name, { replacement: "-", remove: null, lower: true });
    await super.$beforeInsert(queryContext);
  }

  async $beforeUpdate(opt, queryContext) {
    store.log.info("Framework model $beforeUpdate");
    this.slug = slugify(this.name, { replacement: "-", remove: null, lower: true });
    await super.$beforeUpdate(opt, queryContext);
  }
}
export default Framework;
