const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGame = document.querySelector(".btn");


let currentPlayer;
let gameGrid;
let winningPosition = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function initialGame(){
   currentPlayer="X";
   gameGrid=["","","","","","","","",""];
//    UI par bhi show karna hoga

   boxes.forEach( (box,index) => {
    box.innerHTML="";
    boxes[index].style.pointerEvents = "all";
    box.classList=`box box${index+1}`;
   })
   newGame.classList.remove("active");
   gameInfo.innerHTML=`Current Player - ${currentPlayer}`;

}

initialGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerHTML=`Current Player - ${currentPlayer}`;
}

function checkGameover(){
    var answer ="";

    winningPosition.forEach( (pos) => {
        if((gameGrid[pos[0]] !="" && gameGrid[pos[1]] !="" && gameGrid[pos[2]] !="" ) && ( gameGrid[pos[0]] === gameGrid[pos[1]] && gameGrid[pos[1]] === gameGrid[pos[2]] )){
             
            answer = gameGrid[pos[0]];
            // now we now the winner so we have to change the color to green
            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
            //disable pointer event
            boxes.forEach( (box) => {
                box.style.pointerEvents="none";
            });
           
           
        }
        
       
    });

    if (answer !== "") {
        gameInfo.innerHTML = `Winner Player - ${answer} `;
        newGame.classList.add("active");
        return;  
    }
    
    //tied condition

    let cnt=0;
    gameGrid.forEach( (box) =>{
        if(box!=""){
            cnt++;
        }
    });

    if(cnt === 9){
        gameInfo.innerHTML=`Game Tied`;
        newGame.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents = "none";

    }
    swapTurn();
    checkGameover();
    
}

boxes.forEach( (box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newGame.addEventListener("click",initialGame);
