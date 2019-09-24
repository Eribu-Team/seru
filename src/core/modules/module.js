export default class Module {
  constructor(dirname) {
    this.dirname = dirname;
  }

  register() {
    console.log("module register: ", this.dirname);
    //const routes = import(path.join())
  }
}
