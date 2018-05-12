import CanvasView from './canvas-view.js';
import { clearGameBoardDiv, createElement, getGameBoardDiv } from './dom-helper.js';

export function createCanvasView(
  squareSizeInPixels,
  horizontalSquares,
  verticalSquares,
) {
  const canvas = createElement('canvas');
  canvas.width = horizontalSquares * squareSizeInPixels;
  canvas.height = verticalSquares * squareSizeInPixels;
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;
  clearGameBoardDiv();
  getGameBoardDiv().appendChild(canvas);
  return new CanvasView(canvas, squareSizeInPixels);
}
