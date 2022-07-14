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

const displayController = (() => {
  function drawBoard() {
    let gameBoard = document.querySelector(".gameBoard");
    let board = _createBoardDiv();
    let rowIndex = 1;
    for (let row of GameBoard.getBoard()) {
      let rowDiv = _createRowDiv(rowIndex);
      let columnIndex = 1;
      for (let column of row) {
        let columnDiv = _createColumnDiv(columnIndex, rowIndex);
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

  function _createColumnDiv(columnIndex, rowIndex) {
    let columnDiv = document.createElement("div");
    columnDiv.setAttribute("class", `column${columnIndex}`);
    columnDiv.setAttribute("data-row", `${rowIndex}`);
    columnDiv.setAttribute("data-column", `${columnIndex}`);
    return columnDiv;
  }

  function _createMarkerPara(column) {
    let markerText = document.createElement("p");
    markerText.textContent = column;
    return markerText;
  }

  function deleteCurrentBoard() {
    let board = document.querySelector(".board");
    board.parentNode.removeChild(board);
  }

  return { drawBoard: drawBoard, deleteCurrentBoard: deleteCurrentBoard };
})();

const Game = (() => {
  const _playerOne = Player("X");
  const _playerTwo = Player("O");

  function getPlayers() {
    return [_playerOne, _playerTwo];
  }

  function playRound() {}

  return { getPlayers: getPlayers };
})();
