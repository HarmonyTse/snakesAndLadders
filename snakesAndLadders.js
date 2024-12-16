function assignNames(){ //This function assigns variables to the name
    var playerOneName = document.getElementById("Player1").value; //the value the user enters is assigned to 2 variables corresponding to each user
    var playerTwoName = document.getElementById("Player2").value;

    localStorage.setItem("playerOneName", playerOneName); //the variables are set to local storage so that they can be accessed from another html page
    localStorage.setItem("playerTwoName", playerTwoName);
}

function updateNames(){ //This function changes the names of the buttons through assigning the names that a user enters to the button
    var red = document.getElementById("redButton");
    var yellow = document.getElementById("yellowButton");
    if(localStorage.getItem("playerOneName") == "")
        red.innerHTML = "Red's dice";
    else
        red.innerHTML = localStorage.getItem("playerOneName") + "'s dice";
    if(localStorage.getItem("playerTwoName") == "")
        yellow.innerHTML = "Yellow's dice";
    else
        yellow.innerHTML = localStorage.getItem("playerTwoName") + "'s dice";
    return[localStorage.getItem("playerOneName"), localStorage.getItem("playerTwoName")]
}

// TODO: Describe the use of grid
let gridTop = [10, 20, 30, 40, 50, 60, 70, 80, 90]
let gridLeft = [11, 12, 13, 14, 15, 16, 17, 18, 19, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 51, 52, 53, 54, 55, 56, 
    57, 58, 59, 71, 72, 73, 74, 75, 76, 77, 78, 79, 91, 92,
    93, 94, 95, 96, 97, 98, 99]
let gridRight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 21, 22, 23, 24, 
    25, 26, 27, 28, 29, 41, 42, 43, 44, 45, 46, 47, 48, 49, 
    61, 62, 63, 64, 65, 66, 67, 68, 69, 81, 82, 83, 84, 85,
    86, 87, 88, 89]

let redLeftPosition = 20;
let redTopPosition = 870;
let yellowLeftPosition = 20;
let yellowTopPosition = 870;
let redIndex = 1;
let yellowIndex = 1;
let diceRoll = 0;
let startSnake = [25, 41, 46, 48, 88, 90, 96, 99];
let endSnake = [7, 5, 9, 11, 55, 31, 44, 23];
let startLadder = [3, 10, 14, 24, 35, 54, 60, 69, 71, 78, 81];
let endLadder = [21, 50, 36, 57, 53, 76, 63, 87, 93, 97, 100];
let message = '';

function moveRed() {
    diceRoll = Math.floor(Math.random() * 6) + 1; // TODO: Add a note that math.ceil will not work
    let redImage = document.getElementById("redPlayer");
	let redPreviousIndex = redIndex;
    let names = updateNames();
    let redPosition = rollDiceAndMove(redImage, redIndex, redLeftPosition, redTopPosition, names[0]);
    redIndex = redPosition[0];
    redLeftPosition = redPosition[1];
    redTopPosition = redPosition[2];
	message = String(redPosition[3]);
	message += names[0] + ' moved from ' + String(redPreviousIndex) + ' to ' + String(redIndex) + ' after rolling ' + String(diceRoll) + '.';
    document.getElementById("redButton").style.visibility = "hidden";
    document.getElementById("yellowButton").style.visibility = "visible";
    document.getElementById("output").innerHTML = message;
	message = '';
}

function moveYellow() {
    diceRoll = Math.floor(Math.random() * 6) + 1; //Explain how this functions
    let yellowImage = document.getElementById("yellowPlayer"); //TODO this assigns a variable to the image from html
	let yellowPreviousIndex = yellowIndex;
    let names = updateNames();
    let yellowPosition = rollDiceAndMove(yellowImage, yellowIndex, yellowLeftPosition, yellowTopPosition, names[1]);
    yellowIndex = yellowPosition[0];
    yellowLeftPosition = yellowPosition[1];
    yellowTopPosition = yellowPosition[2];
	message = String(yellowPosition[3]);
	message += names[1] + ' moved from ' + String(yellowPreviousIndex) + ' to ' + String(yellowIndex) + ' after rolling ' + String(diceRoll) + '.';
    document.getElementById("redButton").style.visibility = "visible";
    document.getElementById("yellowButton").style.visibility = "hidden";
    document.getElementById("output").innerHTML = message;
	message = '';
}


