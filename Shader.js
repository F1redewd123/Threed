import Vector2 from "https://f1redewd123.github.io/Threed/Vector2.js";
import Vector3 from "https://f1redewd123.github.io/Threed/Vector3.js";
import Vector4 from "https://f1redewd123.github.io/Threed/Vector4.js";
import Texture from "https://f1redewd123.github.io/Threed/Texture.js";

export default class Shader {
  program = {};

  constructor() {
    window.Vector2 = Vector2;
    window.Vector3 = Vector3;
    window.Vector4 = Vector4;
    window.Texture = Texture;
  }
  
  createFragmentShader(frag) {
    this.program["frag"] = new Function("data", frag + " return data;");
  }

  createVertexShader(vert) {
    this.program["vert"] = new Function("data", vert + " return data;");
  }
}
