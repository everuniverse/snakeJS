var Physics = {
	collide: function (objectA, objectB) {
		if (objectA.getPosition().x === objectB.getPosition().x &&
		    objectB.getPosition().y === objectA.getPosition().y) {
			return true;
		} else {
			return false;
		}
	}
}
