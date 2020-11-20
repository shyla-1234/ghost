var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost ,ghostImg ,invisibleBlockGroup;
var invisibleBlock,tower,towerImg;
var gameState="Play";
function preload(){
  towerImg=loadImage("tower.png");
  doorImg =loadImage("door.png");
  ghostImg=loadImage("ghost-standing.png");
  climberImg=loadImage("climber.png");
 // spookySound=loadSound("spooky.wav");
}
function setup (){
  createCanvas (600,600);
  //spookySound.loop();
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup= new Group();
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage("ghost",ghostImg);
  
  
}
function draw(){
  background (0);
  if (gameState==="Play"){
    if(keyDown("left")){
      ghost.x=ghost.x-3;
      
    }
    if(keyDown("right")){
      ghost.x=ghost.x+3;
      
    }
    if(keyDown("space")){
      ghost.velocityY=-10;
    }
    ghost.velocityY=ghost.velocityY+0.8;
    if(tower.y>400){
      tower.y=300;
    }
    spawnDoors();
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if (invisibleBlockGroup.isTouching(ghost)||
        ghost.y>600){
      ghost.destroy();
      gameState="end";
        }
    drawSprites();  
  }
  if(gameState==="end"){
    stroke("yellow");
    fill("red");
    textSize(30);
    text("GAMEOVER😥",200,200);
  }

}
function spawnDoors(){
  if(frameCount % 240 === 0){
    var door=createSprite(200,-50);
    var climber=createSprite(200,10);
    var invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    door.x=Math.round(random(120,400));
    climber.x=door.x;
    invisibleBlock.x=door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    
    
    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;
    doorsGroup.add(door);
    invisibleBlock.debug=true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
  }
}

