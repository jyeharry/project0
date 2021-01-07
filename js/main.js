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
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let gameOver = false;

$(document).ready(function() {
  $squares = $('td');

  $($squares).on('click', takeTurn);

  $('#new-game').on('click', newGame);

  $('#reset').on('click', resetScores);

  $('select').change(updateSelectMenu);
});

// resets the game board and variables
const newGame = function() {
  $($squares).html('');
  moves = 0;
  gameOver = false;
  $('#result').addClass('opacity');
}

const resetScores = function() {
  $('.wins span').text('0');
  players[0].wins = 0;
  players[1].wins = 0;
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

// executed whenever a square is clicked
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
  for (let i = 0; i < winningCombos.length; i++) {
    if (matchingSquares(winningCombos[i][0], winningCombos[i][1], winningCombos[i][2])) {
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

// returns true if the three squares have the same token and false otherwise. has a check to avoid returning true if all three squares are blank
const matchingSquares = function(i, j, k) {
  return $($squares[i]).text() !== '' && $($squares[i]).text() === $($squares[j]).text() && $($squares[i]).text() === $($squares[k]).text();
}
