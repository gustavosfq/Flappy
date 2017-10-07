var height = window.innerHeight;
var width = window.innerWidth;
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', this, true, false);

game.state.add('boot', boot);
game.state.add('menu', menu);
game.state.add('world', world);

game.state.start('boot');


