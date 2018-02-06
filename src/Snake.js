function Snake(x, y) {

	this.x = x;
	this.y = y;
	this.direction = DIRECTION.NONE;
	this.facing = { leftWall: false, rightWall: false, topWall: false, bottomWall: false };
	this.collide = false;
	this.body = [this];
	
	this.getPositionX = function () {
		return this.x;
	};
	
	this.getPositionY = function () {
		return this.y;
	};
	
	this.setDirection = function (direction) {
		if (this.direction == DIRECTION.UP && direction != DIRECTION.DOWN ||
			this.direction == DIRECTION.DOWN && direction != DIRECTION.UP ||
			this.direction == DIRECTION.LEFT && direction != DIRECTION.RIGHT ||
			this.direction == DIRECTION.RIGHT && direction != DIRECTION.LEFT ||
			this.direction == DIRECTION.NONE) {
			this.direction = direction;
		}
	};
	
	this.getDirection = function () {
		return this.direction;		
	};
	
	this.move = function (direction) {
		switch (direction) {
			case "up":
				if (this.x > 0)
					--this.x;
				break;
				
			case "down":
				if (this.x < GAME_BOARD.HEIGHT - 1)
					++this.x;
				break;
				
			case "left":
				if (this.y > 0)
					--this.y;
				break;
				
			case "right":
				if (this.y < GAME_BOARD.WIDTH -1 )
					++this.y;
				break;
		}
	};
	
	this.eat = function () {
		this.body.push(new Snake(this.getPositionX(), this.getPositionY()));
	};
	
}

Snake.prototype = new Object();