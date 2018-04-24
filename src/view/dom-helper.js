/**
 * DOM manipulation helper
 */
export function createElement(elementName) {
    return document.createElement(elementName);
}

export function  getBody() {
    return document.body;
}

export function  getGameBoardDiv() {
    return document.getElementById('game-board');
}

export function getNumberOfMovesLabel() {
    return document.getElementById('numberOfMovesLabel');
}
