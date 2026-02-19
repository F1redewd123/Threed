import Vector4 from "https://f1redewd123.github.io/Threed/Vector4.js";

export default class Texture {
  width;
  height;
  #dataBuffer = [];
  filterMode;
  
  static fromURL(url, filterMode = 0) {
    return new Promise((r, e) => {
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function() {
        var data = Texture.#create(this);
        var tex = new Texture();
        tex.width = this.naturalWidth;
        tex.height = this.naturalHeight;
        tex.filterMode = filterMode;
        for (var i = 0; i < data.length; i += 4) {
          tex.#dataBuffer.push(new Vector4(data[i], data[i + 1], data[i + 2], data[i + 3]));
        }
        r(tex);
      };
      img.onerror = () => { e("Texture could not be loaded"); };
      img.src = url;
    });
  }

  static #create(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data;
  }

  samplePos(p) {
    if (p.x > 1 || p.x < 0 || p.y > 1 || p.y < 0)
      return -1;
    if (this.filterMode == 0) {
      return this.#dataBuffer[Math.floor(p.x * (this.width - 1)) + Math.floor(p.y * (this.height - 1)) * this.width];
    }
  }
}
