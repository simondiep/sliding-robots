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

        this.context.strokeStyle = '#2a2a2a';
        this.context.lineWidth = 0.5;
        for (let i = this.squareSizeInPixels / 2; i < this.width || i < this.height; i += this.squareSizeInPixels) {
            // draw horizontal lines
            this.context.moveTo(i, 0);
            this.context.lineTo(i, this.height);
            // draw vertical lines
            this.context.moveTo(0, i);
            this.context.lineTo(this.width, i);
        }
        this.context.stroke();
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
        this.context.moveTo(x - (this.squareSizeInPixels / 2), y - (this.squareSizeInPixels / 2));
        this.context.lineTo(x + (this.squareSizeInPixels / 2), y - (this.squareSizeInPixels / 2));
        this.context.lineTo(x + (this.squareSizeInPixels / 2), y + (this.squareSizeInPixels / 2));
        this.context.lineTo(x - (this.squareSizeInPixels / 2), y + (this.squareSizeInPixels / 2));
        this.context.closePath();
        this.context.fill();
    }
}
