const Game = (() => {
  const GameBoard = (() => {
    const _board = _createBoardArray();

    function _createBoardArray() {
      const _board = [];
      const _row = ["", "", ""];
      _board[0] = Object.assign([], _row);
      _board[1] = Object.assign([], _row);
      _board[2] = Object.assign([], _row);
      return _board;
    }

    function getBoard() {
      return _board;
    }

    function selectSquare(marker, row, column) {
      _board[row][column] = marker;
    }

    function undoPreviousSelection(row, column) {
      _board[row][column] = "";
    }

    function _getThreeInARows() {
      let threeInARows = [];
      for (let i = 0; i < _board.length; i++) {
        threeInARows.push(_board[i]);
      }
      let col0 = [_board[0][0], _board[1][0], _board[2][0]];
      let col1 = [_board[0][1], _board[1][1], _board[2][1]];
      let col2 = [_board[0][2], _board[1][2], _board[2][2]];
      let diag0 = [_board[0][0], _board[1][1], _board[2][2]];
      let diag1 = [_board[0][2], _board[1][1], _board[2][0]];
      threeInARows.push(col0, col1, col2, diag0, diag1);

      return threeInARows;
    }

    function checkForWinner(marker) {
      let winningArray = _getThreeInARows().filter((row) =>
        row.every((square) => square === marker)
      );
      return winningArray.length;
    }

    return {
      getBoard: getBoard,
      selectSquare: selectSquare,
      undoPreviousSelection: undoPreviousSelection,
      checkForWinner: checkForWinner,
    };
  })();

  const Player = (marker) => {
    const _playerMarker = marker;

    const getMarker = () => {
      return _playerMarker;
    };

    return { getMarker };
  };

  const _playerOne = Player("X");
  const _playerTwo = Player("O");

  function _getPlayers() {
    return [_playerOne.getMarker(), _playerTwo.getMarker()];
  }

  let totalTurns = 0;

  function getCurrentPlayer() {
    let currentPlayer = _getPlayers()[totalTurns++ % 2];
    return currentPlayer;
  }

  function fullBoard() {
    let isFull = totalTurns === 9 ? true : false;
    return isFull;
  }

  return {
    getCurrentPlayer: getCurrentPlayer,
    getBoard: GameBoard.getBoard,
    selectSquare: GameBoard.selectSquare,
    checkForWinner: GameBoard.checkForWinner,
    fullBoard: fullBoard,
  };
})();

const displayController = (() => {
  function drawBoard() {
    let gameBoard = document.querySelector(".gameBoard");
    let board = _createBoardDiv();
    let rowIndex = 0;
    for (let row of Game.getBoard()) {
      let rowDiv = _createRowDiv(rowIndex);
      let columnIndex = 0;
      for (let column of row) {
        let columnDiv = _createColumnDiv(columnIndex, rowIndex, column);
        let markerText = _createMarkerPara(column);
        columnDiv.appendChild(markerText);
        rowDiv.appendChild(columnDiv);
        columnIndex++;
      }
      board.appendChild(rowDiv);
      rowIndex++;
    }
    gameBoard.appendChild(board);
  }

  function _createBoardDiv() {
    let board = document.createElement("div");
    board.setAttribute("class", "board");
    return board;
  }

  function _createRowDiv(rowIndex) {
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", `row${rowIndex}`);
    return rowDiv;
  }

  function _createColumnDiv(columnIndex, rowIndex, column) {
    let columnDiv = document.createElement("div");
    columnDiv.setAttribute("class", `column${columnIndex}`);
    columnDiv.setAttribute("data-row", `${rowIndex}`);
    columnDiv.setAttribute("data-column", `${columnIndex}`);
    if (column === "") {
      columnDiv.addEventListener("click", _addMarker), false;
    }
    return columnDiv;
  }

  function _addMarker(e) {
    let marker = Game.getCurrentPlayer();
    let row = e.target.getAttribute("data-row");
    let column = e.target.getAttribute("data-column");
    Game.selectSquare(marker, row, column);
    displayController.deleteCurrentBoard();
    displayController.drawBoard();
    let gameWon = Game.checkForWinner(marker);
    let isFull = Game.fullBoard();
    if (gameWon === 1) {
      _openWinnerPopup(marker);
    }

    if (gameWon === 0 && isFull) {
      _openWinnerPopup("Tie");
    }
  }

  function _createMarkerPara(column) {
    let markerPara = document.createElement("p");
    markerPara.textContent = column;
    return markerPara;
  }

  function _openWinnerPopup(marker) {
    let popup = _displayWinnerPopup();
    let winnerPara = _createWinnerPara(marker);
    popup.appendChild(winnerPara);
    popup.addEventListener("click", _closeWinnerPopup), false;
  }

  function _displayWinnerPopup() {
    let popup = document.getElementById("winnerPopup");
    popup.style.display = "block";
    return popup;
  }

  function _createWinnerPara(marker) {
    let winnerPara = document.createElement("p");
    winnerPara.setAttribute("class", "winnerPara");
    if (marker === "Tie") {
      winnerPara.textContent = "Tie game!";
    } else {
      winnerPara.textContent = `${marker} wins!`;
    }
    return winnerPara;
  }

  function _closeWinnerPopup() {
    document.getElementById("winnerPopup").style.display = "none";
  }

  function deleteCurrentBoard() {
    let board = document.querySelector(".board");
    board.parentNode.removeChild(board);
  }

  return { drawBoard: drawBoard, deleteCurrentBoard: deleteCurrentBoard };
})();

displayController.drawBoard();
