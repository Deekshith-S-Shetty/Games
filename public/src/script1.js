let board = ['', '', '', '', '', '', '', '', ''];
let player = 'X';
const squares = document.querySelectorAll('.square');

// Add a click event listener to each square
squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    if (board[index] !== '') {
      return;
    }
    board[index] = player;
    square.textContent = player;
    setTimeout(() => {
      if (checkWin()) {
        alert(`${player} has won the game!`);
        resetBoard();
        return;
      }
    }, 100);
    
    setTimeout(() => {
      player = player === 'X' ? 'O' : 'X';
    }, 200);
    
  });
});

// Check if a player has won the game
function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] === board[b] && board[a] === board[c] && board[a] !== '') {
      return true;
    }
  }
  return false;
}

// Reset the board for a new game
function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  squares.forEach((square) => (square.textContent = ''));
  player = 'X';
}
