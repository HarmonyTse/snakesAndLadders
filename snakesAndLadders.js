function assignNames(){ //This function assigns variables to the name
    var playerOneName = document.getElementById("Player1").value; //the value the user enters is assigned to 2 variables corresponding to each user
    var playerTwoName = document.getElementById("Player2").value;

    localStorage.setItem("playerOneName", playerOneName); //the variables are set to local storage so that they can be accessed from another html page
    localStorage.setItem("playerTwoName", playerTwoName);
}

function updateNames(){ //This function changes the names of the buttons through assigning the names that a user enters to the button
    var red = document.getElementById("redButton");//the names the user entered on index.html are retrieved from local storage
    var yellow = document.getElementById("yellowButton");
    if(localStorage.getItem("playerOneName") == "")//if the user has not entered a name for player one, the name red will be assigned which corresponds to the color of the player
        red.innerHTML = "Red's dice";
    else
        red.innerHTML = localStorage.getItem("playerOneName") + "'s dice";//the button will be named (player's name)'s dice so players know the button is used to roll the dice
    if(localStorage.getItem("playerTwoName") == "")//if the user has not entered a name for player one, the name yellow will be assigned which corresponds to the color of the player
        yellow.innerHTML = "Yellow's dice";
    else
        yellow.innerHTML = localStorage.getItem("playerTwoName") + "'s dice";
    return[localStorage.getItem("playerOneName"), localStorage.getItem("playerTwoName")]
}

//can check when a player should move up or down, left, or right, gameboard is fixed, so values will always be the same
let gridTop = [10, 20, 30, 40, 50, 60, 70, 80, 90] //squares on gameboard where players have to move up to get to the next square
let gridLeft = [11, 12, 13, 14, 15, 16, 17, 18, 19, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 51, 52, 53, 54, 55, 56, 
    57, 58, 59, 71, 72, 73, 74, 75, 76, 77, 78, 79, 91, 92,
    93, 94, 95, 96, 97, 98, 99] //squares on gameboard where players have to move left to get to the next square
let gridRight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 21, 22, 23, 24, 
    25, 26, 27, 28, 29, 41, 42, 43, 44, 45, 46, 47, 48, 49, 
    61, 62, 63, 64, 65, 66, 67, 68, 69, 81, 82, 83, 84, 85,
    86, 87, 88, 89] //squares on gameboard where players have to more right to get to the next square

let redLeftPosition = 20; //starting left position of red player on the game board
let redTopPosition = 870; //starting top position of red player on game board
let yellowLeftPosition = 20; //starting left position of yellow player on the game board
let yellowTopPosition = 870; //starting top position of red player on the game board
let redIndex = 1; //starting square of the red player
let yellowIndex = 1; //starting square of the yellow player
let diceRoll = 0; //declaring a variable for the dice
let startSnake = [25, 41, 46, 48, 88, 90, 96, 99]; //squares on the gameboard which mark the heads of the snake
let endSnake = [7, 5, 9, 11, 55, 31, 44, 23]; //squares on the gameboard which mark the tails of the snake
let startLadder = [3, 10, 14, 24, 35, 54, 60, 69, 71, 78, 81]; //squares on the gameboard which mark the bottom of the ladder
let endLadder = [21, 50, 36, 57, 53, 76, 63, 87, 93, 97, 100]; //squares on the gameboard which mark the top of the ladder
let message = ''; //displays a message of the moves made after player clicks a button to roll dice
let SQUARESIZE = 80; //constant number of pixels needed to move a player up, down, left, and right on the gameboard

