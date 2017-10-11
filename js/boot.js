var boot = {
	preload:function() {
		game.load.image('logo', 'img/logo.png');
		game.load.image('start', 'img/start.png');
		game.load.image('pipe', 'img/pipe.png');
		game.load.image('pipe_up', 'img/pipe_up.png');
		game.load.image('pipe_down', 'img/pipe_down.png');
		game.load.spritesheet('bird', 'img/bird.png', 72, 48);
		game.load.image('background', 'img/background.png');
		game.load.image('numbers', 'img/numbers.png');
		game.load.audio('wing', ['sound/wing.wav', 'sound/wing.ogg']);
	},
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.state.start('menu');
	}
}