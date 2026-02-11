export default class Vector2 {
  static ZERO = new Vector2(0);
  
  constructor(x, y) {
    [this.x, this.y] = [x, y];
  }

  constructor(x) {
    [this.x, this.y] = x;
  }
  
  add(v) {
    if (v instanceof Vector2) {
      return new Vector2(this.x + v.x, this.y + v.y);
    } else {
      return new Vector2(this.x + v, this.y + v);
    }
  }

  sub(v) {
    if (v instanceof Vector2) {
      return new Vector2(this.x - v.x, this.y - v.y);
    } else {
      return new Vector2(this.x - v, this.y - v);
    }
  }

  mul(v) {
    if (v instanceof Vector2) {
      return new Vector2(this.x * v.x, this.y * v.y);
    } else {
      return new Vector2(this.x * v, this.y * v);
    }
  }

  div(v) {
    if (v instanceof Vector2) {
      return new Vector2(this.x / v.x, this.y / v.y);
    } else {
      return new Vector2(this.x / v, this.y / v);
    }
  }

  pow(v) {
    if (v instanceof Vector2) {
      return new Vector2(Math.pow(this.x, v.x), Math.pow(this.y, v.y));
    } else {
      return new Vector2(Math.pow(this.x, v), Math.pow(this.y, v));
    }
  }

  rotate(x) {
    var u = this.x;
    var v = this.y;
    return new Vector2(u * Math.cos(x) - v * Math.sin(x), u * Math.sin(x) + v * Math.cos(x));
  }
}
