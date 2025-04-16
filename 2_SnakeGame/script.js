var boxSize = 25;
var row = 20;
var col = 20;
var board;
var context;

var snakeX = boxSize*10;
var snakeY = boxSize*10;

var snakeBody = [];

var foodX = boxSize*5;
var foodY = boxSize*5;

let velocityX = 0;
let velocityY = 0;

var gameOver = false;

var scoreCount = 0;

window.onload = function(){
    board = document.getElementById('board');
    board.height = row*boxSize;
    board.width = col*boxSize;
    context = board.getContext('2d');

    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 170); //milliseconds
}

function update(){
    if(gameOver){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, boxSize, boxSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]);
        placeFood();
        scoreCount +=5;
        score.textContent = "SCORE: " + scoreCount;
    }   
    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX*boxSize;
    snakeY += velocityY*boxSize;
    context.fillRect(snakeX,snakeY,boxSize,boxSize);
    for(let i = 0; i< snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize);

    }

    if(snakeX < 0 || snakeX > col*boxSize-1|| snakeY < 0 || snakeY > row*boxSize-1){
        gameOver = true;
        
        alert("Game Over!!");
    }
    for(let i = 0; i< snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver=true;
            
            alert("Game Over!");
            
        }
    }
}

function placeFood(){
    foodX = Math.floor(Math.random()*col)*boxSize;
    foodY = Math.floor(Math.random()*row)*boxSize;
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1 ){
        velocityX = 0;
        velocityY = -1;
    }
    if(e.code == "ArrowDown" && velocityY != -1 ){
        velocityX = 0;
        velocityY = 1;
    }
    if(e.code == "ArrowRight" && velocityX != -1 ){
        velocityX = 1;
        velocityY = 0;
    }
    if(e.code == "ArrowLeft" && velocityX != 1 ){
        velocityX = -1;
        velocityY = 0; 
    }
}