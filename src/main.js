function main() {
	
	console.log("Hello, Snake!");

	game = initGame();
	
	handleKey();
	
	requestAnimationFrame(runGame);
	
	console.log("Goodbye, Snake!");
	
	return 0;
	
}