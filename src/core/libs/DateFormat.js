const dateFormat = require("dateformat");
class DateFormat {
  constructor(date){
    if (date instanceof Date) {
      this.date = date;
    }
  }
  mysqlDateTime() {
    return dateFormat(this.date, "yyyy-mm-dd hh:mm:ss");
  }
}

module.exports = DateFormat;
