const GameBoard = (() => {
  const board = [];
  const row = ["", "", ""];
  board[0] = Object.assign([], row);
  board[1] = Object.assign([], row);
  board[2] = Object.assign([], row);

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

const Player = (marker) => {
  const playerMarker = marker;

  const getMarker = () => {
    return playerMarker;
  };

  return { getMarker };
};
