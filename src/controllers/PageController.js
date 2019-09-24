module.exports =
class PageController {
  index(request, reply) {
    reply.send({ hello: 'page' });
  }
}
