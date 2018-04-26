export default class Robot {
  constructor(location, color, image) {
    this.location = location;
    this.color = color;
    this.image = image;
    this.direction = null;
  }

  getColor() {
    return this.color;
  }

  getImage() {
    return this.image;
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
