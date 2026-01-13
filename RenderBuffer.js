export default class RenderBuffer {
  constructor(s) {
    this.scene = s;
  }

  loadBuffer(v, i) {
    [this.verts, this.inds] = [v, i];
  }

  render() {
    
  }
}
