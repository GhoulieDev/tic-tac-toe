//input names
//reset game button and a reset round button?
//AI functionality

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
    let playerTurn;
    
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
                playerTurn = player1;
                //gameBoard.setSquare(targetSquare, player1.getSymbol());
                //checkForWin(targetSquare, player1, gameBoard.getGameBoard());
               
            }else{
                playerTurn = player2;
                //gameBoard.setSquare(targetSquare, player2.getSymbol());
                //checkForWin(targetSquare, player2, gameBoard.getGameBoard());
            }
            gameBoard.setSquare(targetSquare, playerTurn.getSymbol());
            displayController.displaySquare(gameBoard.getGameBoard(), targetSquare);

            //check for a winner and if none is found we want to check for a tie
            if(!checkForWin(targetSquare, playerTurn, gameBoard.getGameBoard())){
                turnCounter++;
                checkForTie();
            }
            
        }
    }
    
    const isValidMove = (currentBoard, squareId) => {
        //if empty square return true for valid move to be made
        if(!currentBoard[squareId]){
            return true;
        }else{
            return false;
        }
    }

    //to check if won we take the selected square and player, and check the board array with the possible ways to win from that selected square. This was chosen because rather than checking all 8 winning combnations every time a move was selected we only check 2-4 possibilies depending on the square selected
    const checkForWin = (selectedSquare, player, board) => {
        for(let i = 0; i < winningLines[selectedSquare].length; i++){
            if(board[winningLines[selectedSquare][i][0]] == player.getSymbol() && 
               board[winningLines[selectedSquare][i][1]] == player.getSymbol() && 
               board[winningLines[selectedSquare][i][2]] == player.getSymbol()){
                //console.log('winning line found');
                //console.log(winningLines[selectedSquare][i]);
                displayController.displayWinner(player);
                return true;
            }
        }
    }

    const checkForTie = () => {
        if(turnCounter == 10){
          displayController.displayTie();  
        }
    }

    const resetGame = () => {
        turnCounter = 1;
        gameBoard.resetBoard();
        displayController.displayBoard(gameBoard.getGameBoard());
        displayController.clearUI();
        displayController.addListeners();
    }
    
    return {makeMove, resetGame};
})();

const displayController = (() => {
    const squaresNodeList = document.getElementsByClassName('square');
    const squaresDomArray = Array.from(squaresNodeList);
    const newGameButton = document.getElementById('new-game');
    const bodyElement = document.querySelector('body');
    const form = document.getElementById('player-form');

    const winnerInfoDiv = document.createElement('div');
    const winnerInfoPara = document.createElement('p');
    winnerInfoDiv.classList.add('winner-display');
    
    form.addEventListener('submit', event => {
        event.preventDefault();
        //function to set players here--------------
        //   gamecontroller.setPlayers????
        form.reset();
        closeForm();
        gameController.resetGame();
    })

    const closeForm = () => {
        form.style.display = 'none';
    }
    
    const showForm = () => {
        form.style.display = 'flex';
    }

    newGameButton.addEventListener('click', showForm)
    //newGameButton.addEventListener('click', gameController.resetGame)
    
    const addListeners = () => {
        squaresDomArray.forEach(square => {
            square.addEventListener('click', gameController.makeMove);
        });
    }

    const removeListeners = () => {
        squaresDomArray.forEach(square => {
            square.removeEventListener('click', gameController.makeMove);
        })
    }

    const displayBoard = boardArray => {
        for(let i = 0; i < boardArray.length; i++){
            squaresDomArray[i].textContent = boardArray[i];
        }
    }

    const displaySquare = (boardArray, square) => {
        squaresDomArray[square].textContent = boardArray[square];
    }
    
    const displayWinner = (player) => {
        removeListeners();
        winnerInfoPara.textContent = `Congratulations ${player.getName()}! You Win!`;
        winnerInfoDiv.appendChild(winnerInfoPara);
        bodyElement.appendChild(winnerInfoDiv);
    }

    const displayTie = () => {
        removeListeners();
        winnerInfoPara.textContent = 'It\'s a tie!';
        winnerInfoDiv.appendChild(winnerInfoPara);
        bodyElement.appendChild(winnerInfoDiv);
    }
    
    const clearUI = () => {
        if(winnerInfoPara.textContent){
            winnerInfoPara.textContent = '';
            winnerInfoDiv.removeChild(winnerInfoPara);
            bodyElement.removeChild(winnerInfoDiv);
        }
    }
    
    //displayBoard(gameBoard.getGameBoard());
    //addListeners();
    showForm();
    
    return {addListeners, displayBoard, displaySquare, displayWinner, displayTie, clearUI}
})();

const player1 = Player('Mark', 'X');
const player2 = Player('Joe', 'O');



