let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".resetButton");
let msgBox = document.querySelector(".msgContainer");
let msgBox_p = document.querySelector(".msgBox p");
let newGameBtn = document.querySelector(".newGameBtn");
let mainDiv = document.querySelector(".main");
let turn_0 = true;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn_0 = true;
    enableBoxes();
    msgBox.style.display = "none";
    count = 0;
}

let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click",() => {
        count++;
        if(turn_0 === true){
            box.innerText = "O";
            turn_0 = false;
            box.style.color = "red";
        }
        else {
            box.innerText = "X";
            turn_0 = true;
            box.style.color = "#14389a";
        }
        box.disabled = true;

        checkWinner();


    })
})

// after winning all boxes should be disabled
let disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

// for new game boxes should be enable
let enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const matchDraw = () => {
    msgBox_p.innerText = "Oops! Match is Draw.";
    mainDiv.style.filter = "blur(8px)";
    msgBox.style.display = "block";

}

const checkWinner = () => {
    for(let pattern of winPattern){
       
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                disabledBoxes();
                msgBox_p.innerText = `Winner is  ${pos1Val}`;
                mainDiv.style.filter = "blur(8px)";
                msgBox.style.display = "block";
                break;

            }
            else if(count == 9){
                matchDraw();
            }
        }
        
    }
}

resetButton.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",() => {
    mainDiv.style.filter = "blur(0px)";
})

