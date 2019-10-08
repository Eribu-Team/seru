import RestMethods from "../../../core/router/RestMethods";

export default [
  { uri: "/users/index", method: RestMethods.GET, controller: "UserController", action: "index", options: {} },
];
