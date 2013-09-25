(function (root) {
  var Game = root.Game = (root.Game || {});

  var Board = Game.Board = function(size){
    this.size = size;
    this.snake = new Game.Snake(this.size);
    this.apples = [];
  }


  Board.prototype.hasLost = function() {
    var lost = false;
    var snake = this.snake.segments;
    var snake_head = snake[snake.length-1];
    var snake_body = snake.slice(0, snake.length - 1);

    snake_body.forEach(function(seg) {
      if (seg.join("") === snake_head.join("")) {
        lost = true;
      }
    });

    if (!(0 <= snake_head[0] && snake_head[0] < this.size && 0 <= snake_head[1] && snake_head[1] < this.size)) {
      lost = true
    }

    return lost
  }

  Board.prototype.appleCollision = function() {
    var snake = this.snake.segments;
    var snake_head = snake[snake.length-1].toString();

    var found_apple_index = "none";

    this.apples.forEach(function(apple, index, array) {
      if (snake_head === apple.toString()) {
        found_apple_index = index;
        console.log("found an apple!");
      }
    });

    return found_apple_index;
  }

  Board.prototype.removeApple = function(i) {
    this.apples.splice(i, 1)
  }

  Board.prototype.addApple = function() {
    var open = this.getOpenCells();
    this.apples.push(open[Math.floor(Math.random()*view.board.getOpenCells().length)]);
  }

  Board.prototype.getOpenCells = function() {
    var open = [];
    var filled = this.snake.segments.concat(this.apples).join(" ");

    for(var r = 0; r < this.size; r++) {
      for(var c = 0; c < this.size; c++) {
        if(filled.indexOf(" " + r.toString() + "," + c.toString() + " ") === -1) {
          open.push([r, c]);
        }
      }
    }

    return open;
  }

  var rand = function(num) {
    return Math.floor(Math.random() * num)
  }

})(this);