var trex,trexRunning,ground,groundImg,invisibleGround,cloudsGroup,ob1,ob2,ob3,ob4,ob5,ob6,gameState,restart,restartIMG,gameOver,gameOverIMG,PLAY,END,obstaclesGroup,trexcollided,score;


function preload() {
  trexRunning=loadAnimation('trex1.png', 'trex3.png', 'trex4.png');
  groundImg=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  trexcollided=loadImage("trex_collided.png");
  jump=loadSound("jump.mp3");
  checkpoint=loadSound("checkPoint.mp3");
  die=loadSound("");
  
}
function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,10,40);
   trex.addAnimation( "t1",trexRunning);
   trex.addAnimation("t2",trexcollided);
   trex.scale=0.6
  ground=createSprite(300,180,600,20)
   ground.addImage(groundImg);
  ground.x=ground.width/2;
  invisibleGround=createSprite(300,185,600,5);
  invisibleGround.visible=false;
  cloudsGroup=createGroup();
  PLAY=1;
  END=0;
  gameState=PLAY;
  gameover=createSprite(300,80,10,10);
   gameover.addImage(gameOverImg);
  restart=createSprite(300,120,10,10);
   restart.addImage(restartImg);
   restart.scale=0.6
  gameover.visible=false;
  restart.visible=false;
  obstaclesGroup=createGroup();
  score=0;
}


function draw() {
  background(255);
  drawSprites();
  if (gameState===PLAY){
    ground.velocityX=-(6+Math.round(score/100))
  if (ground.x<0) {
    ground.x=ground.width/2
     }
  if (keyDown("space")&&trex.y>154) {
      trex.velocityY=-12; 
      jump.play();
    
  }
     spawnClouds(); 
  spawnObstacles();
    score=score+Math.round(getFrameRate()/60);
  trex.velocityY=trex.velocityY+0.8;  
  if (obstaclesGroup.isTouching(trex))
    gameState=END;
  }
  else if (gameState===END){
    gameover.visible = true;
   restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("t2",trexcollided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
  }
  if (mousePressedOver(restart)) {
    reset();
  }
  trex.collide(invisibleGround);
  console.log(trex.y)
  textFont("Comic Sans MS");
  textSize(18);
  text("Score:" + score,500,60);
} 

function reset(){
  gameState= PLAY;
  restart.visible=false;
  gameover.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  count=0;
  trex.changeAnimation("t1");
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120 ));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
 function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX =-(6+Math.round(score/100));
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(ob1); break;
      case 2: obstacle.addImage(ob2); break;
      case 3: obstacle.addImage(ob3); break;
      case 4: obstacle.addImage(ob4); break;
      case 5: obstacle.addImage(ob5); break;
      case 6: obstacle.addImage(ob6); break; 
      default: break;
        
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle);
  }
}

      