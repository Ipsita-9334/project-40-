var playerCount, gameState = 0, allPlayers;
var game, form, player;
var database;
var car1, car2, car3, car4, cars;
var car1Img, car2Img, car3Img, car4Img, trackImg;
var finishedPlayers = 0, passedFinishPoint;

function preload(){
    car1Img = loadImage("images/car1.png");
    car2Img = loadImage("images/car2.png");
    car3Img = loadImage("images/car3.png");
    car4Img = loadImage("images/car4.png");
    trackImg = loadImage("images/track.jpg");
}


function setup(){
    createCanvas(displayWidth - 30, displayHeight - 110);
    database = firebase.database();
   
    game = new Game();
    game.getState();
    game.start();

    

}

function draw(){
   if(playerCount === 4){
       game.update(1);
   }
   
   if(gameState === 1){
       clear();
       game.play();
       console.log("play Function called");
   }

   if(gameState === 2){
       game.displayRank();
   }

   if(finishedPlayer === 4){
       gameState = 2;
   }
}

