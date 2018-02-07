function Terrain(game) {
	
	this.ground = [];

	this.create = function () {

		var snake = game.snake,
			snakeBody = snake.body,
			food = game.food,
			texture = ICON;
		
		for (var i = 0; i < game.row; ++i) {
			this.ground[i] = [];
			for (var j = 0; j < game.column; ++j) {
				this.ground[i].push(texture.EMPTY);
			}
		}
		
		this.ground[food.getPositionX()][food.getPositionY()] = texture.FOOD;
		this.ground[snake.getPositionX()][snake.getPositionY()] = texture.SNAKE;
		
		for (var i = 0; i < snakeBody.length; ++i) {
			this.ground[snakeBody[i].getPositionX()][snakeBody[i].getPositionY()] = texture.SNAKE;
		}
	};

}