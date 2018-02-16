function Terrain(game) {

	this.ground = [];
	this.boundary;

	this.create = function () {

		var snake = game.snake,
		    snakeBody = snake.body,
		    food = game.food,
		    texture = ICON;

		// Two dimensional array for the ground
		for (var i = 0; i < game.row; ++i) {
			this.ground[i] = [];
			for (var j = 0; j < game.column; ++j) {
				this.ground[i].push(texture.EMPTY);
			}
		}

		var foodIndexX = food.getPositionX(),
		    foodIndexY = food.getPositionY(),
		    snakeIndexX = snake.getPositionX(),
		    snakeIndexY = snake.getPositionY();

		// Assign food and snake (head) tiles to the ground matrix
		this.ground[foodIndexX][foodIndexY] = texture.FOOD;
		this.ground[snakeIndexX][snakeIndexY] = texture.SNAKE;

		var snakeBodyIndexX, snakeBodyIndexY;

		// Replace ground tile with snake body part
		for (var i = 0; i < snakeBody.length; ++i) {
			snakeBodyIndexX = snakeBody[i].getPositionX();
			snakeBodyIndexY = snakeBody[i].getPositionY();
			this.ground[snakeBodyIndexX][snakeBodyIndexY] = texture.SNAKE;
		}
	};

	this.boundary = {
		top:    { x: null, y: -1 },
		bottom: { x: null, y: game.row },
		left:   { x: -1, y: null },
		right:  { x: game.column, y: null }
	};

}
