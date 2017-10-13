var world = {
	create: function() {
		self = this;
		//variables
		this.game.stage.backgroundColor = backgroundColor;
		this.rows = Math.ceil(height / game.cache.getImage('pipe_up').height);
		this.pipeHeight = game.cache.getImage('pipe_up').height;

		//game adds
		this.background = game.add.tileSprite(0, height - (game.cache.getImage('background').height * 2), width, height - game.cache.getImage('background').height, 'background');
		this.background.scale.setTo(2);



		this.rowGroup = game.add.group();
		this.upPipeGroup = game.add.group();

		this.player = game.add.sprite(width / 4, 200, 'bird');
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
		this.font = game.add.retroFont('numbers', 7, 10, "0123456789", 1);
		this.score = 0;
		this.font.text = this.score.toString();

		this.scoreImage = game.add.image(game.world.centerX - 30, 30, this.font);
		this.scoreImage.scale.setTo(3)


		//game settings
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//again button
		this.playAgainImage = game.add.image((width / 2) - ((game.cache.getImage('play').width * 3) / 2), height / 2, 'play');

		this.playAgainImage.inputEnabled = true;
		this.playAgainImage.events.onInputUp.add(function() {
			game.paused = false;
			game.state.start('world');
		});
		this.playAgainImage.scale.setTo(3);
		this.playAgainImage.visible = false;


		game.input.onDown.add(function() {
			self.jump();
		});
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(function() {
			self.jump();
		});
		this.ground = game.add.tileSprite(0, height - (game.cache.getImage('ground').height * 2), width, height, 'ground');
		this.ground.scale.setTo(2);
		this.gameOver = game.add.image((width / 2) - ((game.cache.getImage('game_over').width * 2) / 2), height / 2 - 100, 'game_over');
		this.gameOver.scale.setTo(2);
		this.gameOver.visible = false;

		setTimeout(function() {
			self.addRows();
		}, 500)
	},
	update: function() {
		if (this.player.alive) {
			if (game.physics.arcade.overlap(this.player, [this.rowGroup, this.upPipeGroup])) {
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
			this.ground.tilePosition.x -= 1.25;
		}
		if (this.player.angle < 20) {
			this.player.angle += 1;
		}

		if (this.player.y + this.player.height*1.5 > this.ground.y) {
			this.gameOver.visible = true;
			game.paused = true;
			this.playAgainImage.visible = true;
		}
		this.upPipeGroup.forEach(function(pipe) {
			if (!pipe.touched && (pipe.x < self.player.x)){
				pipe.touched = true;
				self.score++;
				self.font.text = self.score.toString();
			}
			if (!pipe.createPipe && pipe.x < width / 3) {
				pipe.createPipe = true;
				self.addRows();
			}
		});	
		game.time.advancedTiming = true;
	},
	render: function() {
		//game.debug.body(this.player);
		game.debug.text(game.time.fps, 2, 14, "#00ff00");
	},
	jump: function() {
		if(this.player.alive){
			this.playerAnimation.start();
			this.wing.play();
			this.player.body.velocity.y = -350;
		}
	},
	addRows: function() {
		var hole = Math.floor(Math.random() * (this.rows - 6)) + 1;
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
		self = this;
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
			pipe.destroy();
		});
		game.physics.arcade.enable(pipe);
		pipe.body.velocity.x = -150;
		if(pipe.key == 'pipe_up'){
			this.upPipeGroup.add(pipe)
		}else{
			this.rowGroup.add(pipe);
		}
	},
	pipeHit: function() {
		this.player.alive = false;
		this.rowGroup.forEach(function(pipe) {
			pipe.body.velocity.x = 0;
		});
		this.upPipeGroup.forEach(function(pipe) {
			pipe.body.velocity.x = 0;
		});
	},
	gameOver: function() {
		game.add
	}

}