import { getBody, hideOverlay, showOverlay } from './dom-helper.js';
import { incrementNumberOfMovesLabel, resetNumberOfMovesLabel } from './dom-helper.js';

const SPACE_BAR_KEYCODE = 32;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;

/**
 * Handles all requests related to the display of the game, not including the canvas
 */
export default class GameView {
  constructor(keyDownCallback, initializeGameCallback) {
    this.keyDownCallback = keyDownCallback;
    this.initializeGameCallback = initializeGameCallback;
    window.addEventListener('keydown', this._handleKeyDown.bind(this), true);
  }

  initializeGame() {
    resetNumberOfMovesLabel();
  }

  incrementNumberOfMoves() {
    incrementNumberOfMovesLabel();
  }

  hideVictoryScreen() {
    hideOverlay();
  }

  showVictoryScreen() {
    showOverlay();
  }

  /*******************
   *  Event handling *
   *******************/

  _handleKeyDown(e) {
    if (e.keyCode === SPACE_BAR_KEYCODE) {
      this.hideVictoryScreen();
      this.initializeGameCallback();
    }

    // Prevent keyboard scrolling default behavior
    if (
      e.keyCode === UP_ARROW_KEYCODE ||
      e.keyCode === DOWN_ARROW_KEYCODE ||
      (e.keyCode === SPACE_BAR_KEYCODE && e.target === getBody())
    ) {
      e.preventDefault();
    }

    this.keyDownCallback(e.keyCode);
  }
}
