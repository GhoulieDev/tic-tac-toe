//make UI, have inputable names, display to say winner

'use strict';
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return {getName, getSymbol}
};

const gameBoard = (() => {
    let board = ['', '', '', 
                   '', '', '',
                   '', '', ''];
    
    const getGameBoard = () => board;

    const setSquare = (square, symbol) => {
        board[square] = symbol;
    }

    const resetBoard = () => {
        board = ['', '', '', 
        '', '', '',
        '', '', ''];
    }
    
    return {getGameBoard, setSquare, resetBoard};
})();

const gameController = (() => {
    let turnCounter = 1;
    
    /*assigning each square/squareID the possible ways to produce a winning result 
    e.g if 0(top left) chosen it can be won via top row, left column or diagonal top left to bottom right */
    const winningLines = {
        0: [[0, 1, 2], [0, 4, 8], [0, 3, 6]],
        1: [[1, 4, 7], [0, 1, 2]],
        2: [[0, 1, 2], [2, 5, 8], [2, 4, 6]], 
        3: [[3, 4, 5], [0, 3, 6]],
        4: [[1, 4, 7], [3, 4, 5], [0, 4, 8], [2, 4, 6]],
        5: [[2, 5, 8], [3, 4, 5]],
        6: [[0, 3, 6], [2, 4, 6], [6, 7, 8]],
        7: [[6, 7, 8], [1, 4, 7]],
        8: [[6, 7 ,8], [0, 4, 8], [2, 5, 8]],
    }
    
    const makeMove = (event) => {
       const targetSquare = event.target.id;
       
       if(isValidMove(gameBoard.getGameBoard(), targetSquare)){
            //odd numbers for player 1's turn, even for player 2's turn
            if(turnCounter % 2 != 0){
               gameBoard.setSquare(targetSquare, player1.getSymbol());
               checkForWin(targetSquare, player1.getSymbol(), gameBoard.getGameBoard());
            }else{
               gameBoard.setSquare(targetSquare, player2.getSymbol());
               checkForWin(targetSquare, player2.getSymbol(), gameBoard.getGameBoard());
           }
           //displayController.displayBoard(gameBoard.getGameBoard());
           displayController.displaySquare(gameBoard.getGameBoard(), targetSquare);
           turnCounter++;
           checkForTie();
        }
    }
    
    const isValidMove = (currentBoard, squareId) => {
        //checks if square contains anything
        if(currentBoard[squareId]){
            return false;
        }else{
            return true;
        }
    }

    //to check if won we take the selected square and player symbol, and check the board array with the possible ways to win from that selected square. This was chosen because rather than checking all 8 winning combnations every time a move was selected we only check 2-4 possibilies depending on the square selected
    const checkForWin = (selectedSquare, playerSymbol, board) => {
        for(let i = 0; i < winningLines[selectedSquare].length; i++){
            if(board[winningLines[selectedSquare][i][0]] == playerSymbol && 
               board[winningLines[selectedSquare][i][1]] == playerSymbol && 
               board[winningLines[selectedSquare][i][2]] == playerSymbol){
                console.log('winning line found')
                console.log(winningLines[selectedSquare][i])
            }
        }
    }

    const checkForTie = () => {
        if(turnCounter == 10){
            console.log('tie')
        }
    }

    const resetGame = () => {
        gameBoard.resetBoard();
        displayController.displayBoard(gameBoard.getGameBoard());
        turnCounter = 1;
    }
    
    return {makeMove, resetGame};
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

    const displaySquare = (boardArray, square) => {
        squaresDomArray[square].textContent = boardArray[square];
    }
    
    displayBoard(gameBoard.getGameBoard());
    
    return {displayBoard, displaySquare}
})();

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');



