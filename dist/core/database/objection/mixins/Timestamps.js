"use strict";

const DateFormat = require("../../../libs/DateFormat");

function Timestamps(Model) {
  return class extends Model {
    async $beforeInsert(queryContext) {
      this.created_at = new DateFormat(new Date()).mysqlDateTime();
    }

    async $beforeUpdate(opt, queryContext) {
      this.updated_at = new DateFormat(new Date()).mysqlDateTime();
    }

  };
}

module.exports = Timestamps;