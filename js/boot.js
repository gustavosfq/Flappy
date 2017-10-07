var boot = {
	preload: function(){
		game.load.image('background', 'img/background.png');
	},
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.background = game.add.tileSprite(0, 0,  500,500, 'background');
		game.state.start('menu');
	}
}