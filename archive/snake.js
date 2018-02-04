function main() {
	
	console.log("Hello, Snake!");

	var initGame = function (canvasId) {
		var mainBox = document.getElementById("main");
		var game = new Game(mainBox);
		game.init();
		return game;
	}
	var game = initGame();
	
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
	handleKey();
	
	var runGame = function () {
		game.run();
	};
	requestAnimationFrame(runGame);
	
	console.log("Goodbye, Snake!");
	
	return 0;
	
}

function Game(canvas) {

	this.row = 8;
	this.column = 8;
	this.field = { EMPTY: "[ ]", SNAKE: "[X]", FOOD: "[O]" };
	this.terrain = [];
	this.canvas = canvas;
	this.running = true;
	this.cycle = 0;
	this.lastCycle = 0;

}

Game.prototype = {

	init: function () {

		var util = new Util();
		
		var snakeIndexX = util.getRandomIndex(this.row),
				snakeIndexY = util.getRandomIndex(this.column),
				foodIndexX = util.getRandomIndex(this.row),
				foodIndexY = util.getRandomIndex(this.column);
		
		this.snake = new Snake(snakeIndexX, snakeIndexY),
		this.food = new Food(foodIndexX, foodIndexY);
		
		this.createTerrain();

	},

	update: function () {
		
		var snakeHead = this.snake;
		var snakeBody = [];
		for (var j = 0; j < this.snake.body.length; ++j) {
			snakeBody.push(this.snake.body[j]);
		}
		
		switch (this.snake.getDirection()) {
			
			case DIRECTION.UP:
				this.snake.move("up");
				break;
			
			case DIRECTION.DOWN:
				this.snake.move("down");
				break;
			
			case DIRECTION.LEFT:
				this.snake.move("left");
				break;
			
			case DIRECTION.RIGHT:
				this.snake.move("right");
				break;

		}
		
		if (this.snake.eat(this.food)) {
				var util = new Util();
				this.food.setPosition(util.getRandomIndex(this.row), util.getRandomIndex(this.column));
				this.snake.body.push(new Snake(this.snake.getPositionX(), this.snake.getPositionY()));
		}
		
		for (var i = 0; i < this.snake.body.length; ++i) {
			if (i == 0) {
				this.snake.body[i] = new Snake(snakeHead.getPositionX(), snakeHead.getPositionY());
			} else {
				this.snake.body[i] = new Snake(snakeBody[i - 1].getPositionX(), snakeBody[i - 1].getPositionY());
			}
		}

	},

	render: function () {

		this.canvas.innerHTML = "";
		for (var i = 0; i < this.row; ++i) {
			for (var j = 0; j < this.column; ++j) {
				this.canvas.innerHTML += this.terrain[i][j];
			}
			this.canvas.innerHTML += "<br>";
		}
		
	},

	addCycle: function () {
		++this.cycle;
	},
	
	rememberCycle: function (cycle) {
		this.lastCycle = cycle;
	},

	stopRunning: function () {
		this.running = false;
	},
	
	createTerrain: function () {

		for (var i = 0; i < this.row; ++i) {
			this.terrain[i] = [];
			for (var j = 0; j < this.column; ++j) {
				this.terrain[i].push(this.field.EMPTY);
			}
		}
		
		var snakeBody = this.snake.body;
		
		this.terrain[this.food.getPositionX()][this.food.getPositionY()] = this.field.FOOD;
		this.terrain[this.snake.getPositionX()][this.snake.getPositionY()] = this.field.SNAKE;
		
		for (var i = 0; i < this.snake.body.length; ++i) {
			this.terrain[snakeBody[i].getPositionX()][snakeBody[i].getPositionY()] = this.field.SNAKE;
		}
		
	},
	
	run: function () {
		if (this.running) {
			this.addCycle();
			
			if (this.cycle < this.lastCycle + (1000 / 60)) {
	    	requestAnimationFrame(this.run.bind(this));
	      return;
	    }
	    
	    this.rememberCycle(this.cycle);
			
			this.update();
			
			this.render();
			
			this.createTerrain();
			
			requestAnimationFrame(this.run.bind(this));
		} else {
			this.running = false;
		}
	}
	
};

var DIRECTION = {
	NONE: 0,
	UP: 1,
	DOWN: 2,
	LEFT: 3,
	RIGHT: 4
}

function Snake(x, y) {

	this.x = x;
	this.y = y;
	this.direction = DIRECTION.NONE;
	this.facing = { leftWall: false, rightWall: false, topWall: false, bottomWall: false };
	this.collide = false;
	this.body = [];
	
}

Snake.prototype = {

	getPositionX: function () {

		return this.x;

	},
	
	getPositionY: function () {

		return this.y;

	},
	
	setDirection: function (direction) {
		
		this.direction = direction;
		
	},
	
	getDirection: function () {
		
		return this.direction;
		
	},
	
	move: function (direction) {
		
		switch (direction) {
			case "up":
				if (this.x > 0)
					--this.x;
				break;
			case "down":
				if (this.x < 7)
					++this.x;
				break;
			case "left":
				if (this.y > 0)
					--this.y;
				break;
			case "right":
				if (this.y < 7)
					++this.y;
				break;
		}
	
	},
	
	eat: function (food) {
		// var util = new Util();
		if (this.getPositionX() == food.getPositionX() &&
			this.getPositionY() == food.getPositionY()) {
			return true;
		}
		return false;
	}
	
};

function Food(x, y) {

	this.x = x;
	this.y = y;

}

Food.prototype = {

	getPositionX: function() {

		return this.x;

	},
	
	getPositionY: function() {

		return this.y;

	},
	
	setPosition: function (x, y) {
		
		this.x = x;
		this.y = y;
		
	}
	
};

function Util() {

	this.getRandomIndex = function (arrayLength) {

		var highestIndex = arrayLength - 1;
		return (Math.floor(Math.random() * highestIndex) + 1);

	}

}