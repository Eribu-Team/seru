"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Obj {
  /**
   * @static intersectByKeys - find intersection of keys
   *
   * @param  {Object} o1 description
   * @param  {Object} o2 description
   * @return {Array}    description
   */
  static intersectByKeys(o1, o2) {
    const [k1, k2] = [Object.keys(o1), Object.keys(o2)];
    const [first, next] = k1.length > k2.length ? [k2, o1] : [k1, o2];
    return first.filter(k => k in next);
  }
  /**
   * @static pick - Take object values by array of keys
   *
   * @param  {Object} object Input object
   * @param  {array} keys   array of keys
   * @return {Object}        Filtered object
   */


  static pick(object, keys) {
    return keys.reduce((o, key) => {
      const obj = o;

      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }

      return obj;
    }, {});
  }

}

var _default = Obj;
exports.default = _default;