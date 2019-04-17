// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
const ballCounts = document.querySelector('p');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// define Ball constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  //this.color = color;
  //this.size = size;
  this.exists = exists
}

function Ball(x, y, velX, velY, color, size, exists){
  Shape.call(this, x, y, velX, velY, true);
  this.color = color;
  this.size = size;

}

function EvilCircle (x, y, velX, velY){
  Shape.call(this, x, y, 20, 20, true);
  this.color = 'white';
  this.size = 10;
}

// define EvilCircle draw method

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth(3);
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};


// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define EvilCircle update method

EvilCircle.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX)-this.size;
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX)-this.size;
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY)-this.size;
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY)-this.size;
  }

};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define EvilCircle collision detection

Ball.prototype.collisionDetectEvil = function() {
  for(var j = 0; j < balls.length; j++) {
    if(this.exists === true){
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
      }
    }
  }
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
};

// define array to store balls and populate it

var balls = [];
while(balls.length < 25) {
  var size = random(10,20);
  var ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );
  balls.push(ball);
}

ballCounts.innerHTML = `Ball count: ${balls.length}`;
console.log(balls.length);

var evil = new EvilCircle(
  random(0 + size,width - size),
  random(0 + size,height - size),
  0,
  0
);

setControls();

//moves the evil circle
function setControls(){
  var _this = this;
  window.onkeydown = function(e) {
      if (e.keyCode === 65) {
        _this.x -= _this.velX;
      } else if (e.keyCode === 68) {
        _this.x += _this.velX;
      } else if (e.keyCode === 87) {
        _this.y -= _this.velY;
      } else if (e.keyCode === 83) {
        _this.y += _this.velY;
      }
  }
}

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  for(var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }



  requestAnimationFrame(loop);
}



loop();
