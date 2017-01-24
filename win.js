var Win = function(game){};

Win.prototype = {

  	create: function(){
        var gameTitle = this.game.add.image(320,240,"winw");
		gameTitle.anchor.setTo(0.5,0.5);

		var playButton = this.game.add.button(480,380,"backb",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("GameTitle");
	}
}