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
