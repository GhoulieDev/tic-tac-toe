'use strict';

const gameBoard = (() => {
    let board = ['X', 'O', 'X', 
                 'O', 'X', 'O',
                 'X', 'O', 'X'];
    
    const getGameBoard = () => board;
    
    return {getGameBoard};
})();

const gameController = (() => {
    //temp
    const makeMove = (event) => {
       console.log(event.target.id) 
    }    
    return {makeMove};
})();

const displayController = (() => {
    const squaresNodeList = document.getElementsByClassName('square');
    const squaresDomArray = Array.from(squaresNodeList);
    
    squaresDomArray.forEach(square => {
        square.addEventListener('click', gameController.makeMove);
    })
    
    const displayBoard = boardArray => {
        for(let i = 0; i < boardArray.length; i++){
            squaresDomArray[i].textContent = boardArray[i];
        }
    }
    
    return {displayBoard}
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return {getName, getSymbol}
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

displayController.displayBoard(gameBoard.getGameBoard());






