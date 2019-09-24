const RestMethods = require("../core/router/RestMethods.js");

module.exports = [
  { uri: "/", controller: "IndexController", action: "index", options: {} },
  { uri: "/page", controller: "PageController", action: "index", options: {} },
  { uri: "/framework/all", method: RestMethods.GET, controller: "FrameworkController", action: "index", options: {} },
  { uri: "/framework/:slug", method: RestMethods.GET, controller: "FrameworkController", action: "view", options: {} },
  { uri: "/framework", method: RestMethods.DELETE, controller: "FrameworkController", action: "destroy", options: {} },
  { uri: "/framework", method: RestMethods.POST, controller: "FrameworkController", action: "create", options: {} },
  { uri: "/framework", method: RestMethods.PATCH, controller: "FrameworkController", action: "update", options: {} },
];
