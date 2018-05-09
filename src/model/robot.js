import { getRobotImages } from '../view/dom-helper.js';
import { isDown, isLeft, isRight, isUp } from './direction.js';

export default class Robot {
  constructor(location, color, image) {
    this.location = location;
    this.color = color;
    this.images = getRobotImages(color);
    this.direction = null;
  }

  getColor() {
    return this.color;
  }

  getImage() {
    if (this.direction === null) {
      return this.images.front;
    }
    if (isDown(this.direction)) {
      return this.images.front;
    }
    if (isUp(this.direction)) {
      return this.images.back;
    }
    if (isLeft(this.direction)) {
      return this.images.left;
    }
    if (isRight(this.direction)) {
      return this.images.right;
    }
    return this.images.front;
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
