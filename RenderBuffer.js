import Vector2 from "https://f1redewd123.github.io/Threed/Vector2.js";
import Vector3 from "https://f1redewd123.github.io/Threed/Vector3.js";
import Vector4 from "https://f1redewd123.github.io/Threed/Vector4.js";

export default class RenderBuffer {
  #shaderProperties = {};
  
  constructor(s) {
    this.scene = s;
  }

  loadData(v, i, uv) {
    [this.verts, this.inds, this.uvs] = [v, i, uv];
  }

  loadShader(s) {
    this.shader = s;
  }

  setShaderProperty(key, value) {
    this.#shaderProperties[key] = value;
  }

  render() {
    /* VERTEX PARSING */
    var newVerts = [];
    for (var v = 0; v < this.verts.length; v++) {
      newVerts.push(this.shader.program.vert({ ...this.#shaderProperties, aPos: this.verts[v], position: Vector3.ZERO }).position);
    }

    /* FRAGMENT PARSING */
    var data = new Array((maxX - minX) * (maxY - minY));
    for (var i = 0; i < this.inds.length; i += 3) {
      var minX = Math.min(
        newVerts[this.inds[i]].x,
        newVerts[this.inds[i + 1]].x,
        newVerts[this.inds[i + 2]].x
      );
      var maxX = Math.max(
        newVerts[this.inds[i]].x,
        newVerts[this.inds[i + 1]].x,
        newVerts[this.inds[i + 2]].x
      );
      var minY = Math.min(
        newVerts[this.inds[i]].y,
        newVerts[this.inds[i + 1]].y,
        newVerts[this.inds[i + 2]].y
      );
      var maxY = Math.max(
        newVerts[this.inds[i]].y,
        newVerts[this.inds[i + 1]].y,
        newVerts[this.inds[i + 2]].y
      );
      for (var x = minX; x < maxX; x++) {
        for (var y = minY; y < maxY; y++) {
          var l0 = this.#isInside(
            new Vector2(newVerts[this.inds[i]].x, newVerts[this.inds[i]].y),
            new Vector2(newVerts[this.inds[i + 1]].x, newVerts[this.inds[i + 1]].y),
            new Vector2(x, y)
          );
          var l1 = this.#isInside(
            new Vector2(newVerts[this.inds[i + 1]].x, newVerts[this.inds[i + 1]].y),
            new Vector2(newVerts[this.inds[i + 2]].x, newVerts[this.inds[i + 2]].y),
            new Vector2(x, y)
          );
          var l2 = this.#isInside(
            new Vector2(newVerts[this.inds[i + 2]].x, newVerts[this.inds[i + 2]].y),
            new Vector2(newVerts[this.inds[i]].x, newVerts[this.inds[i]].y),
            new Vector2(x, y)
          );
          if (l0 <= 0 && l1 <= 0 && l2 <= 0) {
            var d = (p1.y - p2.y) * (p0.x - p2.x) + (p2.x - p1.x) * (p0.y - p2.y);
            
            var w0 = ((p1.y - p2.y) * (p.x - p2.x) + (p2.x - p1.x) * (p.y - p2.y)) / d;
            var w1 = ((p2.y - p0.y) * (p.x - p2.x) + (p0.x - p2.x) * (p.y - p2.y)) / d;
            var w2 = 1 - w0 - w1;
            
            var res = this.shader.program.frag({
              ...this.#shaderProperties,
              uv: new Vector2(
                w0 * this.uvs[this.inds[i]].x + w1 * this.uvs[this.inds[i + 1]].x + w2 * this.uvs[this.inds[i + 2]].x,
                w0 * this.uvs[this.inds[i]].y + w1 * this.uvs[this.inds[i + 1]].y + w2 * this.uvs[this.inds[i + 2]].y
              ),
              fragColor: Vector4.ZERO
            }).fragColor;
            data.push(...[res.x, res.y, res.z, res.w]);
          }
        }
      }
    }

    this.scene.ctx.putImageData(new ImageData(data, maxX - minX, maxY - minY), minX, minY);
  }

  #getVec2LerpValues(x, y) {
    var vals = [];
    for (var x = Math.min(x.x, x.y); x < Math.max(x.x, x.y); x++) {
      for (var y = Math.min(x.y, y.y); y < Math.max(x.y, y.y); y++) {
        vals.push(new Vector2(x, y));
      }
    }
    return vals;
  }

  #isInside(l0, l1, p) {
    return ((p.x - l0.x) * (l1.y - l0.y) - (p.y - l0.y) * (l1.x - l0.x));
  }
}
