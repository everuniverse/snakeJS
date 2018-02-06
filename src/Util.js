var Util = {

	getRandomIndex: function (arrayLength) {
		var highestIndex = arrayLength - 1;
		return (Math.floor(Math.random() * highestIndex) + 1);
	}

}