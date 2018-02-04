function Game(args) {

	this.row = 8;
	this.column = 8;
	this.field = ICON;
	this.terrain = [];
	this.snake = null;
	this.food = null;
	this.canvas = args.mainBox;
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
		
		this.snake = new Snake(snakeIndexX, snakeIndexY);
		this.snake.appendBody();
		this.food = new Food(foodIndexX, foodIndexY);
		
		this.createTerrain();

	},

	update: function () {
		
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
		
		if (this.snake.getPositionX() == this.food.getPositionX() &&
			this.snake.getPositionY() == this.food.getPositionY()) {
			this.snake.eat(this.food);
			this.food.spawnRandom(this);
		}
		
		var snakeBody = [this.snake];
		for (var i = 0; i < this.snake.body.length; ++i) {
			snakeBody.push(this.snake.body[i]);
			this.snake.body[i] = new Snake(snakeBody[i].getPositionX(), snakeBody[i].getPositionY());
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