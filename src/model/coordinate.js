/**
 *  A coordinate that is not scaled to the canvas.
 */
export default class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  equals(otherCoordinate) {
    return this.x === otherCoordinate.x && this.y === otherCoordinate.y;
  }
}
