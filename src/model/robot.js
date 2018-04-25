export default class Robot {
  constructor(location, color) {
    this.location = location;
    this.color = color;
    this.direction = null;
  }

  getColor() {
    return this.color;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  clearDirection() {
    this.direction = null;
  }
}
