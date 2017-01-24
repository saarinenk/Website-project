var MainMenu = function(game){

};

MainMenu.prototype = {

    preload: function(){

    },

    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setScreenSize(true);
        this.game.state.start("Peli2");
    }
}