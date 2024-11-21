function assignColor(color){
    let image = document.getElementById("player");
    image.src = color;
}
/*
let grid = [[100, 99, 98, 97, 96, 95, 94, 93, 92, 91], 
            [81, 82, 83, 84, 85, 86, 87, 88, 89, 90], 
            [80, 79, 78, 77, 76, 75, 74, 73, 72, 71], 
            [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
            [60, 59, 58, 57, 56, 55, 54, 53, 52, 51], 
            [41, 42, 43, 44, 45, 46, 47, 48, 49, 50], 
            [40, 39, 38, 37, 36, 35, 34, 33, 32, 31], 
            [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 
            [20, 29, 28, 27, 26, 25, 24, 23, 22, 21],
            [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 
            [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]];
*/
let startSnake = [25, 41, 46, 48, 88, 90, 96, 99]
let endSnake = [7, 5, 9, 11, 55, 31, 44, 99]
let startLadder = [3, 10, 14, 24, 35, 54, 60, 71, 78, 81]
let endLadder = [21, 50, 36, 57, 53, 76, 63, 93, 97, 100]

let diceRoll = Math.floor(Math.random()*6)+1;
let position1 = 1;
let position2 = 1;

/*Still have to make image move*/
function movePlayer1(){
    if(position1 + diceRoll < 100)
    {
        position1 = position1 + diceRoll;
    }
    for(let i == 0; i < startSnake.length; i++)
    {
        if(position1 == startSnake[i])
        {
            position1 = endSnake[i];
        }
    }
    for(let i == 0; i < startLadder.length; i++)
    {
        if(position1 == startLadder[i])
        {
            position1 = endLadder[i];
        }
    }
    if(position1 == 100);
    {
        /*display you win*/
    }    
}

function movePlayer2()
{
    if(position2 + diceRoll < 100)
    {
        position2 = position2 + diceRoll;
    }
    for(let i == 0; i < startSnake.length; i++)
    {
        if(position2 == startSnake[i])
        {
            position2 = endSnake[i];
        }
    }
    for(let i == 0; i < startLadder.length; i++)
    {
        if(position2 == startLadder[i])
        {
            position2 = endLadder[i];
        }
    }
    if(position2 == 100);
    {
        /*display you win*/
    }    
}
    

/*
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
