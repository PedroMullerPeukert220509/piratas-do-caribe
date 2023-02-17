const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var fundo;

var tower;

var towerImg;

var cannon;

var angle;

var cannonBall

var balls = []

var navios = []

var navioSprite, naviojson , navioAnimation = []

var brokenSprite, brokenJson, brokenAnimation = []

var tiro , splash , risada , piratasdocaribe

var afundou=false

var estarindo=false
function preload() {
  fundo = loadImage("assets/background.gif");
  towerImg = loadImage("assets/tower.png");
  navioSprite=loadImage("assets/boat/boat.png")
  naviojson=loadJSON("assets/boat/boat.json")
 brokenSprite=loadImage("assets/boat/broken_boat.png")
 brokenJson=loadJSON("assets/boat/broken_boat.json")
 tiro=loadSound("assets/cannon_explosion.mp3")
 splash=loadSound("assets/cannon_water.mp3")
 risada=loadSound("assets/pirate_laugh.mp3")
 piratasdocaribe=loadSound("assets/piratasdocaribe.mp3")
}

  function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 20

  var options = {
    isStatic: true,
  };

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon=new Cannon(180,110,130,100,angle)
  
  var naviosFrames= naviojson.frames
  for(var i=0;i<naviosFrames.length; i++){

var pos = naviosFrames[i]. position
var img=navioSprite.get(pos.x,pos.y,pos.w,pos.h)
navioAnimation.push(img)

  }
  var brokenFrames= brokenJson.frames
  for(var i=0;i<brokenFrames.length; i++){

var pos = brokenFrames[i]. position
var img=brokenSprite.get(pos.x,pos.y,pos.w,pos.h)
brokenAnimation.push(img)

  }
  piratasdocaribe.play()
}

function draw() {
  background(189);

  rect(ground.position.x, ground.position.y, width * 2, 1);

  image(fundo, 0, 0, 1200, 600);

  push();
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop();

  Engine.update(engine);
  cannon.show()
  
  for(var i=0;i<balls.length;i++){

showBalls(balls[i],i)

colisao(i)



  }
shownavios()
}
function keyReleased (){

if(keyCode===32){

balls[balls.length-1].shoot()

tiro.play()
tiro.setVolume(0.3)

}



}
function keyPressed (){

if(keyCode===32){

var cannonBall= new Cannonball(cannon.x,cannon.y)

balls.push(cannonBall)


}


}
function showBalls(B,I){

if(B){

B.show()
if(B.body.position.x>=width||B.body.position.y>=height-50){

B.remove(I)

if(!afundou){

  splash.play()
  afundou=true
  setTimeout(()=>{

afundou=false

  },1000)

}
 

}
}


}
function shownavios(){

if(navios.length>0){

if(navios.length<4&&navios[navios.length-1].body.position.x<width-300){

  var positions = [-40, -60, -70, -20];
  
  var position = random(positions);

var navio = new Navio(width,height-60,170,170,position,navioAnimation)
navios.push(navio)
}
 for(var i=0;i<navios.length;i++){

  Matter.Body.setVelocity(navios[i].body,{x:-0.9,y:0})
navios[i].show()
navios[i].animate()
var colisao= Matter.SAT.collides(tower,navios[i].body)
if (colisao.collided){

gameOver()

if(!estarindo){
 
  risada.play()

  estarindo= true
  
}

}

 }




}

else{

  var navio = new Navio(width,height-60,170,170,-60,navioAnimation)
  navios.push(navio)



}

}
function colisao(index){ 
for(var i = 0;i<navios.length;i++){

if(balls[index]!==undefined && navios [i] !==undefined){

var colision= Matter.SAT.collides(balls[index].body,navios[i].body)
if(colision.collided){

  World.remove(world,balls[index].body)
  delete balls [index]

navios[i].remove(i)
}

}


}



}
function gameOver() {
  swal(
    {
      title: `Fim de Jogo!!!`,
      text: "Obrigada por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },


    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}