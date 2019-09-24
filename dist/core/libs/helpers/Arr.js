"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Arr {
  /**
   * @static intersectByKeys - find intersection of array values
   *
   * @param  {Array} o1 input Array
   * @param  {array} o2 input Array
   * @return {Array}    Array of intersection
   */
  static intersectByValues(a1, a2) {
    if (Array.isArray(a1) && Array.isArray(a2)) {
      const [first, next] = a1.length > a2.length ? [a1, a2] : [a2, a1];
      return first.filter(k => next.includes(k));
    }

    return [];
  }

}

var _default = Arr;
exports.default = _default;