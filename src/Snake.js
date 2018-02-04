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
		this.appendBody();
	},
	
	appendBody: function () {
		this.body.push(new Snake(this.getPositionX(), this.getPositionY()));
	}
	
};