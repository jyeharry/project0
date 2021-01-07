let $squares;
let moves = 0;
const players = [
  {
    token: 'X',
    wins: 0,
    playerNum: 1
  }, {
    token: 'O',
    wins: 0,
    playerNum: 2
  }
];
let gameOver = false;

$(document).ready(function() {
  $squares = $('td');

  $($squares).on('click', takeTurn);

  $('#new-game').on('click', newGame);

  $('select').change(updateSelectMenu);
});

// resets the game board and variables
const newGame = function() {
  $($squares).html('');
  moves = 0;
  gameOver = false;
  $('#result').addClass('opacity');
}

// removes each select menus selected option from the other menu, to avoid players being able to choose the same token
const updateSelectMenu = function() {
  const newToken = $(this).val(); // the selected option
  const id = parseInt($(this).attr('id')); // each select menus id corresponds with its players index in the players array
  const nextId = (id + 1) % 2; // using modulus allows us to get the nextId as 0 when the current id is 1, a slightly quicker option than using an if statement or ternary
  const optionToHide = $(`select option[value=${newToken}]`); // gets an array of two of the same option, one from each menu
  $(`#${nextId} option`).show(); // show all options in the nextId menu that are already hidden
  $(optionToHide[nextId]).hide();
  $squares.each(function() { // this allows the tokens to be changed midgame
    if ($(this).html() === players[id].token) {
        $(this).html(newToken);
    }
  })
  players[id].token = newToken;
}

const takeTurn = function() {
  if ($(this).text() === '' && !gameOver) {
    const index = moves % 2; // whenever moves is even, index will be 0 and whenever moves is odd, index will be 1
    const token = players[index].token;
    $(this).text(token); // update the clicked square with the current players token
    if (checkForWin()) { // check if someone has won, otherwise if moves === 8, all the squares have been filled so end the game if either condition is met
      displayResult(token, true);
      updateWins(index);
    } else if (moves === 8) {
      displayResult(false);
    }
    moves++;
  }
}

const checkForWin = function() {
  for (let i = 0; i < 3; i++) {
    // if (checkRow(i * 3) || checkColumn(i) || checkDiagonal(i)) {
    //   return true;
    // }
    if (checkGrid(i)) {
      return true;
    }
  }
  return false;
}

// updates the result h2 with either win or draw and ends the game
const displayResult = function(player, hasWon) {
  const result = hasWon ? player + ' wins!' : 'It\'s a draw!';
  $('#result').text(result)
              .removeClass('opacity');
  gameOver = true;
}

// updates each players wins and displays it on the webpage
const updateWins = function(index) {
  players[index].wins++;
  const player = players[index];
  $(`#player${player.playerNum} span`).text(player.wins); // updates the players wins text on the screen
}

// checks the grid for three consecutive squares with the same token
const checkGrid = function(index) {
  const rowIndex = index * 3; // the starting indexes for the rows are 0, 3 and 6 so index must be multiplied by 3 to get the starting index for each row

  const rowIncrement = 1;
  const colIncrement = 3;
  const diagIncrement = index === 0 ? 4 : 2; // the indexes for the diagonals are 0, 4, 8 and 2, 4, 6, so we have to change the increment according to the first index of the diagonal we are checking
  // run compareSquares to see if we find three matching squares in a line using an starting index and increment
  const rowWin = compareSquares(rowIndex, rowIncrement);
  const colWin = compareSquares(index, colIncrement);
  let diagWin = false;
  if (index !== 1) { // there are only two diagonals to check and the square at index 1 is not in one of those diagonals, so skip this check when index === 1
    diagWin = compareSquares(index, diagIncrement);
  }
  return rowWin || colWin || diagWin;
}

// returns true if it finds three squares in a line with the same token and false otherwise
const compareSquares = function(i, increment) {
  // if ($($squares[i]).text() !== '') { // only compare the squares if we dont immediately find a blank square to begin with
    return $($squares[i]).text() !== '' && $($squares[i]).text() === $($squares[i + increment]).text() && $($squares[i]).text() === $($squares[i + 2 * increment]).text();
  // }
  // return false;
}

// const checkDiagonal = function(i) {
//   // the indexes for the diagonals are 0, 4, 8 and 2, 4, 6, so we have to change the increment according to the first index of the diagonal we are checking
//   const increment = i === 0 ? 4 : 2;
//   // this function only needs to get ran twice as there are only two diagonals, unlike checkRow and checkColumn, so we will skip this function when i is equal to 1.
//   if (i !== 1) {
//     return $($squares[i]).text() !== '' ? compareSquares(i, increment) : false;
//   }
// }
//
// const checkRow = function(i) {
//   // the increment is 1 because the indexes for the rows are 0, 1, 2 and 3, 4, 5 and 6, 7, 8.
//   const increment = 1;
//   return $($squares[i]).text() !== '' ? compareSquares(i, increment) : false;
// }
//
// const checkColumn = function(i) {
//   // the increment is 3 because the indexes for the columns are 0, 3, 6 and 1, 4, 7, and 2, 5, 8.
//   const increment = 3;
//   return $($squares[i]).text() !== '' ? compareSquares(i, increment) : false;
// }
