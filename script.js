const Game = (function () {
  let gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const player = [
    {
      name: "playerOne",
      marker: "O",
    },
    {
      name: "playerTwo",
      marker: "X",
    },
  ];
  let activePlayer = player[0];
  let gameOver = false;
  const switchPlayer = () => {
    if (!gameOver) {
      activePlayer = activePlayer === player[0] ? player[1] : player[0];
    }
  };

  function checkWinner() {
    function checkRow() {
      for (let i = 0; i < 3; i++) {
        if (
          gameboard[i][0] === gameboard[i][1] &&
          gameboard[i][1] === gameboard[i][2] &&
          gameboard[i][0] !== ""
        ) {
          return true;
        }
      }
      return false;
    }
    function checkColumn() {
      for (let j = 0; j < 3; j++) {
        if (
          gameboard[0][j] === gameboard[1][j] &&
          gameboard[1][j] === gameboard[2][j] &&
          gameboard[0][j] !== ""
        ) {
          return true;
        }
      }
      return false;
    }
    function checkDiagnoly() {
      if (
        gameboard[0][0] === gameboard[1][1] &&
        gameboard[1][1] === gameboard[2][2] &&
        gameboard[0][0] !== ""
      ) {
        return true;
      }
      if (
        gameboard[0][2] === gameboard[1][1] &&
        gameboard[1][1] === gameboard[2][0] &&
        gameboard[0][0] !== ""
      ) {
        return true;
      }
      return false;
    }
    if (checkRow() || checkColumn() || checkDiagnoly()) {
      console.log(`${activePlayer.name} wins`);
      gameOver = true;
      return true;
    }

    return false;
  }
  function checkTie() {
    let isFull = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameboard[i][j] === "") {
          isFull = false;
        }
      }
    }
    if (isFull && !checkWinner()) {
      console.log("Its a tie");
      gameOver = true;
    }
  }
  function addMarker(row, column) {
    if (gameOver) {
      console.log("Game Over No more Moves allowed");
    }
    if (gameboard[row][column] !== "" || gameOver) {
      console.log("invalid move");
      return;
    }

    gameboard[row][column] = activePlayer.marker;
    console.log(
      `Move made by ${activePlayer.name}: ${activePlayer.marker} at (${row}, ${column})`
    );
    checkWinner();
    checkTie();
    if (!gameOver) {
      switchPlayer();
    }
  }
})();
