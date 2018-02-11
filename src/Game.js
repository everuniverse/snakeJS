function Game(args) {

	this.row = GAME_BOARD.WIDTH;
	this.column = GAME_BOARD.HEIGHT;
	this.field = ICON;
	this.terrain = [];
	this.snake = null;
	this.food = null;
	this.canvas = args.mainBox;
	this.running = true;
	this.cycle = 0;
	this.lastCycle = 0;
	this.updated = false;

	this.init = function () {
		var snakeIndexX = Util.getRandomIndex(this.row),
				snakeIndexY = Util.getRandomIndex(this.column),
				foodIndexX = Util.getRandomIndex(this.row),
				foodIndexY = Util.getRandomIndex(this.column);
		
		this.snake = new Snake(snakeIndexX, snakeIndexY);
		this.food = new Food(foodIndexX, foodIndexY);
		this.terrain = new Terrain(this);
		this.terrain.create();
	};

	this.update = function () {
		this.snake.moveInDirection();
		
		if (Physics.collide(this.snake, this.food)) {
			this.snake.eat();
			this.food.spawnRandom(this);
		}
		
		var snakeBody = [this.snake];
		for (var i = 0; i < this.snake.body.length; ++i) {
			snakeBody.push(this.snake.body[i]);
			this.snake.body[i] = new Snake(snakeBody[i].getPositionX(), snakeBody[i].getPositionY());
		}
		
		this.updated = true;
	};

	this.render = function () {
		if (this.updated) {
			this.canvas.innerHTML = "";
			for (var i = 0; i < this.row; ++i) {
				for (var j = 0; j < this.column; ++j) {
					this.canvas.innerHTML += this.terrain.ground[i][j];
				}
				this.canvas.innerHTML += "<br>";
			}
			
			this.updated = false;
		}
	};

	this.addCycle = function () {
		++this.cycle;
	};
	
	this.rememberCycle = function (cycle) {
		this.lastCycle = cycle;
	};
	
	this.run = function () {
		if (this.running) {
			this.addCycle();
			
			if (this.cycle < this.lastCycle + (1000 / 60)) {
	    	requestAnimationFrame(this.run.bind(this));
	      return;
	    }
	    
	    this.rememberCycle(this.cycle);
			this.update();
			this.render();
			this.terrain.create();
			
			requestAnimationFrame(this.run.bind(this));
		} else {
			this.running = false;
		}
	};

	this.stopRunning = function () {
		this.running = false;
	};
	
}