"use strict";

var _app = require("../core/app");

var _store = _interopRequireDefault(require("../core/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_store.default.setApp(_app.app); // console.log('index.js:', app);