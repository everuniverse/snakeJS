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
		var util = new Util();
		this.setPosition(util.getRandomIndex(gameBoard.row), util.getRandomIndex(gameBoard.column));
	};
	
}