var player,ground,trees,apples,enemys,arrows,bow;
var score=0;
var alive=true;

function setup(){
  createCanvas(windowWidth,windowHeight-20);
  player=createSprite(100,height-100,20,40);
  ground=createSprite(width/2,height-20,width*800,20);
  bow=createSprite(player.x,player.y,80,4);
  trees=createGroup();
  apples=createGroup();
  arrows=createGroup();
  enemys=createGroup();
}

function draw(){
  background("#ffffff");

  player.velocityY+=0.05;
  if(alive){
    if(keyDown("space") && player.collide(ground)){
      player.velocityY=-3;
    }
    if(keyDown(RIGHT_ARROW)){
      bow.rotation+=2;
    }
    if(keyDown(LEFT_ARROW)){
      bow.rotation-=2;
    }
    if(keyWentDown(UP_ARROW)){
      let arrow=createSprite(player.x,player.y,5,5);
      arrow.rotation=bow.rotation-90;
      arrow.velocityX=-sin(bow.rotation-90)*8;
      arrow.velocityY=-cos(bow.rotation+90)*8;
      arrows.add(arrow);
    }
    for(let i in arrows){
      arrows[i].velocityY+=0.05;
    }
    if(player.isTouching(enemys)){
      alive=false;
    }
    drawSprites();
  }
  else{
    text("DEAD!!!!!!!!!    space to restart",0,height/2);
    if(keyDown("space") && player.collide(ground)){
      alive=true;
      score=0;
    }
    apples.destroyEach();
    enemys.destroyEach();
    trees.destroyEach();
  }
  text(score,width/2,20);
  arrows.collide(ground,killArrow);
  player.collide(ground);
  arrows.collide(apples,eat);
  bow.y=player.y;
  createArrow();
  createTree();
}

function killArrow(arrow){
  arrow.destroy();
}

function eat(rock,apple){
  rock.destroy();
  apple.destroy();
  score++;
}

function createTree(){
  if(frameCount%100==0){
    var tree=createSprite(width+40,height-70,40,100);
    tree.velocityX=-1;
    tree.lifetime=1000;
    var r=random(0,20);
    var rr=random(0,360);
    var apple=createSprite(tree.x+sin(rr)*r,tree.y-25+cos(rr)*r,5,5);
    apple.velocityX=-1;
    apple.lifetime=1000;
    apple.shapeColor="#ff0000";
    apples.add(apple);
    //tree.visible=false;
    player.depth=tree.depth+1;
  }
}

function createArrow(){
  if(frameCount%(500/score)<1 && Math.round(random(0,5))==0){
    var arrow=createSprite(width+40,height-50,10,2);
    arrow.velocityX=-(score/60+1);
    arrow.lifetime=1000;
    enemys.add(arrow);
  }
}