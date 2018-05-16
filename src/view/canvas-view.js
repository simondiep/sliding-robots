import Coordinate from '../model/coordinate.js'

/**
 * Handles all requests related to the canvas
 */
export default class CanvasView {
  constructor(canvas, squareSizeInPixels) {
    this.height = canvas.height;
    this.width = canvas.width;
    this.context = canvas.getContext('2d');
    this.squareSizeInPixels = squareSizeInPixels;
  }

  clearAndDrawBoard() {
    for (let i = 0; i < this.width/this.squareSizeInPixels; i ++) {
      for (let j = 0; j < this.height/this.squareSizeInPixels; j++) {
        this.drawImage(new Coordinate(i, j), document.getElementById("background-tile"));
      }
    }
  }

  drawImage(coordinate, image) {
    const x = coordinate.x * this.squareSizeInPixels;
    const y = coordinate.y * this.squareSizeInPixels;
    this.context.drawImage(
      image,
      x,
      y,
      this.squareSizeInPixels,
      this.squareSizeInPixels,
    );
  }

  drawSquare(coordinate, color) {
    const x = coordinate.x * this.squareSizeInPixels;
    const y = coordinate.y * this.squareSizeInPixels;
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(x + this.squareSizeInPixels, y);
    this.context.lineTo(x + this.squareSizeInPixels, y + this.squareSizeInPixels);
    this.context.lineTo(x, y + this.squareSizeInPixels);
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
    let x = location.x * this.squareSizeInPixels + this.squareSizeInPixels/2 - textWidth / 2;
    let y = location.y * this.squareSizeInPixels + this.squareSizeInPixels/2 + textHeight / 2;
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

  drawWalls(wallCoordinates, outerColor, innerColor) {
    for (const wallCoordinate of wallCoordinates) {
      let x = wallCoordinate.x * this.squareSizeInPixels;
      let y = wallCoordinate.y * this.squareSizeInPixels;
      if (wallCoordinate.hasWallOnTop()) {
        this.drawWall(x, y, x + this.squareSizeInPixels, y, outerColor, innerColor);
      }
      if (wallCoordinate.hasWallOnRight()) {
        this.drawWall(x + this.squareSizeInPixels, y, x + this.squareSizeInPixels, y + this.squareSizeInPixels, outerColor, innerColor);
      }
      if (wallCoordinate.hasWallOnBottom()) {
        this.drawWall(x, y + this.squareSizeInPixels, x + this.squareSizeInPixels, y + this.squareSizeInPixels, outerColor, innerColor);
      }
      if (wallCoordinate.hasWallOnLeft()) {
        this.drawWall(x, y, x, y + this.squareSizeInPixels, outerColor, innerColor);
      }
    }
  }

  drawWall(beginX, beginY, endX, endY, outerColor, innerColor) {
    this.context.beginPath();
    this.context.moveTo(beginX, beginY);
    this.context.lineTo(endX, endY);
    this.context.closePath();
    this.context.strokeStyle = outerColor;
    this.context.lineWidth = this.squareSizeInPixels / 5;
    this.context.stroke();
    this.context.strokeStyle = innerColor;
    this.context.lineWidth = this.squareSizeInPixels / 10;
    this.context.stroke();
  }

  showSplashScreen(title, message) {
    this.context.fillStyle = "lightgreen";
    this.context.textAlign = "center";
    this.context.strokeStyle = "black";
    this.context.font = (this.height / 10) + "px consolas";
    this.context.strokeText(title, this.width/2, this.height/4);
    this.context.fillText(title, this.width/2, this.height/4);
    this.context.font = (this.height / 15) + "px consolas";
    this.context.strokeText(message, this.width/2, this.height*(3/4));
    this.context.fillStyle = "white";
    this.context.fillText(message, this.width/2, this.height*(3/4));
  }
}
