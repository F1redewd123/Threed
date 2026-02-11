export default class Vector2 {
  constructor(x, y) {
    [this.x, this.y] = [x, y];
  }
  
  add(v) {
    this.x += v.x;
    this.y += v.y;
  }
  add(x) {
    this.x += x;
    this.y += x;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
  }
  sub(x) {
    this.x -= x;
    this.y -= x;
  }

  mul(v) {
    this.x *= v.x;
    this.y *= v.y;
  }
  mul(v) {
    this.x *= x;
    this.y *= x;
  }

  div(v) {
    this.x /= v.x;
    this.y /= v.y;
  }
  div(x) {
    this.x /= x;
    this.y /= x;
  }

  pow(v) {
    this.x = Math.pow(this.x, v.x);
    this.y = Math.pow(this.y, v.y);
  }
  pow(v) {
    this.x = Math.pow(this.x, x);
    this.y = Math.pow(this.y, x);
  }

  rotate(x) {
    var u = this.x;
    var v = this.y;
    this.x = (u * Math.cos(x) - v * Math.sin(x));
    this.y = (u * Math.sin(x) + v * Math.cos(x));
  }
}
