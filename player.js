
var player =  {
    x: 200,
    y: 200,
    height: 25,
    width: 25,
    color: '#ff0000',
    speed: 4,
    facing: 2,
  };

  var playerImage = new Image();
  var playerReady = false;
  playerImage.src = "playersprite.png";

  playerImage.onload = function() {
    playerReady = true;
  }

    var drawPlayer = function(context){
      if(playerReady) {
        context.drawImage(playerImage, player.x, player.y);
      }
    };
  
  var movePlayer = function(direction) {
    if (direction == "up") {
      player.y -= player.speed;
    } else if (direction == "down") {
      player.y += player.speed;
    } else if (direction == "left") {
      player.x -= player.speed;
    } else {
      player.x += player.speed;
    }
    checkBounds();
  };
  
  var checkBounds = function(){
    if (player.x > 400 - (player.width)) {
      player.x = 400 - player.width;
    }
    if (player.x < -10) {
      player.x = -10;
    }
    if (player.y > 395 - (player.height)) {
      player.y = 395 - player.height;
    }
    if (player.y < 0) {
      player.y = 0;
    }
  };
  

  var reset = function() {
    if (CheckPlayerCollision) {
      player.x = 200;
      player.y = 200;
      player.speed = 4;
    }
  };

  // speed change in animation.js

