var Physics = {
	collide: function (objectA, objectB) {
		var positionOfObjectA = objectA.getPosition();
		var positionOfObjectB = objectB.getPosition();
		if (positionOfObjectA.x === positionOfObjectB.x &&
			positionOfObjectA.y === positionOfObjectB.y) {
			return true;
		} else {
			return false;
		}
	}
}