import { QueryBuilder } from "objection";
import Obj from "../../../libs/helpers/Obj";
import Arr from "../../../libs/helpers/Arr";
import { logger } from "../../../app";

class FilterQuery extends QueryBuilder {
  /**
   * filter - filter query for query data in request
   *
   * @param  {Object} attrs description
   * @return {type}       description
   */
  filter(attrs) {
    logger.info("FrameworkQuery jsonSchema:", this.modelClass().jsonSchema);
    logger.info("FrameworkQuery jsonAttributes:", this.modelClass().jsonAttributes);
    /**
     * Check if Model has defined schema properites
     * Filtering only attrs from jsonSchema.
     */
    const modelProps = (this.modelClass().jsonSchema || {}).properties;
    if (modelProps) {
      /**
       * Take only intersection
       */
      const propsIntersection = Obj.intersectByKeys(attrs, modelProps);
      const filterValues = Obj.pick(attrs, propsIntersection);
      const { jsonAttributes } = this.modelClass();

      Object.entries(filterValues).forEach(([key, value]) => {
        /**
         *  Has json attributes
         *  Json attributes filter by JSON_SEARCH
         */
        if (jsonAttributes && jsonAttributes.includes(key)) {
          this.whereRaw(`JSON_SEARCH(\`${key}\`, 'one', '${value}') is not null`);
          // console.log("FrameworkQuery filterAttr json:", key, value);
        } else {
          this.where(key, "like", `%${value}%`);
        }
      });
    }
    return this;
  }
}


module.exports = FilterQuery;
