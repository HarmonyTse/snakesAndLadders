function assignNames(){ //This function assigns variables to the name
    var playerOneName = document.getElementById("Player1").value; //the value the user enters is assigned to 2 variables corresponding to each user
    var playerTwoName = document.getElementById("Player2").value;

    localStorage.setItem("playerOneName", playerOneName); //the variables are set to local storage so that they can be accessed from another html page
    localStorage.setItem("playerTwoName", playerTwoName);
}

function updateNames(){ //This function changes the names of the buttons through assigning the names that a user enters to the button
    var red = document.getElementById("redButton");
    red.innerHTML = localStorage.getItem("playerOneName") + "'s dice";
    var yellow = document.getElementById("yellowButton");
    yellow.innerHTML = localStorage.getItem("playerTwoName") + "'s dice";
}

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
let redTopPosition = 840;
let yellowLeftPosition = 20;
let yellowTopPosition = 840;
let redIndex = 1;
let yellowIndex = 1;
let diceRoll = 5;
let startSnake = [25, 41, 46, 48, 88, 90, 96, 99];
let endSnake = [7, 5, 9, 11, 55, 31, 44, 23];
let startLadder = [3, 10, 14, 24, 35, 54, 60, 69, 71, 78, 81];
let endLadder = [21, 50, 36, 57, 53, 76, 63, 87, 93, 97, 100];

function moveRed() {
//    diceRoll = Math.floor(Math.random() * 6) + 1;
    let redImage = document.getElementById("redPlayer");
    let redPosition = rollDiceAndMove(redImage, redIndex, redLeftPosition, redTopPosition);
    redIndex = redPosition[0];
    redLeftPosition = redPosition[1];
    redTopPosition = redPosition[2];
    document.getElementById("redButton").style.visibility = "hidden";
    document.getElementById("yellowButton").style.visibility = "visible";
    document.getElementById("output").innerHTML = redIndex;
}

function moveYellow() {
//    diceRoll = Math.floor(Math.random() * 6) + 1;
    let yellowImage = document.getElementById("yellowPlayer");
    let yellowPosition = rollDiceAndMove(yellowImage, yellowIndex, yellowLeftPosition, yellowTopPosition);
    yellowIndex = yellowPosition[0];
    yellowLeftPosition = yellowPosition[1];
    yellowTopPosition = yellowPosition[2];
    document.getElementById("redButton").style.visibility = "visible";
    document.getElementById("yellowButton").style.visibility = "hidden";
    document.getElementById("output").innerHTML = yellowIndex;
}

let winning = document.getElementById("winner");

function rollDiceAndMove(image, index, leftPosition, topPosition) {
    for (let i = 0; i < diceRoll; i++) {
        if(index+1 > 100)
            break;
        let playerPosition = []
        playerPosition = movePlayer(index, leftPosition, topPosition);
        index = playerPosition[0];
        leftPosition = playerPosition[1];
        topPosition = playerPosition[2];
    }
    if(index >= 100){
        winning.innerHTML = "You Win!";
        winning.style.visibility = "visible";
    }
    
    let playerPosition = checkSnakeAndLadder(index, leftPosition, topPosition);
    index = playerPosition[0];
    leftPosition = playerPosition[1];
    topPosition = playerPosition[2];
    image.style.top = topPosition + "px";
    image.style.left = leftPosition + "px";
    let result = [index, leftPosition, topPosition];
    return result;
}

function movePlayer(index, leftPosition, topPosition) {
    if (gridTop.includes(index)) {
        topPosition -= 80;
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
        topPosition += 80;
    } else if (gridLeft.includes(index)) {
        leftPosition += 80;
    } else if (gridRight.includes(index)) {
        leftPosition -= 80;
    }
    let result = [index, leftPosition, topPosition];
    return result;
}


function checkSnakeAndLadder(index, leftPosition, topPosition) {
    for (let i = 0; i < startSnake.length; i++) {
        if (index == startSnake[i]) {
            let diff = startSnake[i] - endSnake[i];
            for (let j = 0; j < diff; j++) {
                let playerPosition = movePlayerDown(index, leftPosition, topPosition);
                index = playerPosition[0];
                leftPosition = playerPosition[1];
                topPosition = playerPosition[2];
            }
        }
    }

    for (let i = 0; i < startLadder.length; i++) {
        if (index == startLadder[i]) {
            let diff = endLadder[i] - startLadder[i];
            for (let j = 0; j < diff; j++) {
                let playerPosition= movePlayer(index, leftPosition, topPosition);
                index = playerPosition[0];
                leftPosition = playerPosition[1];
                topPosition = playerPosition[2];
            }
        }
    }
    let result = [index, leftPosition, topPosition];
    return result;
}



/*
function movePlayer(index, leftPosition, topPosition){ //this function moves the player according to the diceroll and position on board
    if(index % 10 == 0)
    {
        topPosition -= 110*
}


##BRAINSTORMING

function movePlayer(position){ ##function alternates between assigning parameter as position1 or position2
    if(position + diceRoll < 100)
    {
        position = position + diceRoll;
    }
    for(let i == 0; i < startSnake.length; i++)
    {
        if(position == startSnake[i])
        {
            position = endSnake[i];
        }
    }
    for(let i == 0; i < startLadder.length; i++)
    {
        if(position == startLadder[i])
        {
            position = endLadder[i];
        }
    }
    if(position == 100);
    {
        //display you win
    }    
}

Player moves right one square by adding 110 px
Players moves up one square by subtracting 110 px

PLAYER IS AT 1: LEFT 120 px TOP: 1050 px
}


let grid = [[100, 99, 98, 97, 96, 95, 94, 93, 92, 91], 
            [81, 82, 83, 84, 85, 86, 87, 88, 89, 90], 
            [80, 79, 78, 77, 76, 75, 74, 73, 72, 71], 
            [70, 69, 68, 67, 66, 65, 64, 63, 62, 70],
            [60, 59, 58, 57, 56, 55, 54, 53, 52, 51], 
            [50, 49, 48, 47, 46, 45, 44, 43, 42, 41], 
            [40, 39, 38, 37, 36, 35, 34, 33, 32, 31], 
            [30, 9, 68, 67, 66, 65, 64, 63, 62, 61]]
*/
