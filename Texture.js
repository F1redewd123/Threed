import Vector4 from "https://f1redewd123.github.io/Threed/Vector4.js";

export default class Texture {
  width;
  height;
  #dataBuffer = [];
  
  static fromURL(url) {
    var img = new Image();
    img.src = url;
    img.onload = function() {
      var data = Texture.#create(this);
      var tex = new Texture();
      for (var i = 0; i < data.length; i += 3) {
        tex.#dataBuffer.push(new Vector4(data[i], data[i + 1], data[i + 2], data[i + 3]));
      }
    };
  }

  static #create(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img);
    return ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
  }

  samplePos(p) {
    if (p.x > this.width || p.x < 0 || p.y > this.height || p.y < 0)
      return -1;
    return this.#dataBuffer[p.x + p.y * this.width];
  }
}
