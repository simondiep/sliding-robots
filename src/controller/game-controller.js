import CanvasFactory from '../view/canvas-factory.js';
import GameView from '../view/game-view.js';

/**
 * Controls all game logic
 */
export default class GameController {
    constructor() {
        const board = {
            SQUARE_SIZE_IN_PIXELS: 12.5,
            HORIZONTAL_SQUARES: 50,
            VERTICAL_SQUARES: 40,
        };
        this.gameView = new GameView(this.keyDownCallback);
        this.walls = [];
        this.createBoard(board);
    }

    renderGame() {
        this.canvasView.clear();

        // TODO draw robots

        this.canvasView.drawSquares(this.walls, ClientConfig.WALL_COLOR);

        const self = this;
        // Run in a loop
        setTimeout(() => {
            requestAnimationFrame(self.renderGame.bind(self));
        }, 1000 / 30); // 30 FPS
    }

    createBoard(board) {
        this.canvasView =
            CanvasFactory.createCanvasView(
                board.SQUARE_SIZE_IN_PIXELS, board.HORIZONTAL_SQUARES, board.VERTICAL_SQUARES);
        this.canvasView.clear();
        this.gameView.ready();
        this.renderGame();
    }

    initializeGame(gameData) {
        this.walls = gameData.walls;
    }

    /*******************
     *  View Callbacks *
     *******************/

    keyDownCallback(keyCode) {
        // TODO handle keys
        console.log("Received keycode: ", keyCode);
    }
}
