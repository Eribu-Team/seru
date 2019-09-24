const { Model,compose } = require("objection");
const Timestamps = require("../mixins/Timestamps.js");
const mixins = compose(
  Timestamps
);
class BaseModel extends mixins(Model) {
}
module.exports = BaseModel;
