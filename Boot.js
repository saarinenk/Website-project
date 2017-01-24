var Boot = function(game){};

Boot.prototype = {

    preload: function(){
        this.load.image('loading', 'loading.jpg', 640, 480);
    },

    create: function(){
        this.game.state.start("Preload");
    }
}