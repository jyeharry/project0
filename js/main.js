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
  $($squares).each(function() {
    $(this).off('click');
  });
}

const checkRow = function(i) {
  if ($($squares[i]).text() !== '') {
    return $($squares[i]).text() === $($squares[i + 1]).text() && $($squares[i]).text() === $($squares[i + 2]).text();
  }
  return false;
}

const checkColumn = function(i) {
  if ($($squares[i]).text() !== '') {
    return $($squares[i]).text() === $($squares[i + 3]).text() && $($squares[i]).text() === $($squares[i + 6]).text();
  }
  return false;
}

const checkDiagonal = function(i) {
  // this function only needs to get ran twice as there are only two diagonals, unlike checkRow and checkColumn, so we will skip this function when i is equal to 1
  if (i !== 1) {
    // the indexes for the diagonals are 0, 4, 8 and 2, 4, 6, so we have to change the increment according to the diagonal we are checking
    let increment = i === 0 ? 4 : 2;
    if ($($squares[i]).text() !== '') {
      return $($squares[i]).text() === $($squares[i + increment]).text() && $($squares[i]).text() === $($squares[i + 2 * increment]).text();
    }
    return false;
  }
}
