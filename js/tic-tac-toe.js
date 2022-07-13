const GameBoard = (() => {
  const board = {};
  const row = { column1: "", column2: "", column3: "" };
  board.row1 = Object.assign({}, row);
  board.row2 = Object.assign({}, row);
  board.row3 = Object.assign({}, row);

  function getBoard() {
    return board;
  }

  function selectSquare(row, column, marker) {
    board[row][column] = marker;
  }

  function undoPreviousSelection(row, column) {
    board[row][column] = "";
  }

  return {
    getBoard: getBoard,
    selectSquare: selectSquare,
    undoPreviousSelection: undoPreviousSelection,
  };
})();
