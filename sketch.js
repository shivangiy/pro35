//create variables here
var dog,happyDog,database,foodS,foodStock

function preload()
{
  //load images here
  dogImg=loadImage ("images/dogImg.png")
  happyDogImg=loadImage ("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  foodStock=database.ref('food')
  foodStock.on("value",readstock);
  foodStock.set(15)

  dog=createSprite(250,350,10,60);
  dog.addImage(dogimage)
  dog.scale=0.2
  
}


function draw() {  
  background('blue')
  if (foodS!==undefined){
textSize(20)
Fill(225)
text ("Note:PRESS UP ARROW TO FEED DARGO MILK",50,50);
text("Food Remaining: "+foodS,150,150);

if (KeyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happydogImage)
}

if (KeyWentup(UP_ARROW)){
  dog.addImage(dogImage)
}

if (foodS ===0){
foodS=15;
}
  }

  drawSprites();
  //add styles here

}
function writeStock(x){
  if(x<0){
    x=0;
  }
  else{
    x = x-1
  }
  database.ref("/").update({
    food:x
  });
}

function readStock(data){
  foodS=data.val();
}