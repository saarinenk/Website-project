
  var enemyImage = new Image();
  var enemyReady = false;
  enemyImage.src = "enemysprite.gif";

  enemyImage.onload = function() {
    enemyReady = true;
  }

  var enemies = [];
  
  var addEnemies = function(count) {
    for (i = 0; i < count; i++) {
      var enemy = {
        x: Math.random() * 390,
        y: Math.random() * 390,
        speed: 5,
        w: 30,
        h: 30,
        color: '#00ff00',
        direction: Math.floor(Math.random() * 361),
        xMax: this.x + this.w,
        yMax: this.y + this.h
      };
      enemies.push(enemy);
    }
  };


  var drawEnemies = function(context) {

    for (i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      if (enemyReady) {
        context.drawImage(enemyImage, enemy.x, enemy.y);
      }
    }
  };

  var moveEnemies = function() {
    for (i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      if (enemy.direction > 0 && enemy.direction < 90) {

        var yspeed = enemy.direction / 90;
        var xspeed = 1 - yspeed;

        enemy.x += xspeed;
        enemy.y -= yspeed;
        
      } else if (enemy.direction > 90 && enemy.direction < 180) {

        var yspeed = (enemy.direction - 90) / 90;
        var xspeed = 1 - yspeed;

        enemy.x -= xspeed;
        enemy.y -= yspeed;

      } else if (enemy.direction > 180 && enemy.direction < 270) {

        var yspeed = (enemy.direction - 180) / 90;
        var xspeed = 1 - yspeed;

        enemy.x -= xspeed;
        enemy.y += yspeed;
        
      } else {

        var yspeed = (enemy.direction - 270) / 90;
        var xspeed = 1 - yspeed;

        enemy.x += xspeed;
        enemy.y += yspeed;
      }


        // bounce enemies off of the wall

        if (enemy.x > 400 - (enemy.w + 5)) {
          enemy.x = 400 - (enemy.w + 5);

            if (enemy.direction > 0 && enemy.direction < 90) {
            enemy.direction = (180 - enemy.direction);
            } else if (enemy.direction > 270 && enemy.direction < 360) {
            enemy.direction = (180 + (enemy.direction - 270));
            } 

          }

        if (enemy.x < 0) {
          enemy.x = 0;

            if (enemy.direction > 90 && enemy.direction < 180) {
              enemy.direction = (180 - enemy.direction);
            } else if (enemy.direction > 180 && enemy.direction < 270) {
              enemy.direction = 360 - (enemy.direction - 180);
            }
          }

        if (enemy.y > 400 - (enemy.h + 5)) {
          enemy.y = 400 - (enemy.h + 5);
            if (enemy.direction > 180 && enemy.direction < 270) {
              enemy.direction = 90 + (enemy.direction - 180);
          } else if (enemy.direction > 270 && enemy.direction < 360) {
              enemy.direction = 360 - enemy.direction;
            }
          }

        if (enemy.y < 0) {
          enemy.y = 0;
            if (enemy.direction > 0 && enemy.direction < 90) {
              enemy.direction = 360 - enemy.direction;
          } else if (enemy.direction > 90 && enemy.direction < 180) {
              enemy.direction = 360 - enemy.direction;
          } 
        } 

    }
  };

  var CheckPlayerCollision = function() {
    for (var i = 0; i < enemies.length; i++) {
      var x = Math.abs(enemies[i].x  - player.x);
      var y = Math.abs(enemies[i].y - player.y);
        if (x < enemies[i].w && y < enemies[i].h) {
          return true;
        }
    }
  };

  var CheckEnemyCollision = function(enemies, index) {
    var current = enemies[index];
    for (var i = 0; i < enemies.length; i++) {
      if (index != i) {
        var x = Math.abs(current.x - enemies[i].x);
        var y = Math.abs(current.y - enemies[i].y);
        if (x < current.w && y < current.h) {
          return true;
        }
    }
  }
};


// make enemies bounce off of each other
var Logic = function() {
  for (var i = 0; i < enemies.length; i++) {
    var current = enemies[i];
    if(CheckEnemyCollision(enemies, i)) {

      current.direction = Math.random() * 360;

      /**  if (current.direction > 0 && current.direction < 90) {
              current.direction = 180 - current.direction;
          } else if (current.direction > 90 && current.direction < 180) {
             current.direction = 360 - current.direction;
          } else if (current.direction > 180 && current.direction < 270) {
              current.direction = 180 - (current.direction - 180);
          } else {
              current.direction = 180 + (360 - current.direction);
          } */
        }
      }
    };

var resetenemy = function() {
    if(CheckPlayerCollision) {
      gameOver = true;
      enemies = [];
      addEnemies(6);
    }
  };
