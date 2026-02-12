import Vector2 from "https://f1redewd123.github.io/Threed/Vector2.js";
import Vector3 from "https://f1redewd123.github.io/Threed/Vector2.js";
import Vector4 from "https://f1redewd123.github.io/Threed/Vector2.js";

export default class Shader {
  program = {};
  
  createFragmentShader(frag) {
    this.program["frag"] = new Function("data", frag);
  }

  createVertexShader(vert) {
    this.program["vert"] = new Function("data", vert + " return data;");
  }
}
