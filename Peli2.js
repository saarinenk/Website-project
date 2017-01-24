
    var PhaserGame = function (game) {

        this.map = null;
        this.layer = null;
        this.car = null;
        this.empty1 = null;
        
        this.score = 0;

        this.safetile = 243;
        this.goaltile = 108;
        
        this.gridsize = 32;

        this.speed = 150;
        this.threshold = 3;
        this.turnSpeed = 150;

        this.marker = new Phaser.Point();
        this.turnPoint = new Phaser.Point();

        this.directions = [ null, null, null, null, null ];
        this.opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];

        this.current = Phaser.UP;
        this.turning = Phaser.NONE;
        
        var keycodes = {};
 
        window.addEventListener("keydown", function(e) {
            e.preventDefault();
            keycodes[e.keyCode] = true;
            });
  
        window.addEventListener("keyup", function(e) {
            e.preventDefault();
            delete keycodes[e.keyCode];
            });

        };

    PhaserGame.prototype = {

        init: function () {

            this.physics.startSystem(Phaser.Physics.ARCADE);

        },

        
        
        create: function () {
            this.stage.backgroundColor = '#128712';
            this.map = this.add.tilemap('spring');
            this.map.addTilesetImage('tilesetit', 'tilesetit');

            this.layer = this.map.createLayer('Tile Layer 2');
            this.map.createLayer('Tile Layer 1');
            this.directions = [ null, null, null, null, null ];
            
            this.current = Phaser.UP;
            this.turning = Phaser.NONE;

            this.map.setCollision(243, true, this.layer);
            this.map.setCollision(108, true, this.layer);
            this.map.setCollision(106, true, this.layer);
            this.map.setCollision(77, true, this.layer);
            this.map.setCollision(76, true, this.layer);
            this.layer.visible = false;

            this.car = this.add.sprite(576, 432, 'busleft');
            this.car.anchor.set(0.5);
            this.car.angle = 0;

            this.physics.arcade.enable(this.car);

            this.cursors = this.input.keyboard.createCursorKeys();
            
            this.goal = this.add.physicsGroup();
            var goal = this.goal.create(64,0,'goal', null);
            goal.loadTexture('transparent');
            goal.body.immovable = true;
            
            /* Passengers */
            this.humans = this.add.physicsGroup(); //hh
            var passenger1 = this.humans.create(160,96, 'human', null);
            var passenger2 = this.humans.create(128,288, 'human', null);
            var passenger3 = this.humans.create(352,352, 'human', null);
            var passenger4 = this.humans.create(576,32, 'human', null);
            
            passenger1.loadTexture('transparent');
            passenger2.loadTexture('transparent');
            passenger3.loadTexture('transparent');
            passenger4.loadTexture('transparent');
            
            this.move(Phaser.LEFT);
            
            this.add.button(PhaserGame.GAME_WIDTH-50-0, 0, 'pauseb', this.managePause, this);
            
            /* Obstacles */
            this.obs = this.add.physicsGroup();
            this.obs.enableBody = true;
            this.obs.physicsBodyType = Phaser.Physics.ARCADE;
            
            var obstacle1 = this.obs.create(32, 384, 'obstacle', null);
            obstacle1.loadTexture('cone_vertical');
            obstacle1.body.immovable = true;
            
            var obstacle2 = this.obs.create(192, 160, 'obstacle', null);
            obstacle2.loadTexture('cone_horizontal');
            obstacle2.body.immovable = true;
            
            this.scoreText = this.add.text(460, 5, "Passengers: " + this.score.toString() + "/4", {
                font: "18px Orbitron",
                fill: "#ffffff",
                align: "center",
                stroke: "black",
                strokeThickness: "3"
            }); //hh
            
            this.counter = 100;
            
            this.counterText = this.add.text(100, 5, "Pollution: " + (100 - this.counter).toString() + "%", {
                font: "18px Orbitron",
                fill: "#ffffff",
                align: "center",
                stroke: "black",
                strokeThickness: "3"
            });
            
            this.time.events.loop(Phaser.Timer.SECOND * 0.25, this.updateCounter, this);
            
            this.explosion = this.add.audio('explosion');
            this.failure = this.add.audio('failure');
            this.coin = this.add.audio('coin');
            this.victory = this.add.audio('victory');
                   
        },
        
        updateCounter: function() {

            this.counter--;
            this.counterText.setText('Pollution: ' + (100 - this.counter).toString() + "%");
        },
        
        
        managePause: function(){
		// pause the game
		this.game.paused = true;
		// add proper informational text
		var pausedText = this.add.text(100, 250, "Game paused.\nClick anywhere to continue.", {
            font: "30px Orbitron",
            fill: "#f59434",
            align: "center",
            stroke: "black",
            strokeThickness: "2"
        });
		// set event listener for the user's click/tap the screen
		this.input.onDown.add(function(){
			// remove the pause text
			pausedText.destroy();
			// unpause the game
			this.game.paused = false;
		}, this);
	},

        checkKeys: function () {

            if (this.cursors.left.isDown && this.current !== Phaser.LEFT)
            {
                this.checkDirection(Phaser.LEFT);
            }
            else if (this.cursors.right.isDown && this.current !== Phaser.RIGHT)
            {
                this.checkDirection(Phaser.RIGHT);
            }
            else if (this.cursors.up.isDown && this.current !== Phaser.UP)
            {
                this.checkDirection(Phaser.UP);
            }
            else if (this.cursors.down.isDown && this.current !== Phaser.DOWN)
            {
                this.checkDirection(Phaser.DOWN);
            } else {
                //  This forces them to hold the key down to turn the corner
                this.turning = Phaser.NONE;
            }

        },
        
        

        checkDirection: function (turnTo) {

            if (this.turning === turnTo || this.directions[turnTo] === null || this.directions[turnTo].index === this.safetile || this.directions[turnTo].index === this.goaltile || this.directions[turnTo].index === 106 || this.directions[turnTo].index === 76|| this.directions[turnTo].index === 77)
            {
                //  Invalid direction if they're already set to turn that way
                //  Or there is no tile there, or the tile isn't index a floor tile
                return;
            }
            
            if(this.goaltile === 0 && this.directions[turnTo].index === 108) {
                this.proceed()
            }

            //  Check if they want to turn around and can
            if (this.current === this.opposites[turnTo])
            {
                this.move(turnTo);
            }
            else
            {
                this.turning = turnTo;

                this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
                this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2);
            }

        },

        turn: function () {

            var cx = Math.floor(this.car.x);
            var cy = Math.floor(this.car.y);

            //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
            if (!this.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) || !this.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold))
            {
                return false;
            }

            this.car.x = this.turnPoint.x;
            this.car.y = this.turnPoint.y;

            this.car.body.reset(this.turnPoint.x, this.turnPoint.y);

            this.move(this.turning);

            this.turning = Phaser.NONE;

            return true;

        },

        move: function (direction) {

            var speed = this.speed;

            if (direction === Phaser.LEFT || direction === Phaser.UP)
            {
                speed = -speed;
            }

            if (direction === Phaser.LEFT || direction === Phaser.RIGHT)
            {
                this.car.body.velocity.x = speed;
            }
            else
            {
                this.car.body.velocity.y = speed;
            }

            // this.add.tween(this.car).to( { angle: this.getAngle(direction) }, this.turnSpeed, "Linear", true);

            this.current = direction;

        },
        
        pickup: function (car, human) { //hh
            this.coin.play();
            human.kill();
            this.score++;
            this.scoreText.setText("Passengers: " + this.score.toString() + "/4")
            if(this.score === 4) {
                this.map.setCollision(108, false, this.layer);
                this.goaltile = 0;
            }
        },
        
        crash: function (car, obstacle) {
            this.score = 0;
            this.explosion.play();
            this.game.state.start("GameOver1");
        },
        
        proceed: function () {
            if (this.score === 4) {
                this.score = 0;
                this.victory.play();
                this.game.state.start("Summer");
            }
        },

        getAngle: function (to) {

            //  About-face?
            if (this.current === this.opposites[to])
            {
                return "0";
            }

            if ((this.current === Phaser.UP && to === Phaser.LEFT) ||
                (this.current === Phaser.DOWN && to === Phaser.RIGHT) ||
                (this.current === Phaser.LEFT && to === Phaser.DOWN) ||
                (this.current === Phaser.RIGHT && to === Phaser.UP))
            {
                return "0";
            }

            return "0";

        },
        
        

        update: function () {
          
            this.physics.arcade.collide(this.car, this.layer);
            this.physics.arcade.overlap(this.car, this.humans, this.pickup, null, this); //toimii :)
            this.physics.arcade.collide(this.car, this.obs, this.crash, null, this); //toimii
            this.physics.arcade.collide(this.car, this.goal, this.proceed, null, this);

            this.marker.x = this.math.snapToFloor(Math.floor(this.car.x), this.gridsize) / this.gridsize;
            this.marker.y = this.math.snapToFloor(Math.floor(this.car.y), this.gridsize) / this.gridsize;

            //  Update our grid sensors
            this.directions[1] = this.map.getTileLeft(this.layer.index, this.marker.x, this.marker.y);
            this.directions[2] = this.map.getTileRight(this.layer.index, this.marker.x, this.marker.y);
            this.directions[3] = this.map.getTileAbove(this.layer.index, this.marker.x, this.marker.y);
            this.directions[4] = this.map.getTileBelow(this.layer.index, this.marker.x, this.marker.y);

            this.checkKeys();
            
            if(this.current == Phaser.UP) {
                this.car.loadTexture('busup');
                this.car.angle = 90;
            }
            if(this.current == Phaser.RIGHT) {
                this.car.loadTexture('busright');
                this.car.angle = 0;
            }
            if(this.current == Phaser.LEFT) {
                this.car.loadTexture('busleft');
                this.car.angle = 0;
            }
            if(this.current == Phaser.DOWN) {
                this.car.loadTexture('busdown'); 
                this.car.angle = -90;
            }

            if (this.turning !== Phaser.NONE)
            {
                this.turn();
            }
            
            if (this.counter <= 0) {
                this.failure.play();
                this.score = 0;
                this.game.state.start("GameOver1");
            }
            
            if (this.directions[Phaser.RIGHT].index === 106)
            {
                this.add.sprite(192, 96, 'bs');
            }
            if (this.directions[Phaser.LEFT].index === 106)
            {
                this.add.sprite(320, 352, 'bs');
            }
            if (this.directions[Phaser.LEFT].index === 76)
            {
                this.add.sprite(96, 288, 'bs');
            }
            if (this.directions[Phaser.RIGHT].index === 77)
            {
                this.add.sprite(608, 32, 'bs');
            }



        },

    };

