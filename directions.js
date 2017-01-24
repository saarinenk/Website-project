var Directions = function(game){

};

Directions.prototype = {

    preload: function(){

    },

    create: function(){
        var gameTitle = this.game.add.image(320,240,"helpwindow");
		gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(480,380,"backb",this.startMain,this);
		playButton.anchor.setTo(0.5,0.5);
    },
    
    startMain: function(){
        this.game.state.start("GameTitle");
    }
}