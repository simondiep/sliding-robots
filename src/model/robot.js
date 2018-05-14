import { getRobotImages } from '../view/dom-helper.js';
import { isDown, isLeft, isRight, isUp } from './direction.js';

export const ROBOTS = {
  RED: { id: 1, color: "red", keyCodes: [49, 97] },
  GREEN: { id: 2, color: "green", keyCodes: [50, 98] },
  BLUE: { id: 3, color: "blue", keyCodes: [51, 99] },
  YELLOW: { id: 4, color: "yellow", keyCodes: [52, 100] },
};

export default class Robot {
  constructor(location, robotInfo) {
    this.robotInfo = robotInfo;
    this.location = location;
    this.images = getRobotImages(robotInfo.color);
    this.direction = null;
  }

  getColor() {
    return this.robotInfo.color;
  }

  getId() {
    return this.robotInfo.id;
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
