export default class Shader {
  program = {};
  
  createFragmentShader(frag) {
    this.program["frag"] = new Function("data", frag);
  }

  createVertexShader(vert) {
    this.program["vert"] = new Function("data", vert + " return data;");
  }
}
