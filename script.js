'use strict';

const gameBoard = (() => {
    let board = ['x', 'o', 'x', 
                 'x', 'o', 'x',
                 'x', 'o', 'x'];
    
    const getGameBoard = () => board;
    
    return {getGameBoard};
})();

const gameFlow = (() => {
    
    
    return {};
})();

const displayController = (() => {
   

    return {}
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return {getName, getSymbol}
}

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');



