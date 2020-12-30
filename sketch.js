const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var ground, platform;
var block1, block2, block3, block4, block5, block6;
var x_block_offset, y_block_offset, block_width, block_height;
var stone, slingshot;
var total_score;

function preload() 
{
    //backgroundImg = loadImage("sprites/bg.png");
}

function setup()
{
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    

    ground = new Ground(600, height, 1200, 20);
    platform = new Ground(width/2, height/2, 200, 10);

    block_width = 30;
    block_height = 40;
    x_block_offset = (width / 2) - block_width;
    y_block_offset = (height / 2) - (block_height / 2) ;
    

    // Level 1
    block1 = new Box (x_block_offset, y_block_offset, block_width, block_height, "green");
    x_block_offset += block_width;
    block2 = new Box (x_block_offset, y_block_offset, block_width, block_height, "green");
    x_block_offset += block_width;
    block3 = new Box (x_block_offset, y_block_offset, block_width, block_height, "green");
    
    // Level 2
    x_block_offset = (width / 2) - (block_width * 0.5);
    y_block_offset -= block_height;
    block4 = new Box (x_block_offset, y_block_offset, block_width, block_height, "yellow");
    
    x_block_offset += block_width;
    block5 = new Box (x_block_offset, y_block_offset, block_width, block_height, "yellow");

    // Level 3
    x_block_offset = (width / 2) - (block_width * 0);
    y_block_offset -= block_height;
    block6 = new Box (x_block_offset, y_block_offset, block_width, block_height, "red");

    // Polygon & Sling shot
    //polygon = Bodies.circle(50, 200, 20);
    stone = new Stone(200, 150, 20);
    //slingshot = new Slingshot(stone.body,{x:50, y:200});
    slingshot = new Slingshot(stone.body, {x:150, y:150});

    total_score = 0;
   
}

function draw()
{
    //background(backgroundImg);
    background(0);
    Engine.update(engine);

    ground.display();
    platform.display();

    //Level 1
    block1.display();
    block2.display();
    block3.display();

    //Level 2
    block4.display();
    block5.display();

    //Level 3
    block6.display();

    // Polygon & Slingshot
    stone.display();
    slingshot.display();

    // Calculate Total Score
    total_score = total_score + block1.getscore() + block2.getscore() + block3.getscore() + block4.getscore() + block5.getscore() + block6.getscore();

    stroke(255, 255, 255);
    fill(255, 255, 255);
    text("SCORE : " + total_score, 1000, 40);
}

function mouseDragged()
{
    //Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    Matter.Body.setPosition(stone.body, {x: mouseX, y: mouseY});
}


function mouseReleased()
{
    slingshot.fly();
}

function keyPressed()
{
    if(keyCode===32)
    {
        slingshot.attach(stone.body);
    }
}
