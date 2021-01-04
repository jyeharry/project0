let $squares;

$(document).ready(function() {
  $squares = $('.game-square');

  $($squares).each(function() {
    $(this).on('click', takeTurn)
  });
});

let clickCounter = 0;
const symbols = ['X', 'O'];


const takeTurn = function() {
  if ($(this).html() === '') {
    $(this).html(symbols[clickCounter % 2]);
    if (clickCounter >= 4 && checkResult) {
      updateResult();
    }
    clickCounter++;
  }
}

const checkResult = function() {
  for (let i = 0; i < 3; i++) {
    if ($($squares[i]).text().length > 0) {
      const rowWin = checkRow(i * 3);
      const colWin = checkColumn(i);
      const diagWin = checkDiagonal(i);
      return rowWin || colWin || diagWin;
    }
  }
}

const updateResult = function() {
  $('#result').text(symbols[clickCounter % 2] + ' wins!');
}

const checkRow = function(i) {
  return $($squares[i]).text() === $($squares[i + 1]).text() && $($squares[i]).text() === $($squares[i + 2]).text();
}

const checkColumn = function(i) {
  return $($squares[i]).text() === $($squares[i + 3]).text() && $($squares[i]).text() === $($squares[i + 6]).text();
}

const checkDiagonal = function(i) {
  // this function only needs to get ran twice as there are only two diagonals, unlike checkRow and checkColumn, so skip the function by returning false when i is equal to 1
  if (i === 1) {
    return false;
  }
  let increment = i % 4 === 0 ? 4 : 2;
  return $($squares[i]).text() === $($squares[i + increment]).text() && $($squares[i]).text() === $($squares[i + 2 * increment]).text();
}
