class Cannonball{

constructor(x,y){

this.r=30
this.body= Bodies.circle(x,y,this.r,{isStatic:true})
World.add (world,this.body)
this.Image = loadImage("assets/cannonball.png")
}
 show() {

    var pos=this.body.position
    push()
    imageMode(CENTER)
image(this.Image,pos.x,pos.y,this.r,this.r)
pop()


 }  
 shoot() {
    var newAngle = cannon.angle - 28;
    newAngle = newAngle *(3.14/180)
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
  }

  remove(index) {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

    setTimeout(() => {
      Matter.World.remove(world, this.body);
      delete balls[index];
    }, 1000);
  }

}