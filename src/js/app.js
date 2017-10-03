const cells = document.querySelectorAll('.cell');

const wins = [
  [0,1,2], [3,4,5], [6,7,8],  // horizontal
  [0,3,6], [1,4,7], [2,5,8],  // vertical
  [0,4,8], [2,4,6]            // diagonal
];

let movesMade = 0;

function makeMove() {
  if (!isEmpty(this)) return;

  this.textContent = 'X';
  movesMade++;
  
  if (isGameOver('Player')) return;

  // Allow a little time for DOM to update (and simulate 'thinking')
  setTimeout(() => {
    cpuMove();
    isGameOver('CPU');
  }, 500);
}

function isGameOver(lastPlayer) {
  if (checkForWinner()) {
    gameOver(lastPlayer);
    return true;
  } else if (checkForDraw()) {
    gameOver('Draw');
    return true;
  } else {
    return false;
  }
}

function checkForWinner() {
  const board = buildBoard();
  
  // Check the board against 'wins' array
  let result = false;
  wins.forEach(win => {
    if (threeInARow(board, ...win)) {
      result = true;
    }
  });
  return result;
}

// Build array to represent the board
function buildBoard() {
  const board = [];
  cells.forEach(c => board.push(c.textContent));
  return board;
}

function checkForDraw() {
  return (movesMade >= 9);
}

function isEmpty(cell) {
  return cell.textContent === '';
}

function threeInARow(board, first, second, third) {
  const b = board;
  return (b[first] !== '' && b[first] === b[second] && b[second] === b[third]);
}

function gameOver(winner) {
  // Allow a little time for DOM to update
  setTimeout(() => {
    winner === 'Draw' ? alert(`It's a draw!`) : alert(`${winner} wins!`);
    newGame();
  }, 10);
}

function newGame() {
  movesMade = 0;
  cells.forEach(c => c.textContent = '');
}

cells.forEach(c => c.addEventListener('click', makeMove));