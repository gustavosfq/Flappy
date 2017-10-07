var menu = {
	create: function() {
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