import { getBody, getRestartButton, hideOverlay, showOverlay } from './dom-helper.js';
import {
  incrementNumberOfMovesLabel,
  resetNumberOfMovesLabel,
  setMinimumNumberOfMovesLabel,
  showApp,
  swapRobotControlsToRedGreen,
  swapRobotControlsToYellowBlue,
} from './dom-helper.js';

const SPACE_BAR_KEYCODE = 32;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;

/**
 * Handles all requests related to the display of the game, not including the canvas
 */
export default class GameView {
  constructor(
    keyDownCallback,
    initializeGameCallback,
    initializeGameWithPuzzleIdCallback,
    swapControlsCallback,
  ) {
    this.keyDownCallback = keyDownCallback;
    this.initializeGameCallback = initializeGameCallback;
    this.initializeGameWithPuzzleIdCallback = initializeGameWithPuzzleIdCallback;
    this.swapControlsCallback = swapControlsCallback;
    window.addEventListener('keydown', this._handleKeyDown.bind(this), true);
    getRestartButton().addEventListener('click', this._handleRestartButtonClicked.bind(this));
  }

  initializeGame(puzzleId, minimumNumberOfMoves, activeRobots) {
    this.puzzleId = puzzleId;
    this.activeRobots = activeRobots;
    this.hideVictoryScreen();
    resetNumberOfMovesLabel();
    setMinimumNumberOfMovesLabel(minimumNumberOfMoves);
    swapRobotControlsToYellowBlue();
    showApp();
  }

  incrementNumberOfMoves() {
    incrementNumberOfMovesLabel();
  }

  hideVictoryScreen() {
    hideOverlay();
    this.overlayVisible = false;
  }

  showVictoryScreen() {
    showOverlay();
    this.overlayVisible = true;
  }

  _swapRobotControls() {
    if (this.activeRobots === 'yellowBlue') {
      swapRobotControlsToRedGreen();
      this.activeRobots = 'redGreen';
    } else {
      swapRobotControlsToYellowBlue();
      this.activeRobots = 'yellowBlue';
    }
  }

  /*******************
   *  Event handling *
   *******************/

  _handleKeyDown(e) {
    // Prevent keyboard scrolling default behavior
    if (
      e.keyCode === UP_ARROW_KEYCODE ||
      e.keyCode === DOWN_ARROW_KEYCODE ||
      (e.keyCode === SPACE_BAR_KEYCODE && e.target === getBody())
    ) {
      e.preventDefault();
    }

    if (e.keyCode === SPACE_BAR_KEYCODE) {
      if (this.overlayVisible) {
        this.hideVictoryScreen();
        this.initializeGameCallback();
        return;
      }
      this._swapRobotControls();
      this.swapControlsCallback();
      return;
    }

    this.keyDownCallback(e.keyCode);
  }

  _handleRestartButtonClicked() {
    this.initializeGameWithPuzzleIdCallback(this.puzzleId);
  }
}
