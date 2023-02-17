class Cannon {
  //propriedades da classe
  constructor(x, y, w, h, angle) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;

    //images

this.Cannonbase = loadImage("assets/cannonBase.png")

this.cannon = loadImage("assets/canon.png")




  }

  //funções da classe
  show() {

    if (keyIsDown(UP_ARROW) && this.angle>-30){

      this.angle-=1

    
    }

if (keyIsDown(DOWN_ARROW) && this.angle<70){


this.angle+=1

}



    //base do canhao
    image(this.Cannonbase,70,20,200,200)
    //topo do canhao
    push()
    translate(this.x,this.y)
    rotate(this.angle)

    
    imageMode(CENTER)
    image(this.cannon,0,0,this.w,this.h)
pop()
  }
}
