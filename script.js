const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const restartButton = document.getElementById('restart');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
const crossButton = document.getElementById('cross');
const circleButton = document.getElementById('circle');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let playerChoice = null;

crossButton.addEventListener('click', () => {
    playerChoice = "X";
    currentPlayer = "X";
    crossButton.disabled = true;
    circleButton.disabled = true;
    result.textContent = "Your Turn";
});

circleButton.addEventListener('click', () => {
    playerChoice = "O";
    currentPlayer = "O";
    crossButton.disabled = true;
    circleButton.disabled = true;
    result.textContent = "Your Turn";
});

function handleCellClick(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].style.pointerEvents = "none";

        if (checkWin()) {
            if (currentPlayer === playerChoice) {
                result.textContent = "You Win!";
                playerScore.textContent = parseInt(playerScore.textContent) + 1;
            } else {
                result.textContent = "Computer Wins!";
                computerScore.textContent = parseInt(computerScore.textContent) + 1;
            }
            gameActive = false;
        } else if (checkDraw()) {
            result.textContent = "It's a Draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (currentPlayer !== playerChoice) {
                setTimeout(() => {
                    computerMove();
                }, 500);
            } else {
                result.textContent = "Your Turn";
            }
        }
    }
}

function computerMove() {
    let bestMove = findBestMove();
    board[bestMove] = currentPlayer;
    cells[bestMove].textContent = currentPlayer;
    cells[bestMove].style.pointerEvents = "none";
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    result.textContent = "Your Turn";
}

function findBestMove() {
    // Implement a basic AI to choose a move
    // You can use Minimax or other algorithms for a more advanced AI
    let availableMoves = board.map((cell, index) => cell === "" ? index : null).filter(move => move !== null);
    if (availableMoves.length > 0) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else {
        return null;
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        let [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== "");
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.pointerEvents = "auto";
    });
    result.textContent = "Start game or select player";
    crossButton.disabled = false;
    circleButton.disabled = false;
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        handleCellClick(parseInt(cell.dataset.index));
    });
});

restartButton.addEventListener('click', restartGame);