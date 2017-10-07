var world = {
	preload: function() {
		game.load.spritesheet('bird', 'img/bird.png', 72, 48);
		game.load.image('background', 'img/background.png');
	},
	create: function() {
		self = this;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.player = game.add.sprite(100, 200, 'bird');
		this.player.animations.add('jump', [0, 1, 2], 10, true);

		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 1000;

		this.playAgainTxt = game.add.text(width / 2, height / 2, 'Play again', {
			font: '24px Arial',
			fill: '#fff'
		});

		this.playAgainTxt.inputEnabled = true;
		this.playAgainTxt.events.onInputUp.add(function(){
			game.paused = false;
			game.state.start('world');
		})
		this.playAgainTxt.visible = false;

		game.input.onDown.add(function() {
			self.jump();
		});

	},
	update: function() {
		if(this.player.y < 0 || this.player.y > height) {
			game.paused = true;
			this.playAgainTxt.visible = true;
		}
	},
	render: function() {
		//game.debug.body(this.player);
	},
	jump: function() {
		this.player.animations.play('jump');
		this.player.body.velocity.y = -350;
	}

}