function moveRed() { //Function moves the red player when the red dice button is pressed
    diceRoll = Math.floor(Math.random() * 6) + 1; //Generates a random number between 1-6. Math.ceil won't work
    let redImage = document.getElementById("redPlayer"); 
    let redPreviousIndex = redIndex; //redPreviousIndex keeps track of previous red index
    let names = updateNames(); //gets name user enters
    if(names[0] == "")
        names[0] = "Red"; //if user doesn't input name, the default name will be 'Red'
    let redPosition = rollDiceAndMove(redImage, redIndex, redLeftPosition, redTopPosition, names[0]); //function returns an array
    redIndex = redPosition[0];
    redLeftPosition = redPosition[1];
    redTopPosition = redPosition[2];
    if(redPreviousIndex + diceRoll < 100){
		message = String(redPosition[3]);
		message += names[0] + ' moved from ' + String(redPreviousIndex) + ' to ' + String(redIndex) + ' after rolling ' + String(diceRoll) + '. ';
    }
    if(redPreviousIndex + diceRoll == 100){
        message = String(redPosition[3]);
        message += names[0] + ' moved from ' + String(redPreviousIndex) + ' to ' + String(redIndex) + ' after rolling ' + String(diceRoll) + '. ' + names[0] + " wins!";
    }
    if(redPreviousIndex+diceRoll != 100){
        document.getElementById("redButton").style.visibility = "hidden"; //hides the red player's button to roll dice from the view of the user
        document.getElementById("yellowButton").style.visibility = "visible"; //displays yellow player's button to roll dice
    }
    document.getElementById("output").innerHTML = message; //displays message to user
	message = ''; //resets message
}

function moveYellow() { //Function moves the yellow player when the yellow dice button is pressed
    diceRoll = Math.floor(Math.random() * 6) + 1; 
    let yellowImage = document.getElementById("yellowPlayer"); 
    let yellowPreviousIndex = yellowIndex;
    let names = updateNames();
    if(names[1] == "")
        names[1] = "Yellow";
    let yellowPosition = rollDiceAndMove(yellowImage, yellowIndex, yellowLeftPosition, yellowTopPosition, names[1]);
    yellowIndex = yellowPosition[0];//the index of the yellow player is updated
    yellowLeftPosition = yellowPosition[1];//the position/coordinates of the player is updated on the board
    yellowTopPosition = yellowPosition[2];
    if(yellowPreviousIndex+diceRoll < 100){
		message = String(yellowPosition[3]);
		message += names[1] + ' moved from ' + String(yellowPreviousIndex) + ' to ' + String(yellowIndex) + ' after rolling ' + String(diceRoll) + '. ';
    }
    if(yellowPreviousIndex+diceRoll == 100){
        message = String(yellowPosition[3]);
        message += names[1] + ' moved from ' + String(yellowPreviousIndex) + ' to ' + String(yellowIndex) + ' after rolling ' + String(diceRoll) + '. ' + names[1] + " wins!" ;
    }
    if(yellowPreviousIndex+diceRoll != 100){
        document.getElementById("redButton").style.visibility = "visible"; //displays red player's button to roll dice
        document.getElementById("yellowButton").style.visibility = "hidden"; //hides the yellow player's button to roll dice from the view of the user
    }
    document.getElementById("output").innerHTML = message; // the message is updated so players know what has happened
	message = '';
}


function rollDiceAndMove(image, index, leftPosition, topPosition, name) {//checks conditions and updates all variables & values
    let winner = document.getElementById("winner"); //button that appears when player reaches 100
    
    if(index+diceRoll > 100){//checks if index exceeds 100 after rolling dice, if so it will bounce back
        let currentIndex = index;
        index = 100;
        topPosition = 160;
        leftPosition = 20;
        for(let i = 0; i < currentIndex+diceRoll-100; i++){//moves player back by how much it exceeds 100
            let playerPosition = movePlayerDown(index, leftPosition, topPosition);
            index = playerPosition[0]; 
            leftPosition = playerPosition[1]; 
            topPosition = playerPosition[2]; 
            message = playerPosition[3];
        }
	    message = name + " bounced back to square " + (100 - (currentIndex+diceRoll-100)) + ", after rolling " + diceRoll + ". ";//allows players to know what happened
    } 
    else if(index+diceRoll == 100){ //Check for winning condiiton, has to reach exactly 100
        index = 100;
	    winner.innerHTML = name + ' wins! (Click to go back to home page)';//button is displayed so players know who won and can return to the home page(index.html)
        winner.style.visibility = "visible";
        image.style.top = "160px";
        image.style.left = "20px";
        document.getElementById("redButton").style.visibility = "hidden";//both buttons disappear so that players can't continue playing the game
        document.getElementById("yellowButton").style.visibility = "hidden";
        return [index, leftPosition, topPosition, message];//values returned so the rest of function does not execute
    } 
    else {
        for (let i = 0; i < diceRoll; i++) {
            let playerPosition = [];
            playerPosition = movePlayer(index, leftPosition, topPosition); //calls the movePlayer function which moves the player on the board
            index = playerPosition[0]; //index gets updated after movePlayer which will move it once until i is greater than diceRoll
            leftPosition = playerPosition[1]; 
            topPosition = playerPosition[2];
        }
    }
    
    let playerPosition = checkSnakeAndLadder(index, leftPosition, topPosition, name);//function called, values returned in array
    index = playerPosition[0]; //index is the current square number of the player, can keep track of where they are
    leftPosition = playerPosition[1]; //left position is for styling, so the player will move on the board(left and right), and users can see the movement
    topPosition = playerPosition[2]; //top position is for styling, and moving the player up and down
    message += playerPosition[3];
    if(index == 100){ //You need this piece of code if there is a ladder that ends at 100
        index = 100;
	    winner.innerHTML = name + ' wins! (Click to go back to home page)';
        winner.style.visibility = "visible";
        image.style.top = "160px";
        image.style.left = "20px";
        document.getElementById(redButton).style.visibility = "hidden";
        document.getElementById(yellowButton).style.visibility = "hidden";
        return [index, leftPosition, topPosition, message];
    } 
    image.style.top = topPosition + "px";
    image.style.left = leftPosition + "px";
    let result = [index, leftPosition, topPosition, message];
    return result;
}

