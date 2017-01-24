var GameTitle = function(game){};

GameTitle.prototype = {

    create: function(){
        var gameTitle = this.game.add.image(320,240,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(220,200,"play",this.startGame,this);
		playButton.anchor.setTo(0.5,0.5);
        var directionsWindow = this.game.add.button(420, 200, "dir", this.showDirections, this);
        directionsWindow.anchor.setTo(0.5,0.5)
    },

    startGame: function(){
        this.game.state.start("Peli2");
    },
    
    showDirections: function(){
        this.game.state.start("Directions");
    }

}