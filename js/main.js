var height = window.innerHeight,
	width = window.innerWidth,
	backgroundColor = "#70c4ce",
	game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', this, false, false);

game.state.add('boot', boot);
game.state.add('menu', menu);
game.state.add('world', world);
game.state.start('boot');


