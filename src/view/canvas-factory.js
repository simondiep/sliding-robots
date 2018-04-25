import CanvasView from './canvas-view.js';
import { clearGameBoardDiv, createElement, getGameBoardDiv } from './dom-helper.js';

export function createCanvasView(
  squareSizeInPixels,
  horizontalSquares,
  verticalSquares,
  canvasClickHandler,
) {
  const canvas = createElement('canvas');
  canvas.width = horizontalSquares * squareSizeInPixels;
  canvas.height = verticalSquares * squareSizeInPixels;
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;
  clearGameBoardDiv();
  getGameBoardDiv().appendChild(canvas);
  const imageUploadCanvas = createImageUploadCanvas(squareSizeInPixels);
  return new CanvasView(canvas, squareSizeInPixels, imageUploadCanvas, canvasClickHandler);
}

function createImageUploadCanvas(squareSizeInPixels) {
  const canvas = document.createElement('canvas');
  const roundedSize = Math.floor(squareSizeInPixels);
  canvas.width = roundedSize;
  canvas.height = roundedSize;
  return canvas;
}
