export default class Matrix {
  constructor(mat) {
    this.mat = mat;
  }

  mul(mat) {
    for (var y = 0; y < this.mat.length; y++) {
      if (this.mat[y].length != mat[y].length) {
        this.mat[y].length = mat[y].length;
      }
      for (var x = 0; x < this.mat[y].length; x++) {
        this.mat[y][x] *= mat[y][x];
      }
    }
  }
}
