/**
 * DOM manipulation helper
 */
export default class DomHelper {
    static createElement(elementName) {
        return document.createElement(elementName);
    }

    static getBody() {
        return document.body;
    }

    static getGameBoardDiv() {
        return document.getElementById('game-board');
    }

    static showAllContent() {
        document.getElementById('cover').style.visibility = 'visible';
    }
}
