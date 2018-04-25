import Coordinate from '../model/coordinate.js';
import Direction from '../model/direction.js';

const KEYCODE_TO_DIRECTION = {
  // WASD and arrow keys
  87: Direction.UP,
  65: Direction.LEFT,
  83: Direction.DOWN,
  68: Direction.RIGHT,
  38: Direction.UP,
  37: Direction.LEFT,
  40: Direction.DOWN,
  39: Direction.RIGHT,
};

export function applyKeyCodeToRobot(keyCode, robot) {
  if (robot.getDirection()) {
    // Don't change direction if already moving
    return;
  }

  robot.setDirection(KEYCODE_TO_DIRECTION[keyCode]);
}

// Determine new location for robot based on current direction
// Stops when a wall is hit
export function moveRobot(robot, wallLocations) {
  if (robot.getDirection()) {
    const newLocation = new Coordinate(
      robot.getLocation().getX() + robot.getDirection().x,
      robot.getLocation().getY() + robot.getDirection().y,
    );
    const insideWall = wallLocations.some(function(loc) {
      return loc.equals(newLocation);
    });

    if (insideWall) {
      robot.clearDirection();
    } else {
      robot.setLocation(newLocation);
    }
  }
}
