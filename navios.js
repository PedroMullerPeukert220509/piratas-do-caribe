class Navio{

constructor(x,y,w,h,poss,navioAnimation){

this.body=Bodies.rectangle(x,y,w,h)
World.add(world,this.body)
this.w=w
this.h=h
this.image=loadImage("assets/boat.png")
this.poss=poss
this.navioAnimation=navioAnimation
this.speed=0.05



}
animate(){

this.speed+=0.05

  
}



show(){

var angle=this.body.angle
var pos=this.body.position
var index=floor(this.speed%this.navioAnimation.length)
push()
translate(pos.x,pos.y)
rotate(angle)
imageMode(CENTER)
image(this.navioAnimation[index],0,this.poss,this.w,this.h)


pop()




}
remove(index) {

this.navioAnimation=brokenAnimation;
this.w=300
this.h=300
this.speed=0.05
    setTimeout(() => {
       Matter.World.remove(world, navios[index].body);
       navios.splice(index, 1);
     }, 2000);
   }
}