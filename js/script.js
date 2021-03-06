//Routing
var app = angular.module('myApp', ['ngRoute', 'ngAnimate']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: "index.html"
    })
    .when('/todo', {
        templateUrl: "todo.html"
    })
    .when('/examples', {
        templateUrl: "examples.html"
    })  
    .when('/resources', {
        templateUrl: "resources.html"
    })
    .when('/game', {
        templateUrl: "game.html"
    })
    .when('/feedback', {
        templateUrl: "feedback.html"
    })
    .when('/thankyou', {
        templateUrl: "thank_you.html"
    });
});



//todo
app.controller('taskCtrl', function($scope) {
  $scope.tasks = [
    { title: 'Learn AngularJS'},
    { title: 'Finish school project'},
    { title: 'Go to gym'}
  ];

  $scope.addtask = function() {
    $scope.tasks.push($scope.task);
    $scope.task = {};
  };

  $scope.removeItem = function(index) {
    $scope.tasks.splice(index, 1);
  };
  //new code
  $scope.getTotalTodos = function() {
    return $scope.tasks.filter(function (task) {
      return task.done;
    }).length;
  };

  $scope.clearCompleted = function() {
    var completedTasks = $scope.tasks;
    $scope.tasks = [];
    angular.forEach(completedTasks, function(task) {
      if (!task.done) $scope.tasks.push(task);
    })
  };
});

//examples

//Snake game
angular.module('ngSnake', [])

  app.controller('snakeCtrl', function($scope, $timeout, $window) {
    var BOARD_SIZE = 20;

    var DIRECTIONS = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };

    var COLORS = {
      GAME_OVER: '#820303',
      FRUIT: '#0DFF00',
      SNAKE_HEAD: '#9F3D34',
      SNAKE_BODY: '#C54739',
      BOARD: '#f8f8f8'
    };

    var snake = {
      direction: DIRECTIONS.LEFT,
      parts: [{
        x: -1,
        y: -1
      }]
    };

    var fruit = {
      x: -1,
      y: -1
    };

    var interval, tempDirection, isGameOver;

    $scope.score = 0;

    $scope.setStyling = function(col, gameRow) {
      if (isGameOver)  {
        return COLORS.GAME_OVER;
      } else if (fruit.x == gameRow && fruit.y == col) {
        return COLORS.FRUIT;
      } else if (snake.parts[0].x == gameRow && snake.parts[0].y == col) {
        return COLORS.SNAKE_HEAD;
      } else if ($scope.board[col][gameRow] === true) {
        return COLORS.SNAKE_BODY;
      }
      return COLORS.BOARD;
    };

    function update() {
      var newHead = getNewHead();

      if (boardCollision(newHead) || selfCollision(newHead)) {
        return gameOver();
      } else if (fruitCollision(newHead)) {
        eatFruit();
      }

      // Remove tail
      var oldTail = snake.parts.pop();
      $scope.board[oldTail.y][oldTail.x] = false;

      // Pop tail to head
      snake.parts.unshift(newHead);
      $scope.board[newHead.y][newHead.x] = true;

      // Do it again
      snake.direction = tempDirection;
      $timeout(update, interval);
    }

    function getNewHead() {
      var newHead = angular.copy(snake.parts[0]);

      // Update Location
      if (tempDirection === DIRECTIONS.LEFT) {
          newHead.x -= 1;
      } else if (tempDirection === DIRECTIONS.RIGHT) {
          newHead.x += 1;
      } else if (tempDirection === DIRECTIONS.UP) {
          newHead.y -= 1;
      } else if (tempDirection === DIRECTIONS.DOWN) {
          newHead.y += 1;
      }
      return newHead;
    }

    function boardCollision(part) {
      return part.x === BOARD_SIZE || part.x === -1 || part.y === BOARD_SIZE || part.y === -1;
    }

    function selfCollision(part) {
      return $scope.board[part.y][part.x] === true;
    }

    function fruitCollision(part) {
      return part.x === fruit.x && part.y === fruit.y;
    }

    function resetFruit() {
      var x = Math.floor(Math.random() * BOARD_SIZE);
      var y = Math.floor(Math.random() * BOARD_SIZE);

      if ($scope.board[y][x] === true) {
        return resetFruit();
      }
      fruit = {x: x, y: y};
    }

    function eatFruit() {
      $scope.score++;
      
      // Grow by 1
      var tail = angular.copy(snake.parts[snake.parts.length-1]);
      snake.parts.push(tail);
      resetFruit();

      if ($scope.score % 5 === 0) {
        interval -= 15;
      }
    }

    function gameOver() {
      isGameOver = true;

      $timeout(function() {
        isGameOver = false;
      },500);

      setupBoard();
    }

    function setupBoard() {
      $scope.board = [];
      for (var i = 0; i < BOARD_SIZE; i++) {
        $scope.board[i] = [];
        for (var j = 0; j < BOARD_SIZE; j++) {
          $scope.board[i][j] = false;
        }
      }
    }
    setupBoard();

    $window.addEventListener("keyup", function(e) {
      if (e.keyCode == DIRECTIONS.LEFT && snake.direction !== DIRECTIONS.RIGHT) {
        tempDirection = DIRECTIONS.LEFT;
      } else if (e.keyCode == DIRECTIONS.UP && snake.direction !== DIRECTIONS.DOWN) {
        tempDirection = DIRECTIONS.UP;
      } else if (e.keyCode == DIRECTIONS.RIGHT && snake.direction !== DIRECTIONS.LEFT) {
        tempDirection = DIRECTIONS.RIGHT;
      } else if (e.keyCode == DIRECTIONS.DOWN && snake.direction !== DIRECTIONS.UP) {
        tempDirection = DIRECTIONS.DOWN;
      }
    });

    $scope.startGame = function() {
      $scope.score = 0;
      snake = {direction: DIRECTIONS.LEFT, parts: []};
      tempDirection = DIRECTIONS.LEFT;
      isGameOver = false;
      interval = 150;

      // Set up initial snake
      for (var i = 0; i < 5; i++) {
        snake.parts.push({x: 10 + i, y: 10});
      }
      resetFruit();
      update();
    };

  });

  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
