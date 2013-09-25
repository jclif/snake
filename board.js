(function (root) {
  var Game = root.Game = (root.Game || {});

  var Board = Game.Board = function(size){
    this.size = size;
    //this.board = getBoard(this.size);
    this.snake = new Game.Snake(this.size);
    this.apples = [];
  }

  // var getBoard = function(size) {
  //   board = [];
  //   for(var i = 0; i < size; i++) {
  //     board[i] = [];
  //     for(var j = 0; j < size; j++) {
  //       board[i][j] = '.';
  //     }
  //   }
  //
  //   return board;
  // }

})(this);