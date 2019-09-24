class Store {
  constructor(){
    
  }
  setApp(app) {
    this.app = app;
  }
  get log() {
    return this.app.fastify.log;
  }
}

module.exports = Store;
