'use strict';

const gameBoard = (() => {
    let board = ['x', 'o', 'x', 'x', 'o', 'x','x', 'o', 'x'];
    
    return {board};
})();

const gameState = (() => {
    
    
    return {};
})();

const displayController = (() => {
    const log = () => {
        console.log(gameBoard.board);
    }

    return {log}
})();

const Player = () => {
    return {}
}


displayController.log()
//const player1 = Player();
