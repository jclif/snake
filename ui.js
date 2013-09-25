(function (root) {
  var Game = root.Game = (root.Game || {});
  var intervalID;

  var SnakeUI = Game.SnakeUI = function(size){
    this.size = size;
    this.board = new Game.Board(size);
  }

  SnakeUI.prototype.start = function() {
    var that = this;

    this.draw();
    this.render();
    $(document).keydown(function(e) {
      switch(e.which) {
      case 37:
        that.board.snake.turn("W");
        break;
      case 38:
        that.board.snake.turn("N");
        break;
      case 39:
        that.board.snake.turn("E");
        break;
      case 40:
        that.board.snake.turn("S");
        break;
      }
    });

    intervalID = window.setInterval(function() {
      that.step();
    }, 500);
  }

  SnakeUI.prototype.step = function() {
    this.board.snake.move();
    this.render();
  }

  SnakeUI.prototype.render = function() {
    this.clearSnakeUI()
    this.board.snake.segments.forEach(function(segment) {
      $('#' + segment[0] + segment[1]).addClass('snake')
    });

    this.board.apples.forEach(function(apple) {
      $('#' + apple[0] + apple[1]).addClass('apple')
    });
  }

  SnakeUI.prototype.clearSnakeUI = function() {
    $('.snake').removeClass('snake');
    $('.apple').removeClass('apple');
  }

  SnakeUI.prototype.draw = function() {
    var $gameWrapper = $('<div class="game-wrapper"></div>');
    $('body').append($gameWrapper);
    for(var r = 0; r < this.size; r++) {
      var $row = $('<div class="row"></div>');
      $gameWrapper.append($row);
      for(var c = 0; c < this.size; c++) {
        var $cell = $('<div class="cell"></div>');
        $cell.attr('id', r.toString() + c.toString());
        $row.append($cell);
      }
    }
  }

})(this);