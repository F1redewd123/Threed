import Vector4 from "https://f1redood.github.io/Threed/Vector4.js";

export default class Utils {
  static createPerspectiveProjectionMatrix(scene) {
    var aspect = scene.canvas.width / scene.canvas.height;
    var fov = 1.3;
    var far = 100;
    var near = 0.1;

    const f = 1 / Math.tan(fov / 2);
    const rangeInv = 1 / (near - far);
    
    return new Vector4(
      new Vector4(f / aspect, 0, 0, 0),
      new Vector4(0, f, 0, 0),
      new Vector4(0, 0, (far + near) * rangeInv, -1),
      new Vector4(0, 0, (far * near * 2) * rangeInv, 0)
    );
  }
}
