var world = {
	create: function() {
		self = this;
		//variables
		this.rows = Math.ceil(height / game.cache.getImage('pipe_up').height);
		this.pipeHeight = game.cache.getImage('pipe_up').height;

		//game adds
		this.background = game.add.tileSprite(0, height - (game.cache.getImage('background').height * 2), width, height - game.cache.getImage('background').height, 'background');
		this.background.scale.setTo(2);

		this.rowGroup = game.add.group();

		this.player = game.add.sprite(100, 200, 'bird');
		this.player.animations.add('jump', [0, 1, 2], 10, true);
		this.player.animations.add('fall', [1], 10, true);
		game.physics.arcade.enable(this.player);
		//this.player.body.gravity.y = 1000;
		this.player.scale.setTo(0.5);
		this.playerAnimation = game.add.tween(this.player).to({
			angle: -20
		}, 100);
		this.wing = game.add.audio('wing');


		//game settings
		game.stage.backgroundColor = "#70c4ce";
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.time.events.loop(1500, this.addRows, this);

		//again button
		this.playAgainTxt = game.add.text(width / 2, height / 2, 'Jugar denuevo', {
			font: '24px Arial',
			fill: '#fff'
		});

		this.playAgainTxt.inputEnabled = true;
		this.playAgainTxt.events.onInputUp.add(function() {
			game.paused = false;
			game.state.start('world');
		})
		this.playAgainTxt.visible = false;


		game.input.onDown.add(function() {
			self.jump();
		});
	},
	update: function() {
		if (this.player.y < 0 || this.player.y > height) {
			game.paused = true;
			this.playAgainTxt.visible = true;
		}
		if (this.player.angle < 20) {
			this.player.angle += 1;
		}
		if (this.player.angle < 0) {
			this.player.animations.play('jump');
		} else {
			this.player.animations.play('fall');
		}
		this.background.tilePosition.x -= 0.5;
	},
	render: function() {
		//game.debug.body(this.player);
	},
	jump: function() {
		this.playerAnimation.start();
		//this.wing.play();
		this.player.body.velocity.y = -350;
	},
	addRows: function() {
		var hole = Math.floor(Math.random() * (this.rows - 4)) + 1;

		console.log(hole)
		for (var i = 0; i < this.rows; i++) {
			if (i == hole -1) {
				this.row(width, this.pipeHeight * i, 1)
			}else if (i == hole + 2) {
				this.row(width, this.pipeHeight * i, 2)
			}else if (i != hole && i != hole +1) {
				this.row(width, this.pipeHeight * i, 0)
			}
		}
		var pipe = game.add.sprite(width, this.pipeHeight * i, 'pipe');
	},
	row: function(x, y, i) {
		switch (i) {
			case 0:
				pipe = game.add.sprite(x, y, 'pipe');
				break;
			case 1:
				pipe = game.add.sprite(x, y, 'pipe_up');
				break;
			case 2:
				pipe = game.add.sprite(x, y, 'pipe_down');
				break;
		}
		this.rowGroup.add(pipe);
		game.physics.arcade.enable(pipe);
		pipe.body.velocity.x = -200;
		pipe.checkWorldBounds = true;
		pipe.outOfBoundsKill = true;
	}

}