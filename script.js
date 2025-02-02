const Game = (function () {
  function domCache() {
    const container = document.querySelector(".container");
    const playerOneInfo = document.getElementById("player1");
    const playerTwoInfo = document.getElementById("player2");
    const result = document.getElementById("result");
    const restartBtn = document.getElementById("restart");
    return {
      container,
      playerOneInfo,
      playerTwoInfo,
      result,
      restartBtn,
    };
  }
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
        gameboard[0][2] !== ""
      ) {
        return true;
      }
      return false;
    }
    if (checkRow() || checkColumn() || checkDiagnoly()) {
      domCache().result.innerHTML = `${activePlayer.name} wins`;
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
      domCache().result.innerText = "Its a tie";
      console.log("Its a tie");
      gameOver = true;
    }
  }

  function render() {
    let table = `
     <table>
      <tr>
        <td data-row="0" data-col="0">${gameboard[0][0]}</td>
        <td data-row="0" data-col="1">${gameboard[0][1]}</td>
        <td data-row="0" data-col="2">${gameboard[0][2]}</td>
      </tr>
      <tr>
        <td data-row="1" data-col="0">${gameboard[1][0]}</td>
        <td data-row="1" data-col="1">${gameboard[1][1]}</td>
        <td data-row="1" data-col="2">${gameboard[1][2]}</td>
      </tr>
      <tr>
        <td data-row="2" data-col="0">${gameboard[2][0]}</td>
        <td data-row="2" data-col="1">${gameboard[2][1]}</td>
        <td data-row="2" data-col="2">${gameboard[2][2]}</td>
      </tr>
    </table>

        `;
    return table;
  }

  function addEventListener() {
    const cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.addEventListener("click", function () {
        const row = parseInt(cell.getAttribute("data-row"));
        const col = parseInt(cell.getAttribute("data-col"));
        addMarker(row, col); // Call addMarker when a cell is clicked
      });
    });
  }

  function updateDisplay() {
    const container = document.querySelector(".container");
    container.innerHTML = render();

    addEventListener();
  }
  function restartGame() {
    domCache().restartBtn.addEventListener("click", () => {
      gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      domCache().container.innerHTML = render();
      activePlayer = player[0];
      domCache().result.innerText = "";
      console.log("clicked");
      init();
    });
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
    updateDisplay();

    if (!gameOver) {
      switchPlayer();
    }
  }

  function init() {
    const container = document.querySelector(".container");
    container.innerHTML = render();
    addEventListener();
    const { playerOneInfo, playerTwoInfo } = domCache();
    playerOneInfo.innerHTML = `Name: ${player[0].name} Marker ${player[0].marker}`;
    playerTwoInfo.innerHTML = `Name: ${player[1].name} Marker ${player[1].marker}`;
    restartGame();
  }

  init();
})();
