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
  const ctx = this.scene.ctx;
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  // 1. Create a full-screen buffer
  const imgData = ctx.createImageData(width, height);
  const pixels = imgData.data; 

  /* VERTEX PARSING */
  const newVerts = this.verts.map(v => 
    this.shader.program.vert({ ...this.#shaderProperties, aPos: v, position: Vector3.ZERO }).position
  );

  /* FRAGMENT PARSING */
  for (let i = 0; i < this.inds.length; i += 3) {
    const i0 = this.inds[i], i1 = this.inds[i+1], i2 = this.inds[i+2];
    const p0 = newVerts[i0], p1 = newVerts[i1], p2 = newVerts[i2];
    const uv0 = this.uvs[i0], uv1 = this.uvs[i1], uv2 = this.uvs[i2];

    // Bounding Box (clamped to screen)
    const minX = Math.max(0, Math.floor(Math.min(p0.x, p1.x, p2.x)));
    const maxX = Math.min(width, Math.ceil(Math.max(p0.x, p1.x, p2.x)));
    const minY = Math.max(0, Math.floor(Math.min(p0.y, p1.y, p2.y)));
    const maxY = Math.min(height, Math.ceil(Math.max(p0.y, p1.y, p2.y)));

    // Area of the triangle for normalization
    const area = this.#isInside(p0, p1, p2);
    if (area === 0) continue; // Skip degenerate triangles

    for (let y = minY; y < maxY; y++) {
      for (let x = minX; x < maxX; x++) {
        const p = new Vector2(x, y);
        
        // Use your existing #isInside to get weights
        const s0 = this.#isInside(p1, p2, p);
        const s1 = this.#isInside(p2, p0, p);
        const s2 = this.#isInside(p0, p1, p);

        // Check if inside (adjusting for winding order)
        if ((area > 0 && s0 >= 0 && s1 >= 0 && s2 >= 0) || 
            (area < 0 && s0 <= 0 && s1 <= 0 && s2 <= 0)) {
          
          const w0 = s0 / area;
          const w1 = s1 / area;
          const w2 = s2 / area;

          const interpUV = new Vector2(
            w0 * uv0.x + w1 * uv1.x + w2 * uv2.x,
            w0 * uv0.y + w1 * uv1.y + w2 * uv2.y
          );

          const color = this.shader.program.frag({
            ...this.#shaderProperties,
            uv: interpUV,
            fragColor: Vector4.ZERO
          }).fragColor;

          // Write to screen buffer: (y * width + x) * 4 channels
          const idx = (y * width + x) * 4;
          pixels[idx]     = color.x * 255; // R
          pixels[idx + 1] = color.y * 255; // G
          pixels[idx + 2] = color.z * 255; // B
          pixels[idx + 3] = color.w * 255; // A
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
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
