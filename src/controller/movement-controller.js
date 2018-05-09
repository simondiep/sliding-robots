import Coordinate from '../model/coordinate.js';
import Direction, { isDown, isLeft, isRight, isUp } from '../model/direction.js';

const WASD_KEYCODE_TO_DIRECTION = {
  87: Direction.UP,
  65: Direction.LEFT,
  83: Direction.DOWN,
  68: Direction.RIGHT,
};

const ARROW_KEYCODE_TO_DIRECTION = {
  38: Direction.UP,
  37: Direction.LEFT,
  40: Direction.DOWN,
  39: Direction.RIGHT,
};

// Only one robot can be moving at a time
// Return true if keycode was valid
export function applyKeyCodeToRobot(keyCode, robots, activeRobots) {
  for (const robot of robots) {
    if (robot.getDirection()) {
      // Don't change direction if already moving
      return;
    }
  }

  for (const robot of robots) {
    if (activeRobots === 'yellowBlue') {
      if (robot.getColor() === 'yellow' && WASD_KEYCODE_TO_DIRECTION.hasOwnProperty(keyCode)) {
        robot.setDirection(WASD_KEYCODE_TO_DIRECTION[keyCode]);
        return true;
      } else if (
        robot.getColor() === 'blue' &&
        ARROW_KEYCODE_TO_DIRECTION.hasOwnProperty(keyCode)
      ) {
        robot.setDirection(ARROW_KEYCODE_TO_DIRECTION[keyCode]);
        return true;
      }
    } else if (activeRobots === 'redGreen') {
      if (robot.getColor() === 'red' && WASD_KEYCODE_TO_DIRECTION.hasOwnProperty(keyCode)) {
        robot.setDirection(WASD_KEYCODE_TO_DIRECTION[keyCode]);
        return true;
      } else if (
        robot.getColor() === 'green' &&
        ARROW_KEYCODE_TO_DIRECTION.hasOwnProperty(keyCode)
      ) {
        robot.setDirection(ARROW_KEYCODE_TO_DIRECTION[keyCode]);
        return true;
      }
    }
  }
}

// Determine new location for robot based on current direction
// Stops when a wall or another robot is hit
export function moveRobot(robot, wallLocations, robots) {
  if (robot.getDirection()) {
    const newLocation = new Coordinate(
      robot.getLocation().getX() + robot.getDirection().x,
      robot.getLocation().getY() + robot.getDirection().y,
    );

    const overlapsAnotherRobot = robots.some(function(rob) {
      return rob.getColor() !== robot.color && rob.getLocation().equals(newLocation);
    });

    const overlapsWall = wallLocations.some(function(wallLocation) {
      if (wallLocation.equals(newLocation)) {
        if (isUp(robot.getDirection()) && wallLocation.hasWallOnBottom()) {
          return true;
        }
        if (isRight(robot.getDirection()) && wallLocation.hasWallOnLeft()) {
          return true;
        }
        if (isDown(robot.getDirection()) && wallLocation.hasWallOnTop()) {
          return true;
        }
        if (isLeft(robot.getDirection()) && wallLocation.hasWallOnRight()) {
          return true;
        }
        return false;
      }

      if (wallLocation.equals(robot.getLocation())) {
        if (isUp(robot.getDirection()) && wallLocation.hasWallOnTop()) {
          return true;
        }
        if (isRight(robot.getDirection()) && wallLocation.hasWallOnRight()) {
          return true;
        }
        if (isDown(robot.getDirection()) && wallLocation.hasWallOnBottom()) {
          return true;
        }
        if (isLeft(robot.getDirection()) && wallLocation.hasWallOnLeft()) {
          return true;
        }
        return false;
      }
      return false;
    });

    if (overlapsAnotherRobot || overlapsWall) {
      robot.clearDirection();
    } else {
      robot.setLocation(newLocation);
    }
  }
}
