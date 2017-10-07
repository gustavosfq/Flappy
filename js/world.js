var world = {
	preload: function() {
		game.load.spritesheet('bird', 'img/bird.png', 72, 48);
		game.load.image('background', 'img/background.png');
	},
	create: function() {
		self = this;

		game.stage.backgroundColor = "#70c4ce";
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.background = game.add.tileSprite(0, height - (game.cache.getImage('background').height * 2), width, height - game.cache.getImage('background').height, 'background');
		this.background.scale.setTo(2)

		this.player = game.add.sprite(100, 200, 'bird');
		this.player.animations.add('jump', [0, 1, 2], 10, true);
		this.player.animations.add('fall', [1], 10, true);

		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 1000;
		this.player.scale.setTo(0.5)

		this.playerAnimation = game.add.tween(this.player).to({angle: -20}, 100);

		this.playAgainTxt = game.add.text(width / 2, height / 2, 'Jugar denuevo', {
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
		if (this.player.angle < 20) {
			this.player.angle += 1;
		}
		if(this.player.angle < 0){
			this.player.animations.play('jump');
		}else{
			this.player.animations.play('fall');
		}
		this.background.tilePosition.x -= 0.5;
	},
	render: function() {
		//game.debug.body(this.player);
	},
	jump: function() {
		this.playerAnimation.start();
		this.player.body.velocity.y = -350;
	}

}