import DomHelper from './dom-helper.js';

const SPACE_BAR_KEYCODE = 32;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;

/**
 * Handles all requests related to the display of the game, not including the canvas
 */
export default class GameView {
    constructor(keyDownCallback) {
        this.keyDownCallback = keyDownCallback;
        window.addEventListener('keydown', this._handleKeyDown.bind(this), true);
    }

    ready() {
        // Show everything when ready
        DomHelper.showAllContent();
    }

    /*******************
     *  Event handling *
     *******************/

     _handleKeyDown(e) {
        // Prevent keyboard scrolling default behavior
        if ((e.keyCode === UP_ARROW_KEYCODE || e.keyCode === DOWN_ARROW_KEYCODE) ||
             (e.keyCode === SPACE_BAR_KEYCODE && e.target === DomHelper.getBody())) {
            e.preventDefault();
        }

        this.keyDownCallback(e.keyCode);
    }
}
