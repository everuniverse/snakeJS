function Object() {
	this.x = null;
	this.y = null;
}

Object.prototype = {
	getPosition: function () {
		return { x: this.x, y: this.y };
	}
}