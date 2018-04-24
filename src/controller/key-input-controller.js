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

export function applyKeyCodeToPlayerLocation(keyCode, playerLocation) {
  const newDirection = KEYCODE_TO_DIRECTION[keyCode];
  if (!newDirection) {
    return playerLocation;
  }
  const newLocation = new Coordinate(playerLocation.getX() + newDirection.x, playerLocation.getY() + newDirection.y);
  // TODO check if running into wall
  return newLocation;
}
