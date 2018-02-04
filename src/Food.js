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
		
	},
	
	spawnRandom: function (gameBoard) {
		var util = new Util();
		this.setPosition(util.getRandomIndex(gameBoard.row), util.getRandomIndex(gameBoard.column));
	}
	
};