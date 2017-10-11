var menu = {
	create: function() {
		self = this;
		game.stage.backgroundColor = backgroundColor;

		this.background = game.add.tileSprite(0, height - (game.cache.getImage('background').height * 2), width, height - game.cache.getImage('background').height, 'background');
		this.background.scale.setTo(2)

		this.logo = game.add.sprite((width / 2) - (game.cache.getImage('logo').width), -game.cache.getImage('logo').height, 'logo');
		this.start = game.add.sprite((width / 2) - (game.cache.getImage('start').width), height + game.cache.getImage('start').height, 'start');
		this.logo.scale.setTo(2);
		this.start.scale.setTo(2);

		game.add.tween(this.logo).to({y: 100}, 500).start()
		game.add.tween(this.start).to({y: 200}, 500).start().onComplete.add(function() {
			self.start.inputEnabled = true;
			self.start.events.onInputDown.add(function(){
				game.state.start('world');
			})
		})
	},
	update: function() {

	}
}