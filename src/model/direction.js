const DIRECTION = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export default DIRECTION;

export function isUp(dir) {
  return dir.x === DIRECTION.UP.x && dir.y === DIRECTION.UP.y;
}

export function isDown(dir) {
  return dir.x === DIRECTION.DOWN.x && dir.y === DIRECTION.DOWN.y;
}

export function isLeft(dir) {
  return dir.x === DIRECTION.LEFT.x && dir.y === DIRECTION.LEFT.y;
}

export function isRight(dir) {
  return dir.x === DIRECTION.RIGHT.x && dir.y === DIRECTION.RIGHT.y;
}
