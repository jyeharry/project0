let $squares;
let moves = 0;
const symbols = ['X', 'O'];
let currentPlayer;
let gameOver = false;

$(document).ready(function() {
  $squares = $('td');

  $($squares).on('click', takeTurn);

  $('#new-game').on('click', newGame);

  $('select').change(updateSelect);
});

// resets the game board and variables
const newGame = function() {
  $($squares).html('');
  moves = 0;
  gameOver = false;
  $('#result').addClass('opacity');
}

const updateSelect = function() {
  const value = $(this).val();
  const id = parseInt($(this).attr('id'));
  const nextId = (id + 1) % 2;
  const optionToHide = $(`select option[value=${value}]`);
  $(`#${nextId} option`).show();
  $(optionToHide[nextId]).hide();
  $squares.each(function() {
    if ($(this).html() === symbols[id]) {
        $(this).html(value);
    }
  })
  symbols[id] = value;
}

const takeTurn = function() {
  if ($(this).text() === '' && !gameOver) {
    // whenever moves is even, currentPlayer will be X and whenever moves is odd currentPlayer will be O
    currentPlayer = symbols[moves % 2]
    $(this).text(currentPlayer);
    // check if someone has won, otherwise check if all the squares have been filled then end the game if either condition is met
    if (checkResult()) {
      endGame(true);
    } else if (moves === 8) {
      endGame(false);
    }
    moves++;
  }
}

// ends the game, setting the result text accordingly
const endGame = function(gameWon) {
  const result = gameWon ? currentPlayer + ' wins!' : 'It\'s a draw!';
  $('#result').text(result)
              .removeClass('opacity');
  gameOver = true;
}

const checkResult = function() {
  for (let i = 0; i < 3; i++) {
    if (checkRow(i * 3) || checkColumn(i) || checkDiagonal(i)) {
      return true;
    }
  }
  return false;
}

const checkRow = function(i) {
  // the increment is 1 because the indexes for the rows are 0, 1, 2 and 3, 4, 5 and 6, 7, 8.
  const increment = 1;
  return $($squares[i]).text() !== '' ? compareSquares(i, increment) : false;
}

const checkColumn = function(i) {
  // the increment is 3 because the indexes for the columns are 0, 3, 6 and 1, 4, 7, and 2, 5, 8.
  const increment = 3;
  return $($squares[i]).text() !== '' ? compareSquares(i, increment) : false;
}

const checkDiagonal = function(i) {
  // the indexes for the diagonals are 0, 4, 8 and 2, 4, 6, so we have to change the increment according to the first index of the diagonal we are checking
  const increment = i === 0 ? 4 : 2;
  // this function only needs to get ran twice as there are only two diagonals, unlike checkRow and checkColumn, so we will skip this function when i is equal to 1.
  if (i !== 1) {
    return $($squares[i]).text() !== '' ? compareSquares(i, increment) : false;
  }
}

// returns true if it finds three squares in a line with the same symbol and false otherwise
const compareSquares = function(i, increment) {
  return $($squares[i]).text() === $($squares[i + increment]).text() && $($squares[i]).text() === $($squares[i + 2 * increment]).text();
}
