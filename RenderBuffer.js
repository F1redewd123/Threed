import Vector2 from "https://f1redewd123.github.io/Threed/Vector2.js";

export default class RenderBuffer {
  constructor(s) {
    this.scene = s;
  }

  loadData(v, i, uv) {
    [this.verts, this.inds, this.uvs] = [v, i, uv];
  }

  loadShader(s) {
    this.shader = s;
  }

  render() {
    var fragments = [];
    for (var v = 0; v < this.verts.length; v++) {
      this.verts[v] = this.shader.program.vert({ vertPos: Vector2.ZERO }).vertPos;
    }
    for (var i = 0; i < this.inds.length; i += 3) {
      for (var x = Math.min(
        this.verts[this.inds[i]].x,
        this.verts[this.inds[i + 1]].x,
        this.verts[this.inds[i + 2]].x
      ); x < Math.max(
        this.verts[this.inds[i]].x,
        this.verts[this.inds[i + 1]].x,
        this.verts[this.inds[i + 2]].x
      ); x++) {
        for (var y = Math.min(
          this.verts[this.inds[i]].y,
          this.verts[this.inds[i + 1]].y,
          this.verts[this.inds[i + 2]].y
        ); y < Math.max(
          this.verts[this.inds[i]].y,
          this.verts[this.inds[i + 1]].y,
          this.verts[this.inds[i + 2]].y
        ); y++) {
          if (this.#isInside(
            new Vector2(this.verts[this.inds[i]].x, this.verts[this.inds[i]].y),
            new Vector2(this.verts[this.inds[i + 1]].x, this.verts[this.inds[i + 1]].y),
            new Vector2(x, y)
          ) && this.#isInside(
            new Vector2(this.verts[this.inds[i + 1]].x, this.verts[this.inds[i + 1]].y),
            new Vector2(this.verts[this.inds[i + 2]].x, this.verts[this.inds[i + 2]].y),
            new Vector2(x, y)
          ) && this.#isInside(
            new Vector2(this.verts[this.inds[i + 2]].x, this.verts[this.inds[i + 2]].y),
            new Vector2(this.verts[this.inds[i]].x, this.verts[this.inds[i]].y),
            new Vector2(x, y)
          )) {
            this.scene.ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  }

  /*#getVec2LerpValues(x, y) {
    var vals = [];
    for (var x = Math.min(x.x, x.y); x < Math.max(x.x, x.y); x++) {
      for (var y = Math.min(x.y, y.y); y < Math.max(x.y, y.y); y++) {
        vals.push(new Vector2(x, y));
      }
    }
    return vals;
  }*/

  #isInside(l0, l1, p) {
    return ((p.x - l0.x) * (l1.y - l0.y) - (p.y - l0.y) * (l1.x - l0.x)) <= 0;
  }
}
