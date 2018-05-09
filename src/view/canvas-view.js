/**
 * Handles all requests related to the canvas
 */
export default class CanvasView {
  constructor(canvas, squareSizeInPixels, imageUploadCanvas) {
    this.height = canvas.height;
    this.width = canvas.width;
    this.context = canvas.getContext('2d');
    this.squareSizeInPixels = squareSizeInPixels;
  }

  clear() {
    this.context.fillStyle = 'black';
    this.context.globalAlpha = 1;
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.strokeStyle = '#7E7E7E';
    this.context.lineWidth = 1;
    for (
      let i = this.squareSizeInPixels / 2;
      i < this.width || i < this.height;
      i += this.squareSizeInPixels
    ) {
      // draw horizontal lines
      this.context.moveTo(i, 0);
      this.context.lineTo(i, this.height);
      // draw vertical lines
      this.context.moveTo(0, i);
      this.context.lineTo(this.width, i);
    }
    this.context.stroke();
  }

  drawImage(coordinate, image) {
    const x = coordinate.x * this.squareSizeInPixels;
    const y = coordinate.y * this.squareSizeInPixels;
    this.context.drawImage(
      image,
      x - this.squareSizeInPixels / 2,
      y - this.squareSizeInPixels / 2,
      this.squareSizeInPixels,
      this.squareSizeInPixels,
    );
  }

  drawSquares(coordinates, color) {
    for (const coordinate of coordinates) {
      this.drawSquare(coordinate, color);
    }
  }

  drawSquare(coordinate, color) {
    const x = coordinate.x * this.squareSizeInPixels;
    const y = coordinate.y * this.squareSizeInPixels;
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.moveTo(x - this.squareSizeInPixels / 2, y - this.squareSizeInPixels / 2);
    this.context.lineTo(x + this.squareSizeInPixels / 2, y - this.squareSizeInPixels / 2);
    this.context.lineTo(x + this.squareSizeInPixels / 2, y + this.squareSizeInPixels / 2);
    this.context.lineTo(x - this.squareSizeInPixels / 2, y + this.squareSizeInPixels / 2);
    this.context.closePath();
    this.context.fill();
  }

  drawText(location, color, text) {
    this.context.save();
    this.context.lineWidth = 5;
    this.context.strokeStyle = 'black';
    this.context.fillStyle = color;
    this.context.font = 'bold 18px Arial';

    const textWidth = this.context.measureText(text).width;
    const textHeight = 24;
    let x = location.x * this.squareSizeInPixels - textWidth / 2;
    let y = location.y * this.squareSizeInPixels + textHeight / 2;
    if (x < 0) {
      x = 0;
    } else if (x > this.width - textWidth) {
      x = this.width - textWidth;
    }
    if (y < textHeight) {
      y = textHeight;
    } else if (y > this.height) {
      y = this.height;
    }
    // Draw text specifying the bottom left corner
    this.context.strokeText(text, x, y);
    this.context.fillText(text, x, y);
    this.context.restore();
  }
}