function rollDiceAndMove(image, index, leftPosition, topPosition, color) {
    let winner = document.getElementById("winner");
    
    if(index+diceRoll > 100){
        let currentIndex = index;
        index = 100;
        topPosition = 160;
        leftPosition = 20;
        for(let i = 0; i < currentIndex+diceRoll-100; i++){
            let playerPosition = movePlayerDown(index, leftPosition, topPosition);
            index = playerPosition[0]; 
            leftPosition = playerPosition[1]; 
            topPosition = playerPosition[2]; 
            message = playerPosition[3];
        }
    } else if(index+diceRoll == 100){ //Check for winning condiiton
        index = 100;
	    winner.innerHTML = color + ' wins! (Click to go back to home page)';
        winner.style.visibility = "visible";
        image.style.top = "160px";
        image.style.left = "20px";
        document.getElementById(redButton).style.visibility = "hidden";
        document.getElementById(yellowButton).style.visibility = "hidden";
        return [index, leftPosition, topPosition, message];
    } else {
        for (let i = 0; i < diceRoll; i++) {
            let playerPosition = [];
            playerPosition = movePlayer(index, leftPosition, topPosition); //TODO list elements of position
            index = playerPosition[0]; //TODO state what this means
            leftPosition = playerPosition[1]; //TODO state what this means
            topPosition = playerPosition[2];//TODO state what this means
        }
    }
    
    let playerPosition = checkSnakeAndLadder(index, leftPosition, topPosition);
    index = playerPosition[0]; //TODO what does index mean
    leftPosition = playerPosition[1]; //TODO what is the left position
    topPosition = playerPosition[2]; //TODO what is the right position
    message = playerPosition[3];
    image.style.top = topPosition + "px";
    image.style.left = leftPosition + "px";
    let result = [index, leftPosition, topPosition, message];
    return result;
}

function movePlayer(index, leftPosition, topPosition) {
    if (gridTop.includes(index)) {
        topPosition -= 80; // TODO: Make constant for the magic number 80
    } else if (gridLeft.includes(index)) {
        leftPosition -= 80;
    } else if (gridRight.includes(index)) {
        leftPosition += 80;
    }
    index++;
    let result = [index, leftPosition, topPosition];
    return result;
}

function movePlayerDown(index, leftPosition, topPosition) {
    index--;
    if (gridTop.includes(index)) {
        topPosition += 80; //move player image down by 80 pixels
    } else if (gridLeft.includes(index)) {
        leftPosition += 80;
    } else if (gridRight.includes(index)) {
        leftPosition -= 80;
    }
    let result = [index, leftPosition, topPosition];
    return result;
}

// TODO: Add comment for each function
function checkSnakeAndLadder(index, leftPosition, topPosition) {
    let message = ''; // Declare message outside of loops to make it accessible for both conditions
  
    for (let i = 0; i < startSnake.length; i++) {
        if (index == startSnake[i]) {
            let diff = startSnake[i] - endSnake[i];
            for (let j = 0; j < diff; j++) {
                let playerPosition = movePlayerDown(index, leftPosition, topPosition);
                index = playerPosition[0];
                leftPosition = playerPosition[1];
                topPosition = playerPosition[2];
            }
            message = 'Oh no! The player got eaten by a snake!';
        }
    }
    


    for (let i = 0; i < startLadder.length; i++) {
        if (index == startLadder[i]) {
            let diff = endLadder[i] - startLadder[i];
            for (let j = 0; j < diff; j++) {
                let playerPosition = movePlayer(index, leftPosition, topPosition);ß
                index = playerPosition[0];
                leftPosition = playerPosition[1];
                topPosition = playerPosition[2];
            }
            message = 'Yay! The player moved up a ladder!';
        }
    }  
    let result = [index, leftPosition, topPosition, message];
    return result; 
}