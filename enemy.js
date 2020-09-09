class Enemy {
    constructor(x,y){
        var options = {
            restitution: 0.8,
            friction: 0.3,
            density: 1.0,
            velocity: { x: 0, y: 0 },
            frictionAir: 0.05
        }

        this.visibility = 255;
        this.body = Bodies.rectangle(x,y,50,50,options);
        this.width = 50;
        this.height = 50;
        World.add(world,this.body);

        this.x = x;

        this.image = loadImage("images/enemy2.png");
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0,0, 80,80)
      
        pop();
    }

    kill(){
        console.log("kill");
        World.remove(world, this.body);
       // this.visibilty = this.visibilty-5;
       // tint(255,this.visibility);
        image(this.image,0,0,80,80)
    }
}