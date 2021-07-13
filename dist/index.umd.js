/*!
 * promise-throttle-all v1.0.0
 * (c) Robin Pokorny
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.promiseThrottleAll = {}));
}(this, (function (exports) { 'use strict';

  /**
   * Check if value is parseable to number.
   * @example ```ts
   * isNumberParseable('AAAA');
   * //=> false
   *
   * isNumberParseable('100');
   * //=> true
   *
   * if (!isNumberParseable(value))
   *   throw new Error('Value can\'t be parseable to `Number`.')
   * return Number(value);
   * ```
   * @param value - An `unknown` value to be checked.
   */
  const isNumberParseable = (value) => !Number.isNaN(Number(value));

  exports.isNumberParseable = isNumberParseable;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
