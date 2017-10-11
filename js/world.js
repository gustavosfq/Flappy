var world = {
	create: function() {
		self = this;
		//variables
		this.game.stage.backgroundColor = '#000';
		this.rows = Math.ceil(height / game.cache.getImage('pipe_up').height);
		this.pipeHeight = game.cache.getImage('pipe_up').height;

		//game adds
		this.background = game.add.tileSprite(0, height - (game.cache.getImage('background').height * 2), width, height - game.cache.getImage('background').height, 'background');
		this.background.scale.setTo(2);

		this.rowGroup = game.add.group();

		this.player = game.add.sprite(width / 8, 200, 'bird');
		this.player.animations.add('jump', [0, 1, 2], 10, true);
		this.player.animations.add('fall', [1], 10, true);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 1000;
		this.player.scale.setTo(0.5);
		this.player.alive = true;
		this.player.anchor.y = -0.2
		this.player.anchor.x = 0.5
		this.playerAnimation = game.add.tween(this.player).to({
			angle: -20
		}, 100);
		this.wing = game.add.audio('wing');
		this.score = -1;
		this.scoreTxt = game.add.text(width/2 - 20, 60, '0', {
			font: '24px Arial',
			fill: '#fff'
		});


		//game settings
		game.stage.backgroundColor = "#70c4ce";
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.timer = game.time.events.loop(1500, this.addRows, this);

		//again button
		this.playAgainTxt = game.add.text(width/2 - 30, height / 2, 'Again', {
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
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(function() {
			self.jump();
		});
	},
	update: function() {
		if (this.player.alive) {
			if (game.physics.arcade.overlap(this.player, this.rowGroup)) {
				this.pipeHit();
			}
			if(this.player.y < 0){
				this.pipeHit();
			}
			if (this.player.angle < 0) {
				this.player.animations.play('jump');
			} else {
				this.player.animations.play('fall');
			}
			this.background.tilePosition.x -= 0.5;
		}
		if (this.player.angle < 20) {
			this.player.angle += 1;
		}
		if (this.player.y > height) {
			game.paused = true;
			this.playAgainTxt.visible = true;
		}
	},
	render: function() {
		game.debug.body(this.player);
	},
	jump: function() {
		if(this.player.alive){
			this.playerAnimation.start();
			this.wing.play();
			this.player.body.velocity.y = -350;
		}
	},
	addRows: function() {
		this.score++;
		this.scoreTxt.text = this.score;
		var hole = Math.floor(Math.random() * (this.rows - 4)) + 1;
		for (var i = 0; i < this.rows; i++) {
			if (i == hole - 1) {
				this.row(width, this.pipeHeight * i, 1)
			} else if (i == hole + 2) {
				this.row(width, this.pipeHeight * i, 2)
			} else if (i != hole && i != hole + 1) {
				this.row(width, this.pipeHeight * i, 0)
			}
		}
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
		pipe.checkWorldBounds = true;
		pipe.events.onOutOfBounds.add(function(pipe){
			pipe.kill();
		});
		game.physics.arcade.enable(pipe);
		pipe.body.velocity.x = -200;
		this.rowGroup.add(pipe);
	},
	pipeHit: function() {
		this.player.alive = false;
		game.time.events.remove(this.timer);
		this.rowGroup.forEach(function(pipe) {
			pipe.body.velocity.x = 0;
		})
	}

}