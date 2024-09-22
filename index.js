// maintain a matrix to store state of the board
// 0 = EMPTY
// 1 = OVAL
// -1 = CROSS

var matrix = [];
var isCrossTurn = true;
var haveWinner = false;
var player1="",player2="";

//initialize matrix to set all boxes to EMPTY state
for(let i=0;i<3;i++){
    matrix.push([])
    for(let j=0;j<3;j++){
        matrix[i].push(0);
    }
}

updateTurnInfo();

let table = document.getElementById("board"),rIndex,cIndex;
// console.log(table);

for(let i = 0; i < table.rows.length; i++)
{
    // row cells
    for(let j = 0; j < table.rows[i].cells.length; j++)
    {
        table.rows[i].cells[j].onclick = function()
        {
            if(player1.length==0)
		player1 = "X";
    	    if(player2.length==0)
	        player2 = "O"
            rIndex = this.parentElement.rowIndex;
            cIndex = this.cellIndex;
            //check if clicked box is empty and winner is not decided yet
            if(matrix[rIndex][cIndex] ===0 && ! haveWinner){
                dispatch();
                
            }
        };
    }
}

function updateTurnInfo(){
    document.getElementById("turn").innerHTML  = `Current Turn: ${isCrossTurn ? 'X':'O'}`
}

function dispatch(){

    if(isCrossTurn)
        performMove(-1,"https://ashu11-01.github.io/tic-tac-toe/cross.png");
    else
        performMove(1,"https://ashu11-01.github.io/tic-tac-toe/oval.png");
}


//update board position and change image
function performMove(moveCode,imagePath){
    table.rows[rIndex].cells[cIndex].childNodes[0].src = imagePath
    
    matrix[rIndex][cIndex] = moveCode;
    isCrossTurn = !isCrossTurn;
    updateTurnInfo();
    let winnerResult = checkWinner();
    if(winnerResult===-1){ // do not have a winner
        checkFinish();
    }
    else    // we have a definite winner 
        updateWinnerInfo(winnerResult);
}

function updateWinnerInfo(message){
    document.getElementById("winner").innerHTML = `Result is ${message}`;
    document.getElementById("turn").style.display = "none";
}

function checkWinner(){
    //check each row sum, col sum, diagonal sum
    //if it is -3, X won
    //if it is 3, O won
    //else Match draw

    let mds =0;
    let sds =0;
    for(let i=0;i<3;i++){
        let rowSum =0;
        let colSum =0;

        for(let j=0;j<3;j++){
            rowSum+=matrix[i][j];
            colSum+=matrix[j][i];
            if(i===j)   mds+=matrix[i][j];
            if(i+j === 2) sds+=matrix[i][j];
        }
        
        if(rowSum===-3 || colSum===-3 || mds===-3 || sds===-3) {
            haveWinner = true;
            return `${player1} is the winner`;
        }    
        if(rowSum===3 || colSum===3 || mds===3 || sds===3){
            haveWinner = true;
            return `${player2} is the winner`;
        }

    }
    return -1;
}

//if not definite winner, check if all boxes are filled
function checkFinish(){
    let matrixFull = true;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
           if(matrix[i][j] === 0){
            matrixFull = false;
           }
        }
    }
    if(matrixFull)
        updateWinnerInfo('Match Draw')
}

function updatePlayer(){
    player1= document.getElementById("p1").value;
    player2= document.getElementById("p2").value;
}


