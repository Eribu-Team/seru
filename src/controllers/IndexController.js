module.exports =
class IndexController {
  index(request, reply) {
    reply.send({ hello: 'hello world from index' });
  }
}
