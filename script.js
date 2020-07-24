/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
function setup(){
  createCanvas(400,600)
  colorMode(HSB, 100)
  bird = new Bird()
  pipes = []
  //pipes.push(new Pipe())
  color = random(360)
  score = 0
  img = loadImage("https://cdn.glitch.com/31ea1e8d-2cfc-4b39-bbd9-46636c82c9f1%2Fgumdrop.png?v=1595553625990")
  bg = loadImage("https://cdn.glitch.com/31ea1e8d-2cfc-4b39-bbd9-46636c82c9f1%2Frainbow.jpg?v=1595553877866")
  l = loadImage("https://cdn.glitch.com/31ea1e8d-2cfc-4b39-bbd9-46636c82c9f1%2Fcandy.jpg?v=1595554843876");
}

function draw(){
  background(bg)
  fill(150,100,100)
  textSize(30)
  textFont('Cursive')
  text(`SCORE: ${score}`, 20, 40)
  if(frameCount % 100 == 0){
    pipes.push(new Pipe())
  }
  for(let i = pipes.length-1; i >= 0 ; i--){
    pipes[i].show()
    pipes[i].update()
   
    if(pipes[i].offScreen()){
      pipes.splice(i,1);
    }
   if(pipes[i].hit()){
      gameOver()
    } 
    if(pipes[i].colorChange()){
      color+=15
      color%=360
      score++
    }
    
  }
    
    
  
  bird.show()
  bird.update()
  
}
function keyPressed(){
  if (key == ' '){
    bird.up()
  }
}
class Bird {
  constructor(){
  this.y = height/2;
  this.x = 64;
  this.gravity = .6;
  this.lift = -15;
  this.velocity = 0;
 
  }
   show(){
    
    image(img,this.x, this.y, 32,32)
    
  }
 update() {
   this.velocity += this.gravity
   this.velocity *= 0.9
   this.y += this.velocity
   if(this.y > height){
     this.y = height
     this.velocity = 0
   }
   if(this.y < 0) {
     this.y = 0
     this.velocity = 0;
     
   }   
 }
  up(){
    this.velocity += this.lift
  }
}

class Pipe {
  constructor(){
    this.top = random(height/4, height*.75)
    this.gap = random(80,150)
    this.bottom = height - this.top - this.gap
    this.x = width
    this.w = 20
    this.speed = -4
    
    
  }
  show(){
    fill(color, 100,100)
    image(l,this.x, 0,this.w, this.top)
    image(l,this.x, height - this.bottom , 20, this.bottom)
  }
  update(){
    this.x += this.speed
  }
  offScreen(){
    if(this.x < -this.w){
      return this.x < -this.w
    }
    
  }
  hit(){
    if(bird.y < this.top || bird.y > height - this.bottom) {
      if(bird.x > this.x && bird.x < this.x+ width){
        return true
      }
    }
    else{
      return false
    } 
    
  
    
}
  colorChange(){
    if(bird.x == this.x){
     return true
    }
    else{
      return false
    }
  }
}
 function gameOver(){
   textSize(30);
   fill(0)
   text("GAME OVER", width/3, height/2)
   textSize(20)
   text("click screen to restart", width/4, height*.75)
   noLoop()
   
    
  }
  
function mousePressed(){
  restart()
}
  
function restart(){
   
  setup()
  loop()
 
}
