export default class Shader {
  program = {};
  
  createFragShader(frag) {
    this.program["frag"] = new Function("data", frag);
  }

  createVertShader(vert) {
    this.program["vert"] = new Function("data", vert);
  }
}
