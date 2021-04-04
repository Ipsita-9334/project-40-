class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", (state)=>{
            gameState = state.val();
        });
    }

    update(state){
        database.ref("/").update({
            gameState: state
        });
    }

    async start(){
        if(gameState === 0){
            player = new Player()
            var playerCountRef = await database.ref("playerCount").once("value")
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();

            }
            form = new Form()
            form.display();
        }

        car1 = createSprite(100, 200);
        car1.addImage(car1Img);
        car2 = createSprite(300, 200);
        car2.addImage(car2Img);
        car3 = createSprite(500, 200);
        car3.addImage(car3Img);
        car4 = createSprite(700, 200);
        car4.addImage(car4Img);
        cars = [car1, car2, car3, car4];
        passedFinishPoint = false;
    

    }

    play(){
        form.hide();
        Player.getPlayerInfo();
        player.getFinishedPlayers();
        console.log(allPlayers);
        if(allPlayers !== undefined){
           // var yPosition = 100;
           background(90)
           image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight * 5);
           var index = 0;
           var x = 260, y;
            for(var plr in allPlayers){
                index = index + 1;
                x = x + 230;
                y = displayHeight - allPlayers[plr].distance
                cars[index - 1].x = x;
                cars[index - 1].y = y;
                if(index === player.index){
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index - 1].y
                    
                    fill("red");
                    stroke(10);
                    ellipse(x , y, 80);
                }
                textSize(25);
                fill("red");
                textAlign(CENTER);
                strokeWeight(3);
                text(allPlayers[plr].name ,cars[index - 1].x, cars[index - 1].y + 70);
                //yPosition += 30;

            }

        }

        if(keyIsDown(UP_ARROW) && player.index !== null && passedFinishPoint !== true){
            player.distance += 50;
            player.update();

        }

        if(player.distance > 4500 && passedFinishPoint === false){
            Player.updateFinishedPlayers()
            player.rank = finishedPlayers;
            player.update();
            passedFinishPoint = true;
        }
        drawSprites();        
    }
    

    displayRank(){
        console.log("game ended");
    }
}