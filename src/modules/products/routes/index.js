import RestMethods from "../../../core/router/RestMethods";

export default [
  { uri: "/products/index", method: RestMethods.GET, controller: "ProductController", action: "index", options: {} },
];
