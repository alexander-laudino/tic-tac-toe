const GameBoard = (() => {
  const _board = [];
  const _row = ["X", "X", "X"];
  _board[0] = Object.assign([], _row);
  _board[1] = Object.assign([], _row);
  _board[2] = Object.assign([], _row);

  function getBoard() {
    return _board;
  }

  function selectSquare(marker, row, column) {
    _board[row][column] = marker;
  }

  function undoPreviousSelection(row, column) {
    _board[row][column] = "";
  }

  return {
    getBoard: getBoard,
    selectSquare: selectSquare,
    undoPreviousSelection: undoPreviousSelection,
  };
})();

const Player = (marker) => {
  const _playerMarker = marker;

  const getMarker = () => {
    return _playerMarker;
  };

  return { getMarker };
};

const Game = (() => {
  const _playerOne = Player("X");
  const _playerTwo = Player("O");

  function getPlayers() {
    return [_playerOne, _playerTwo];
  }

  return { getPlayers: getPlayers };
})();

const displayController = (() => {
  function drawBoard() {
    let board = document.createElement("div");
    board.setAttribute("class", "board");
    let gameBoard = document.querySelector(".gameBoard");
    let rowIndex = 1;
    for (let row of GameBoard.getBoard()) {
      let rowDiv = document.createElement("div");
      rowDiv.setAttribute("class", "row");
      rowDiv.setAttribute("id", `row${rowIndex}`);
      let columnIndex = 1;
      for (let column of row) {
        let columnDiv = document.createElement("div");
        columnDiv.setAttribute("class", `column${columnIndex}`);
        columnDiv.setAttribute("id", `row${rowIndex}-column${columnIndex}`);
        let markerText = document.createElement("p");
        markerText.textContent = column;
        columnDiv.appendChild(markerText);
        rowDiv.appendChild(columnDiv);
        columnIndex++;
      }
      board.appendChild(rowDiv);
      rowIndex++;
    }
    gameBoard.appendChild(board);
  }

  function deleteCurrentBoard() {
    let board = document.querySelector(".board");
    board.parentNode.removeChild(board);
  }

  return { drawBoard: drawBoard, deleteCurrentBoard: deleteCurrentBoard };
})();
