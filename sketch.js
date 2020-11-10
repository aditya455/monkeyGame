
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = 0;
var score = 0;
var ground,invisibleGround;
var PLAY = 1;
var END = 0 ;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1; 

ground = createSprite(400,400,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
   console.log(ground.x);
  
  invisibleGround = createSprite(400,350,400,10);
  invisibleGround.visible = false;

  obstacleGroup = createGroup();
  FoodGroup = createGroup();
}


function draw() {
 background("lightblue");
  
   stroke("black");
  textSize(20);
  fill("red");
  text("score :"+ score,75,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  
    text("SurvivalTime:"+survivalTime,180,50);

  if(gameState === PLAY){
    
 if(keyDown("space")&& monkey.y > 100 ) {
        monkey.velocityY = -4;
 }
           food();
  rock();
    
  survivalTime = Math.ceil(frameCount/frameRate());
    
 monkey.velocityY = monkey.velocityY + 0.4;     
  
if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(FoodGroup.isTouching(monkey)){
    banana.destroy();
    score  = score+1;
  }
    
  if(obstacleGroup.isTouching(monkey)){       
      gameState = END;
  }
  }
  
 else if(gameState === END){
    
     ground.velocityX = 0;
      monkey.velocityY = 0;
   
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
    //obstacleGroup.destroyEach(); 
     //FoodGroup.destroyEach();
  }
  
   monkey.collide(ground) ;
  
  drawSprites();
}

function food(){
  if (frameCount % 80 === 0){
    banana = createSprite(400,200,20,20);
    banana.y = Math.round(random(120,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1 ;
    banana.velocityX = -4;
    banana.lifetime = 1200;
    FoodGroup.add(banana);
  }
}

function rock(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(400,370,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(6+1*score/10);
    obstacle.scale = 0.2;
    obstacle.lifetime = 1200;
    obstacleGroup.add(obstacle);
  }
}
