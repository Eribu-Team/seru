"use strict";

var _Framework = _interopRequireDefault(require("../models/Framework"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FrameworkController {
  /**
   * async index - get models collection with filter
   *
   * @param  {type} request description
   * @param  {type} reply   description
   * @return {type}         description
   */
  async index(request, reply) {
    console.log("index query", request.query);
    const frameworks = await _Framework.default.query().filter(request.query);
    reply.send({
      frameworks
    });
  }

  async view(request, reply) {
    console.log(request.query);
    const framework = await _Framework.default.query().findOne({
      slug: request.params.slug
    });
    reply.send(framework);
  }
  /**
   * async create - crate new record
   *
   * @param  {type} request description
   * @param  {type} reply   description
   * @return {type}         description
   */


  async create(request, reply) {
    console.log(request);
    const framework = await _Framework.default.query().insert(request.body);
    console.log(framework);
    reply.code(201).send("Created");
  }
  /**
   * async update - Update record
   *
   * @param  {Request} request description
   * @param  {Reply} reply   description
   * @return {string}         description
   */


  async update(request, reply) {
    console.log(request);
    const framework = await _Framework.default.query().patchAndFetchById(request.body.id, request.body);
    reply.code(200).send(framework);
  }
  /**
   * async destroy - delete one recordr
   *
   * @param  {type} request description
   * @param  {type} reply   description
   * @return {type}         description
   */


  async destroy(request, reply) {
    await _Framework.default.query().deleteById(request.body.id);
    reply.code(200).send("OK");
  }

}

module.exports = FrameworkController;