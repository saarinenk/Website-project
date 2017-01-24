var Preload = function(game){};

Preload.prototype = {

    preload: function(){ 
        
        //  We need this because the assets are on Amazon S3
            //  Remove the next 2 lines if running locally
            //this.game.load.baseURL = 'http://dime.tml.hut.fi/~saarink5/Nettisivut/';
            //this.game.load.crossOrigin = 'Anonymous';
            
            this.game.load.image('pauseb', 'pausebutton.png', 32, 32);
            this.game.load.image('dir', 'helpbutton.png', 32, 32);
            this.game.load.tilemap('spring', 'spring.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('summer', 'summer.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('fall', 'fall.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('winter', 'winter.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tilesetit', 'tilesetit.png');
            this.game.load.image('tilesetit_winter', 'tilesetit_winter.png');
            this.game.load.image('busright', 'busRight0.png');
            this.game.load.image('busleft', 'busLeft0.png');
            this.game. load.image('busup', 'busUp0.png');
            this.game.load.image('busdown', 'busDown0.png');
            this.game.load.image('busStop', 'busStop1.png');
            this.game.load.image('cone_vertical', 'cone_vertical.png');
            this.game.load.image('cone_horizontal', 'cone_horizontal.png');
            this.game.load.image('backb', 'backb.png');
            this.game.load.image('tiles', 'tiles.png');
            this.game.load.image('bs', 'bs.png');
            this.game.load.image('transparent', 'transparent.png');
        
            this.game.load.audio('explosion', 'grenade.wav');
            this.game.load.audio('victory', 'victory.wav');
            this.game.load.audio('failure', 'failure.mp3');
            this.game.load.audio('coin', 'coin.wav'); 
            this.game.load.audio('music', 'music.mp3');
        
            this.game.load.image("gametitle", "gamebackground.png");
            this.game.load.image("helpwindow", "helpw.png");
            this.game.load.image("gameover1", "gameover1.png");
            this.game.load.image("gameover2", "gameover2.png");
            this.game.load.image("gameover3", "gameover3.png");
            this.game.load.image("gameover4", "gameover4.png");
            this.game.load.image("play", "startbutton.png");
            this.game.load.image("tryagain", "tryagainb.png");
            this.game.load.image("winw", "winw.png");
    },
    
    create: function(){
        this.game.state.start("GameTitle");
        var music = this.game.add.audio('music');
        music.play();
    }
}