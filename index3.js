var rows=5, cols=5, turns=0;

var curTile, nextTile;

let tilesOrder = [];
for(let i=1;i<=rows*cols;i++){
    tilesOrder.push(i.toString());
}

window.onload = () => {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            //append image with id 0-0
            let tile = document.createElement("img");
            // tile.id = r.toString() + "-" + c.toString();
            tile.src = "./tiles3/" + tilesOrder.shift() + ".jpg";
            document.getElementById("board").append(tile);
    
        }
    }
    // let tile = document.createElement("img");
    // // tile.id = r.toString() + "-" + c.toString();
    // tile.src = "./tiles/4x4.png";
}

function reshuffle(){
    tilesOrder = ["5","1","7","17","6","8","11","18","3","14","19","9","13","20","4","21","15","25","12","22","10","2","23","16","24"];
    // tilesOrder = ["2","1","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"];
    
    document.getElementById("board").replaceChildren();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            //append image with id 0-0
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./tiles3/" + tilesOrder.shift() + ".jpg";
            
            //Drag function()s
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}
function reStart(){
    document.getElementById("board").replaceChildren();

    for(let i=1;i<=rows*cols;i++){
        tilesOrder[i-1]=i.toString();
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            //append image with id 0-0
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./tiles3/" + tilesOrder.shift() + ".jpg";
            document.getElementById("board").append(tile);
    
        }
    }
    turns=0;
    document.getElementById("turns").innerText = turns;
    document.getElementById("resultHeading").replaceChildren();
}

function dragStart() {
    curTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    nextTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {

    //can only replace blank tile
    // if(!nextTile.src.includes("16.png")){
    //     return;
    // }

    //get co-ord of cur and next images
    let curCord = curTile.id.split("-");
    let r1=parseInt(curCord[0]);
    let c1=parseInt(curCord[1]);

    let nextCord = nextTile.id.split("-");
    let r2=parseInt(nextCord[0]);
    let c2=parseInt(nextCord[1]);

    //check positions to move
    let canLeft = r2==r1 && c2==c1-1, canRight = r2==r1 && c2==c1+1, canUp = c2==c1 && r2==r1-1, canDown = c2==c1 && r2==r1+1;
    let isAdjacent = (canLeft || canRight || canUp || canDown);
    
    //swap only if adjacent
    if(isAdjacent){
        let curImg = curTile.src, nextImg = nextTile.src;
        curTile.src = nextImg;
        nextTile.src = curImg;
        
        //update turns
        turns+=1;
        document.getElementById("turns").innerText = turns;

        let count=0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let correctTile = ((r*rows) + c + 1).toString();
                let presentTile = document.getElementById(r.toString() + "-" + c.toString());
                if(!presentTile.src.includes("/"+correctTile+".jpg")){
                    break;
                }
                else{
                    count++;
                }
            }
        }
        if(count==rows*cols){
            document.getElementById("resultHeading").innerHTML = "Congrats! You have solved the puzzle";
        }

    }
}
function showHint(){
    let tile = document.createElement("img");
    tile.src = "./tiles3/26.jpg";
    document.getElementById("hint-img").replaceChildren(tile);
}
