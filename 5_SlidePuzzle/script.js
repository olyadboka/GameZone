var rows = 3;
var columns = 3;

var curTile;
var otherTile; //blank tile

var turns = 0;

var imgOrder = ["1","2","3","4","5","6","7","8","9"];

window.onload = function(){
    for(let r = 0; r < rows; r++){
        for(let c= 0; c< columns; c++){
            let tile = document.createElement("img");
            tile.id = r.toString() +  "-" +  c.toString();
            tile.src = "./images/" +imgOrder.shift() + ".jpg";

            //Switching Tiles
            tile.addEventListener("dragstart", dragStart);   //click an image to swap
            tile.addEventListener("dragover", dragOver);     //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);   //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);   //leaving it in it's own place
            tile.addEventListener("drop", dragDrop);         //drop
            tile.addEventListener("dragend", dragEnd);       //swap the two tiles


            document.getElementById("board").append(tile);
        }
    }
}

function dragStart(){
    curTile = this;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){
    
}

function dragDrop(){
    otherTile = this;
}

function dragEnd(){

    let curCords = curTile.id.split("-");
    let r = parseInt(curCords[0]);
    let c = parseInt(curCords[1]);

    let otherCords = otherTile.id.split("-");
    let r2 = parseInt(otherCords[0]);
    let c2 = parseInt(otherCords[1]);

    let moverLeft = r == r2 && c2 == c -1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 ==  r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moverLeft||moveRight||moveDown||moveUp;

    if(isAdjacent){
        let curImg = curTile.src;
        let otherImg = otherTile.src;

        curTile.src = otherImg;
        otherTile.src = curImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
}