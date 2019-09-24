"use strict";

var _objection = require("objection");

var _Obj = _interopRequireDefault(require("../../../libs/helpers/Obj"));

var _Arr = _interopRequireDefault(require("../../../libs/helpers/Arr"));

var _app = require("../../../app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FilterQuery extends _objection.QueryBuilder {
  /**
   * filter - filter query for query data in request
   *
   * @param  {Object} attrs description
   * @return {type}       description
   */
  filter(attrs) {
    _app.logger.info("FrameworkQuery jsonSchema:", this.modelClass().jsonSchema);

    _app.logger.info("FrameworkQuery jsonAttributes:", this.modelClass().jsonAttributes);
    /**
     * Check if Model has defined schema properites
     * Filtering only attrs from jsonSchema.
     */


    const modelProps = (this.modelClass().jsonSchema || {}).properties;

    if (modelProps) {
      /**
       * Take only intersection
       */
      const propsIntersection = _Obj.default.intersectByKeys(attrs, modelProps);

      const filterValues = _Obj.default.pick(attrs, propsIntersection);

      const {
        jsonAttributes
      } = this.modelClass();
      Object.entries(filterValues).forEach(([key, value]) => {
        /**
         *  Has json attributes
         *  Json attributes filter by JSON_SEARCH
         */
        if (jsonAttributes && jsonAttributes.includes(key)) {
          this.whereRaw(`JSON_SEARCH(\`${key}\`, 'one', '${value}') is not null`); // console.log("FrameworkQuery filterAttr json:", key, value);
        } else {
          this.where(key, "like", `%${value}%`);
        }
      });
    }

    return this;
  }

}

module.exports = FilterQuery;