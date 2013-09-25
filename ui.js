(function (root) {
  var Game = root.Game = (root.Game || {});
  var intervalID;

  var SnakeUI = Game.SnakeUI = function(size){
    this.size = size;
    this.board = new Game.Board(size);
    this.count = 0;
    this.score = 0;
    this.pressed = false
  }

  SnakeUI.prototype.start = function() {
    var that = this;

    this.draw();
    this.render();
    intervalID = null;
    $(document).keydown(function(e) {
      console.log(e.which)
      if (e.which === 80) {
        if (intervalID === null) {
          that.startStep();
        } else {
          clearInterval(intervalID);
          intervalID = null;
          that.render();
        }
      }
      if (!that.pressed) {
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
        that.pressed = true;
      }
    });

    this.startStep();
  }

  SnakeUI.prototype.startStep = function() {
    var that = this;
    intervalID = window.setInterval(function() {
      that.step();
    }, 300);
  }

  SnakeUI.prototype.step = function() {
    this.pressed = false
    this.count += 1
    this.board.snake.move();


    var apple_index = this.board.appleCollision()
    if (apple_index !== "none") {
      this.board.removeApple(apple_index);
      this.score += 10
    } else {
      this.board.snake.shrink();
    }


    if(this.board.hasLost()){
      clearInterval(intervalID);
      alert("u lose");
    } else if (this.board.getOpenCells().length === 0) {
      clearInterval(intervalID);
      alert("u win!");
    }


    if(this.count % 6 === 0) {
      this.board.addApple();
    }

    this.render();
  }

  SnakeUI.prototype.render = function() {
    this.clearSnakeUI()
    this.board.snake.segments.forEach(function(segment) {
      $('#' + segment[0] + "_" + segment[1]).addClass('snake')
    });

    this.board.apples.forEach(function(apple) {
      $('#' + apple[0] + "_" + apple[1]).addClass('apple')
    });

    $('#time').html(this.count)
    $('#score').html(this.score)
    if (intervalID === null) {
      $('#paused').html("PAUSED!!!")
    } else {
      $('#paused').html("")
    }
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
        $cell.attr('id', r.toString() + "_" + c.toString());
        $row.append($cell);
      }
    }
  }

})(this);