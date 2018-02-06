var GAME_BOARD = {
	WIDTH: 8,
	HEIGHT: 8
}

var DIRECTION = {
	NONE: 0,
	UP: 1,
	DOWN: 2,
	LEFT: 3,
	RIGHT: 4
}

var ICON = {
	EMPTY: "[ ]",
	SNAKE: "[X]",
	FOOD: "[O]"
};

var game;

var initGame = function (canvasId) {
	var args = { mainBox: document.getElementById("main") };
	var game = new Game(args);
	game.init();
	return game;
}
	
var handleKey = function() {
	document.addEventListener("keydown", function (event) {
		var keyName = event.key;
		var directionInput = {
			"ArrowUp": DIRECTION.UP,
			"ArrowDown": DIRECTION.DOWN,
			"ArrowLeft": DIRECTION.LEFT,
			"ArrowRight": DIRECTION.RIGHT
		};
		var direction = directionInput[keyName];
		game.snake.setDirection(direction);	
	});
};

var runGame = function () {
	game.run();
};