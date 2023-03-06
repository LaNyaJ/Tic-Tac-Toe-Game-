let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
// creates array from array like elements
let boxes = Array.from (document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning_blocks')
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-blocks') 

// console.log(boxes);

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
//
let spaces = Array(9).fill(null)
let count_plays = 0 


//console.log(spaces);

// loop over boxes to add event listener to dom elements
// adds event listener to each of 9 boxes
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

// e is whats being passed in dom element of box targeting id from html
function boxClicked(e) {
    //console.log(e.target);
    const id = e.target.id;

    if(!spaces[id] && count_plays < 9 ){
        spaces[id] = currentPlayer
        // gives feedback to user
        e.target.innerText= currentPlayer

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            count_plays = 10


            //console.log(winning_blocks);
            winning_blocks.map(box => boxes[box].style.background=winnerIndicator)
            return
        }
        count_plays++
        // if equal to x text change it to o text or else change it to x text 
        currentPlayer =  currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }

    if (count_plays === 9) {
        playerText.innerHTML = 'Draw Game!'
        boxes.forEach(box => box.style.color = drawIndicator)
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon () {
    for (const condition of winningCombos) {
        // save each value from winningcombos array in these variables
      let [a, b, c] = condition 

      if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
        return [a,b,c]
      }
    }
    return false
}


restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)
    count_plays = 0 

    boxes.forEach ( box => {
        box.innerText = ''
        box.style.backgroundColor= ''
        box.style.color = '#354957'
    })

    playerText.innerHTML = "Tic Tac Toe"

    currentPlayer = X_TEXT
}

startGame()