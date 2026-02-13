import * from "https://f1redewd123.github.io/Threed/Package.js";

export default class Shader {
  program = {};
  
  createFragmentShader(frag) {
    this.program["frag"] = new Function("data", frag);
  }

  async createVertexShader(vert) {
    var package = genPrimitives();
    this.program["vert"] = new Function("data", vert + " return data;");
  }
}
