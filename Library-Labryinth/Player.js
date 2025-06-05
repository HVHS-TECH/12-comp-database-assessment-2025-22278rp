/*******************************************************/
// Robot Explorer
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/
var maxSpeed = 2;
var friction = 0.125;
var movementSpeed = 0;
const JUMP_SPEED = 4;
var acceleration = 0.25;

/*******************************************************/
// Functions
/*******************************************************/
// Function to handle all player movement logic
function robotMovement() {
	// Lock rotation so the robot doesn't spin when colliding
	player.rotationLock = true;

	// Apply friction to slow down movement over time
	// (Simulates natural deceleration when no keys are pressed)
	if (movementSpeed > friction) {
		movementSpeed = movementSpeed - friction;

	}
	else if (movementSpeed < -friction) {
		movementSpeed = movementSpeed + friction;
	}
	else {
		movementSpeed = 0;
	}



	if (kb.pressing('a')) {
		var tempSpeed = movementSpeed;
		tempSpeed = tempSpeed - acceleration;
		if (tempSpeed <= -maxSpeed) {
			movementSpeed = -maxSpeed;
		}
		else {
			movementSpeed = tempSpeed;
		}
		player.vel.x = movementSpeed;

	}
	else if (kb.pressing('d')) {
		var tempSpeed = movementSpeed;
		tempSpeed = tempSpeed + acceleration;
		if (tempSpeed >= maxSpeed) {
			movementSpeed = maxSpeed;
		}
		else {
			movementSpeed = tempSpeed;
		}
		player.vel.x = movementSpeed;
	}

	if (kb.presses('w') && player.colliding(wood) || kb.presses('w') && player.colliding(planks) || kb.presses('w') && player.colliding(bookShelf) || kb.presses('w') && player.colliding(bookBoxes)) {
		player.vel.y = -JUMP_SPEED;
	}

}