function movePlayer(index, leftPosition, topPosition) {//moves player up the board, used for ladders and normal movements
    if (gridTop.includes(index)) {
        topPosition -= SQUARESIZE; //move player image up 80 pixels
    } else if (gridLeft.includes(index)) {
        leftPosition -= SQUARESIZE;//move player image left 80 pixels
    } else if (gridRight.includes(index)) {
        leftPosition += SQUARESIZE;//move player image right 80 pixels
    }
    index++;
    let result = [index, leftPosition, topPosition];
    return result;
}

function movePlayerDown(index, leftPosition, topPosition) {//moves player down the board, used in case of snakes or bouncing back
    index--;
    if (gridTop.includes(index)) {
        topPosition += SQUARESIZE; //move player image down by 80 pixels
    } else if (gridLeft.includes(index)) {
        leftPosition += SQUARESIZE;//moves player image right by 80 pixels
    } else if (gridRight.includes(index)) {
        leftPosition -= SQUARESIZE;//moves player image left by 80 pixels
    }
    let result = [index, leftPosition, topPosition];//creates an array, so that it can return/update multiple variables
    return result;
}

function checkSnakeAndLadder(index, leftPosition, topPosition, name) { //this function checks if the index matches any snakesand moves the player accordingly on the board
    let message = ''; // Declare message outside of loops to make it accessible for both conditions
  
    for (let i = 0; i < startSnake.length; i++) {//the for loop runs through startSnake to check if the index matches any of the snakes
        if (index == startSnake[i]) {
            let diff = startSnake[i] - endSnake[i];
            for (let j = 0; j < diff; j++) {
                let playerPosition = movePlayerDown(index, leftPosition, topPosition);//if the index matches startSnake[i], then the function will move the player to endSnake[i]
                index = playerPosition[0];//each value returned will be assigned to update the position
                leftPosition = playerPosition[1];
                topPosition = playerPosition[2];
            }
            message = "Oh no! " + name + " got eaten by a snake! ";//the message is updated allowing users to know what has happened
        }
    }
    for (let i = 0; i < startLadder.length; i++) {//the same logic from the snake is applied to the ladders, as it searches for a match
        if (index == startLadder[i]) {
            let diff = endLadder[i] - startLadder[i];
            for (let j = 0; j < diff; j++) {
                let playerPosition = movePlayer(index, leftPosition, topPosition);//once a match is found then it calls movePlayer() until it has reached its intended position
                index = playerPosition[0];//each value is assigned to update the position
                leftPosition = playerPosition[1];
                topPosition = playerPosition[2];
            }
            message = "Yay! " + name + " moved up a ladder! ";//the message is also updated, so users know that their player has gone up a ladder
        }
    }  
    let result = [index, leftPosition, topPosition, message];// all these values are put into an array
    return result; //and the values are returned to update the variables globally
}
