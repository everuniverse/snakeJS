function Food(x, y) {

	this.x = x;
	this.y = y;

	this.getPositionX = function() {
		return this.x;
	};
	
	this.getPositionY = function() {
		return this.y;
	};
	
	this.setPosition = function (x, y) {
		this.x = x;
		this.y = y;
	};
	
	this.spawnRandom = function (gameBoard) {
		var foodSpawnX;
		var foodSpawnY;
		var collision;
		
		// Get a random field and check if it's free.
		// If not, then repeat. (Dirty solution)
		do {
			foodSpawnX = Util.getRandomIndex(gameBoard.row);
			foodSpawnY = Util.getRandomIndex(gameBoard.column);
			collision = false;
			for (var i = 0; i < gameBoard.snake.body.length && !collision; ++i) {
				if (foodSpawnX == gameBoard.snake.body[i].getPositionX() &&
					foodSpawnY == gameBoard.snake.body[i].getPositionY()) {
					collision = true;
				}
			}
		} while (collision);
		
		this.setPosition(foodSpawnX, foodSpawnY);
	};
	
}

Food.prototype = new Object();