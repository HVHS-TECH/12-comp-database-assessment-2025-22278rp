
//variables
const canvasWidth = 500;
const canvasHeight = 500;
const movementSpeed = 5;
var Player;
var coin;
var gameState = "play";
var score = 0;
const COINSIZE = 10;
const COIN_TIMEOUT = 5000;
const PLAYERSIZE = 20;

let sheetImg;
function preload() {
	sheetImg = loadImage("imagesCoin/coin.png");
    imgBG   = loadImage('imagesCoin/backgroundCoin.png');
}
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
	cnv = new Canvas(canvasWidth, canvasHeight, "Pixelated x4");
	Player = new Sprite(100, 100, PLAYERSIZE, PLAYERSIZE, 'd');
	Player.color = 'orange';
    Player.rotationSpeed = 0;
    coinGroup = new Group();
    coinGroup.add(createCoin());

    coinGroup.collides(Player, playerHitCoin);
    function playerHitCoin(coin, Player) {
        // Delete the alien which was hit
        coin.remove();
        score++
        Player.rotationSpeed = 0;
        Player.rotation = 0;
       
    }	

}

/*******************************************************/
// draw()
/*******************************************************/

function draw() {
    if (gameState == "play") {
        runGame();
    }
    else if (gameState == "lose") {
        loseGame();
    }
		
}
function runGame() {
    background(imgBG);
    if (random(0,500)<7) {
        coinGroup.add(createCoin());
    }
    movePlayer ();
    for (var i = 0; i < coinGroup.length; i++) {
        // Check Coin time should return true if the coin is old and needs to be deleted
    if(checkCoinTime(coinGroup[i])) {
        coinGroup[i].remove();
        gameState = "lose";
        console.log (gameState);
        fb_initialise();
        fb_detectLoginChange();
        fb_writeScore(score);
        }
    }
    
    displayScore ();
   
}
function loseGame() {
    background('red');
	Player.remove();
	coinGroup.remove();
	fill(0, 0, 0);
	textSize(50);
	text("You missed a coin! ", 10,100);
	textSize(100);
	text("Score: " + score, 10,200);
    
    
}
function createCoin () {
    coin = new Sprite(random (0, canvasHeight), random (0, canvasHeight), COINSIZE, 'd');
    coin.color = 'yellow';
    coin.image = (sheetImg);
    //coin.addAni({w:16, h:16, row:1, col:1});
    //coinGroup.add(coin);
    coin.spawntime = millis();
    return(coin);
  
}
function displayScore () {
    textSize(30);
    text("Score: "+ score, 0, 25);
}
function checkCoinTime (_coin) {
    //check if the coin has been around too long (COIN_TIMEOUT milliseconds)
    if (_coin.spawntime + COIN_TIMEOUT < millis()){
        return(true);// Coin is old
    }
	return(false);//Coin is young
}


function movePlayer () {
	if (kb.pressing('a')) {

        // Set sprite's velocity to the left
        Player.vel.x = -movementSpeed;
    
    }
    
    else if (kb.pressing ('d')) 
    {
        // Set sprite's velocity to the right
        Player.vel.x = movementSpeed;	   
    
    }
    else if (kb.pressing ('w')) 
        {
            // Set sprite's velocity to the left
            Player.vel.y = -movementSpeed;	   
        
        }
    else if (kb.pressing ('s')) 
        {
            
                Player.vel.y = movementSpeed;	   
            
        };
    
    if (kb.released('a')) {
    
        // Set sprite's velocity to zero
        Player.vel.x = 0;
    
    }
    
    else if (kb.released('d')) 
    {
        // Set sprite's velocity to zero
        Player.vel.x = 0;
    }
    else if (kb.released('w')) 
        {
            // Set sprite's velocity to zero
            Player.vel.y = 0;
        }
    
    else if (kb.released('s')) 
            {
                // Set sprite's velocity to zero
                Player.vel.y = 0;
            };
}

/*******************************************************/
//  END OF APP
/*******************************************************/