import Coordinate from './coordinate.js';

export default class WallCoordinate extends Coordinate {
  constructor(x, y, wallConfig) {
    super(x, y);
    this.wallConfig = wallConfig;
  }

  hasWallOnTop() {
    return this.wallConfig.top;
  }

  hasWallOnBottom() {
    return this.wallConfig.bottom;
  }

  hasWallOnLeft() {
    return this.wallConfig.left;
  }

  hasWallOnRight() {
    return this.wallConfig.right;
  }
}
