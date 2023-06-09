/*Déclaration de variables pour les éléments HTML */
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const playerOneScoreDisplay = document.getElementById('playerOne');
const playerTwoScoreDisplay = document.getElementById('playerTwo');
const winDisplay = document.querySelector('.win-display');
const replayButton = document.getElementById('replay');
/*currentPlayer pour suivre le joueur actuel (X ou O)*/
let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let playerOneScore = 0;
let playerTwoScore = 0;
/*winConditions est défini pour stocker toutes les combinaisons gagnantes possibles*/
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
/*handleCellClick est utilisé a chaque fois qu'un joueur clique*/
function handleCellClick(clickedCell, clickedCellIndex) {
  gameBoard[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(`player${currentPlayer}`);
  let gameWon = checkWinConditions();
  if (gameWon) {
    endGame();
  } else if (isDraw()) {
    draw();
  } else {
    togglePlayer();
  }
}
/*Pour les combinaisons gagnante*/
function checkWinConditions() {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      gameBoard[a] !== '' &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      return true;
    }
  }
  return false;
}
/* pour match nul */
function isDraw() {
  return gameBoard.every(cell => cell !== '');
}
/*mettre a jour l'affichage si gagnant*/
function endGame() {
  gameActive = false;
  winDisplay.textContent = `Joueur ${currentPlayer} a gagné !`;
  winDisplay.classList.add(`player${currentPlayer}`);
  if (currentPlayer === 'X') {
    playerOneScore++;
    playerOneScoreDisplay.textContent = playerOneScore;
  } else {
    playerTwoScore++;
    playerTwoScoreDisplay.textContent = playerTwoScore;
  }
}


function draw() {
  gameActive = false;
  winDisplay.textContent = "Match nul !";
}
/*affichage mis a jour pour le tour suivant*/
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerDisplay.textContent = `Joueur ${currentPlayer}`;
}

function handleReplayButtonClick() {
  gameActive = true;
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  winDisplay.textContent = '';
  winDisplay.classList.remove('playerX');
  winDisplay.classList.remove('playerO');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('playerX');
    cell.classList.remove('playerO');
  });
  currentPlayerDisplay.textContent = `Joueur ${currentPlayer}`;
  playerOneScoreDisplay.textContent = playerOneScore;
  playerTwoScoreDisplay.textContent = playerTwoScore; 
  window.alert("Y'a pas de panneau!");
}
 /*si joueur clique sur une cellule, la fonction handleCellClick est appelée pour gérer le clic.*/
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (gameBoard[index] === '' && gameActive) {
      handleCellClick(cell, index);
    }
  });
});
/*redemarrage du jeu*/
replayButton.addEventListener('click', handleReplayButtonClick);
// window.alert("T'es Nul Flanders")
//  {
//   window.alert ("Bienvenue sur le Morbak");
// };

