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
    const squaresNodeList = document.getElementsByClassName('square');
    const squaresDomArray = Array.from(squaresNodeList);
    
    const displayBoard = array => {
        for(let i = 0; i < array.length; i++){
            squaresDomArray[i].textContent = array[i];
        }
    }
    
    return {displayBoard}
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return {getName, getSymbol}
}

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

displayController.displayBoard(gameBoard.getGameBoard());






