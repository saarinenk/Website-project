var GameOver3 = function(game){};

GameOver3.prototype = {

  	create: function(){
        var gameTitle = this.game.add.image(320,240,"gameover3");
		gameTitle.anchor.setTo(0.5,0.5);

		var playButton = this.game.add.button(320,240,"tryagain",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("GameTitle");
	}
}