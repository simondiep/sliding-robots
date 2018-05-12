import {
  getBody,
  getMuteButton,
  getNewPuzzleButton,
  getRestartButton,
  hideOverlay,
  incrementNumberOfMovesLabel,
  muteBackgroundMusic,
  playBackgroundMusic,
  playThudSound,
  resetNumberOfMovesLabel,
  setMinimumNumberOfMovesLabel,
  setPuzzleNumber,
  showApp,
  showOverlay,
  showHeaderBar,
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
    this.volume = 0.05;
    this.keyDownCallback = keyDownCallback;
    this.initializeGameCallback = initializeGameCallback;
    this.initializeGameWithPuzzleIdCallback = initializeGameWithPuzzleIdCallback;
    this.swapControlsCallback = swapControlsCallback;
    window.addEventListener('keydown', this._handleKeyDown.bind(this), true);
    getMuteButton().addEventListener('click', this._handleMuteButtonClicked.bind(this));
    getNewPuzzleButton().addEventListener('click', this.initializeGameCallback);
    getRestartButton().addEventListener('click', this._handleRestartButtonClicked.bind(this));
    showApp();
  }

  initializeGame(puzzleId, minimumNumberOfMoves, activeRobots) {
    this.puzzleId = puzzleId;
    this.activeRobots = activeRobots;
    this.hideVictoryScreen();
    resetNumberOfMovesLabel();
    setMinimumNumberOfMovesLabel(minimumNumberOfMoves);
    setPuzzleNumber(puzzleId);
    swapRobotControlsToYellowBlue();
  }

  robotHasStoppedMoving() {
    playThudSound(this.volume);
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
    // Also prevent triggering a focused button
    if (
      e.keyCode === UP_ARROW_KEYCODE ||
      e.keyCode === DOWN_ARROW_KEYCODE ||
      e.keyCode === SPACE_BAR_KEYCODE
    ) {
      e.preventDefault();
    }

    if (e.keyCode === SPACE_BAR_KEYCODE) {
      // Start First Game
      if (this.puzzleId === undefined) {
        playBackgroundMusic(this.volume);
        this.initializeGameCallback();
        showHeaderBar();
        return;
      }
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

  _handleMuteButtonClicked() {
    this.volume = 0;
    muteBackgroundMusic();
  }

  _handleRestartButtonClicked() {
    this.initializeGameWithPuzzleIdCallback(this.puzzleId);
  }
}
