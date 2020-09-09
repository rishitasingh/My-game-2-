const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground;

var player, enemy;

var playerBodyImg, playerBody;

var gameState = "onSling";

var killed = false;

function preload(){

    playerBodyImg = loadImage("images/shooter2.png");
}

function setup(){
    var canvas = createCanvas(600,800);
    engine = Engine.create();
    world = engine.world;

    var ground_options ={
        isStatic: true
    }


    ground = Bodies.rectangle(width/2,height-20,width,20,ground_options);
    World.add(world,ground);

    //console.log(ground);

    var playerBody = createSprite(width/2,height-100);
    playerBody.addImage(playerBodyImg);
    playerBody.scale = 0.75;

    player = new Player(width/2,height-150);
    enemy = new Enemy(random(20,width-20),0);

    slingshot = new SlingShot(player.body,{x:playerBody.x+30, y:playerBody.y-50});
    

}

function draw(){
    background(255);
    Engine.update(engine);
    fill("green");
    rectMode(CENTER);
    rect(ground.position.x,ground.position.y,400,20);

    player.display();

    //console.log("enemy");
    enemy.display();
    spawnEnemy();

    if(detectCollision(player, enemy)){
        killed = true;
    }

    if(killed){
        enemy.kill();

    }

    drawSprites();
}

function spawnEnemy(){
  
    if(frameCount%150 ===0){
        kill = false;
        enemy = new Enemy(random(20,width-20),0);
        enemy.display();
    }
}

function mouseDragged(){
    if(gameState!== "launched"){
        Matter.Body.setPosition(player.body, {x:mouseX, y:mouseY});
        Matter.Body.setVelocity(player.body, {x: 0, y: -5});
    }

    
}

function mouseReleased(){

    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    //console.log(player.body.speed);
    if(keyCode === 32){//&& (player.body.speed<1 || player.body.position.x> 1200 || player.body.position.y<0)){
        player.body.velocity.x = 0;
        //player.trajectory=[]
       slingshot.attach(player.body);
       Matter.Body.setPosition(player.body, {x:width/2, y:height-150});
       
       gameState = "onSling";

    }
}

function detectCollision(body1, body2){
    body1Position = body1.body.position;
    body2Position = body2.body.position;

    var distance = dist(body1Position.x, body1Position.y, body2Position.x, body2Position.y);

    console.log(distance);
    console.log(body1.x);
    console.log(body2.x);

    if(distance<=(player.x + enemy.x)/2){
        return true;


    }

    else{
        return false;
    }
}