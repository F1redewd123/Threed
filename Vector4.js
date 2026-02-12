import Vector3 from "https://f1redewd123.github.io/Threed/Vector3.js";

export default class Vector4 {
  constructor(x, y, z, w) {
    [this.x, this.y, this.z, this.w] = [x, y, z, w];
  }

  static fromVec3(vec3, w) {
    return new Vector3(vec3.x, vec3.y, vec3.z, w);
  }

  mulMatrix(mat) {
    return new Vector4(
      this.x * mat.x.x + this.y * mat.x.y + this.z * mat.x.z + this.w * mat.x.w,
      this.x * mat.y.x + this.y * mat.y.y + this.z * mat.y.z + this.w * mat.y.w,
      this.x * mat.z.x + this.y * mat.z.y + this.z * mat.z.z + this.w * mat.z.w,
      this.x * mat.w.x + this.y * mat.w.y + this.z * mat.w.z + this.w * mat.w.w
    );
  }
}
