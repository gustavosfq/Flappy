var menu = {
	create: function() {
		this.background = game.add.sprite(0, 0, 'background');
		this.background.width = width;
		this.background.height = height;

		var menuTxt = game.add.text(game.world.x / 2, game.world.y / 2, 'Menu', {
			font: '24px Arial',
			fill: '#fff'
		});

		var startTxt = game.add.text(game.world.x / 2, (game.world.y / 2) + 100, 'Start Game', {
			font: '24px Arial',
			fill: '#fff'
		});

		startTxt.inputEnabled = true;
		startTxt.events.onInputUp.add(function(){
			game.state.start('world');
		})
	},
	update: function() {

	}
}