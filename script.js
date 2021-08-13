'use strict';
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return {getName, getSymbol}
};

const gameBoard = (() => {
    const board = ['', '', '', 
                   '', '', '',
                   '', '', ''];
    
    const getGameBoard = () => board;

    const setSquare = (square, symbol) => {
        board[square] = symbol;
    }
    
    return {getGameBoard, setSquare};
})();

const gameController = (() => {
    let turnCounter = 1;

    const makeMove = (event) => {
       const targetSquare = event.target.id;
       if(isValidMove(gameBoard.getGameBoard(), targetSquare)){
            //odd numbers for player 1's turn, even for player 2's turn
            if(turnCounter % 2 != 0){
               gameBoard.setSquare(targetSquare, player1.getSymbol());
            }else{
               gameBoard.setSquare(targetSquare, player2.getSymbol());
           }
           //displayController.displayBoard(gameBoard.getGameBoard());
           displayController.displaySquare(gameBoard.getGameBoard(), targetSquare);
           turnCounter++;
        }
    }
    
    const isValidMove = (currentBoard, squareId) => {
        if(currentBoard[squareId]){
            //square already filled
            return false;
        }else{
            //empty square therefore valid move
            return true;
        }
    }

    return {makeMove};
})();

const displayController = (() => {
    const squaresNodeList = document.getElementsByClassName('square');
    const squaresDomArray = Array.from(squaresNodeList);
    
    squaresDomArray.forEach(square => {
        square.addEventListener('click', gameController.makeMove);
    })

    //displays the whole board in its current state
    const displayBoard = boardArray => {
        for(let i = 0; i < boardArray.length; i++){
            squaresDomArray[i].textContent = boardArray[i];
        }
    }

    //displays single square after a move is made
    const displaySquare = (boardArray, square) => {
        squaresDomArray[square].textContent = boardArray[square];
    }
    
    return {displayBoard, displaySquare}
})();

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');



displayController.displayBoard(gameBoard.getGameBoard());






