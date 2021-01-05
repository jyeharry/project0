let $squares;

$(document).ready(function() {
  $squares = $('td');

  $($squares).each(function() {
    $(this).on('click', takeTurn);
  });

  $('#new-game').on('click', newGame);
});

let clickCounter = 0;
const symbols = ['X', 'O'];
let gameOver = false;

const newGame = function() {
  $($squares).each(function() {
    $(this).html('');
  });
  clickCounter = 0;
  gameOver = false;
}

const takeTurn = function() {
  if ($(this).text() === '' && !gameOver) {
    $(this).text(symbols[clickCounter % 2]);
    if (checkResult()) {
      endGame(true);
    } else if (clickCounter === 8) {
      endGame(false);
    }
    clickCounter++;
  }
}

const checkResult = function() {
  for (let i = 0; i < 3; i++) {
    if (checkRow(i * 3) || checkColumn(i) || checkDiagonal(i)) {
      return true;
    }
  }
  return false;
}

const endGame = function(win) {
  const result = win ? symbols[clickCounter % 2] + ' wins!' : 'It\'s a draw!';
  $('#result').text(result);
  gameOver = true;
}

const compareSquares = function(i, increment) {
  return $($squares[i]).text() === $($squares[i + increment]).text() && $($squares[i]).text() === $($squares[i + 2 * increment]).text();
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
  // this function only needs to get ran twice as there are only two diagonals, unlike checkRow and checkColumn, so we will skip this function when i is equal to 1.
  // the indexes for the diagonals are 0, 4, 8 and 2, 4, 6, so we have to change the increment according to the first index of the diagonal we are checking
  const increment = i === 0 ? 4 : 2;
  if (i !== 1) {
    return $($squares[i]).text() !== '' ? compareSquares(i, increment) : false;
  }
}
