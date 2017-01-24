$(document).ready(function() {
  
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 400;
  counter = 0;
  counterMem = 0;
  var gameOver = false;

  // Background image
  var bgReady = false;
  var bgImage = new Image();
  bgImage.onload = function () {
    bgReady = true;
  };
  bgImage.src = "gametausta.jpg";
  


  /* Keycodes */
  var keycodes = {};
  
  window.addEventListener("keydown", function(e){
    e.preventDefault();
    keycodes[e.keyCode] = true;                        
  });
  
  window.addEventListener("keyup", function(e){
    e.preventDefault();
    delete keycodes[e.keyCode];
  });

//removes an enemy from the gameboard if left-clicked
    canvas.addEventListener("mousedown", getPosition, false);

      function getPosition(event)
      {
        var x = new Number();
        var y = new Number();
        var canvas = document.getElementById("canvas");

          x = event.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
          y = event.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;

  for(i = 0; i < enemies.length; i++) {
    if (x >= enemies[i].x && x <= (enemies[i].x + enemies[i].w) &&
        y >= enemies[i].y && y <= (enemies[i].y + enemies[i].h)) {
      var index = enemies.indexOf(enemies[i]);
      enemies.splice(index, 1);
    } 
  };

  // change player speed
if (x > 320 && x < 350 && y > 360 && y < 390) {
  player.speed += 1;
} else if (x > 360 && x < 390 && y > 360 && y < 390) {
  if (player.speed > 1) {
  player.speed -= 1;
  }
}
};
  
  var update = function(){
    if (37 in keycodes) {
      movePlayer("left");
      player.facing = 2;
    }
    if (39 in keycodes) {
      movePlayer("right");
      player.facing = 3;
    }
    if (38 in keycodes) {
      movePlayer("up");
      player.facing = 0;
    }
    if (40 in keycodes) {
      movePlayer("down");
      player.facing = 1;
    }

    moveEnemies();
  };

  var render = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (bgReady) {
      ctx.drawImage(bgImage, 0, 0);
    }
    if (playerReady) {
      width = 39;
      ctx.drawImage(playerImage, player.facing * 40, 0,40,29,player.x,player.y,40,29);
    }
    if (enemyReady) {
      for(i = 0; i < enemies.length; i++) {
        enemy = enemies[i];
        ctx.drawImage(enemyImage, Math.round(enemy.direction / 120) * 38, 0,38,35,enemy.x,enemy.y,38,35);
            }
        }


      // Buttons
      var dbuttonImage = new Image();
      dbuttonImage.src = "-button.png";
      var ubuttonImage = new Image();
      ubuttonImage.src = "+button.png";
      ctx.drawImage(dbuttonImage, 0, 0, 30, 30, 360, 360, 30, 30)
      ctx.drawImage(ubuttonImage, 0, 0, 30, 30, 320, 360, 30, 30)

      // Score
      ctx.fillStyle = "rgb(0, 51, 102)";
      ctx.font = "bold 15px Helvetica";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      ctx.fillText("Points: " + Math.round(counter), 32, 32);
      };

      // New enemy every 2 seconds
      setInterval(function(){
        addEnemies(1)
      }, 2000);
  
  var main = function() {
    update();
    render();
    if(!gameOver) {
    requestAnimationFrame(main);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(106, 0, 0)";
        ctx.fillRect(0,150,400,100);
        
        ctx.fillStyle = 'white';
        ctx.font = "16px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Hävisit pelin! Peli jatkuu muutaman sekunnin kuluttua", 9, 170);
        ctx.fillText("Sait " + Math.round(counterMem) + " pistettä.", 145, 210)

        setTimeout(function(){
          gameOver = false;
          requestAnimationFrame(main);
        }, 4000)
    }
    Logic();
      counter += 0.02;

    if(CheckPlayerCollision()) {
      gameOver = true;
      reset();
      resetenemy();
      counterMem = counter;
      counter = 0;
    }
  };
  addEnemies(6);
  main();
});


