const boxes = document.querySelectorAll(".box")
const statusText = document.querySelector("#statusText")
const resetBtn = document.getElementById("reset-button")

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let choices = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X"
let running = false
// let count = 0


resetBtn.addEventListener("click", (evt) => {
    // resetGame()
    startGame()
    // choices = ["", "", "", "", "", "", "", "", ""]
    // window.location.reload()
})

startGame()


function startGame() {
    resetGame()
    boxes.forEach(box => box.addEventListener("click", boxClicked))
    statusText.textContent = `${currentPlayer}'s turn`
    running = true
}

function boxClicked() {
    // if(count == 8) {
    //     alert("This game will end in a draw")
    // }
    // count++
    const boxIndex = this.getAttribute("boxIndex")

    if (choices[boxIndex] != "" || !running) {
        return
    }

    updateBox(this, boxIndex)
    // switchPlayer()
    checkWinner()

}

function updateBox(box, index) {
    choices[index] = currentPlayer
    box.textContent = currentPlayer
}

function switchPlayer() {
    // console.log(count)
    if (currentPlayer == "X") {
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    }
    statusText.textContent = `${currentPlayer}'s turn`
}

function checkWinner() {
    console.log("click")
    let roundWon = false
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]
        const boxA = choices[condition[0]]
        const boxB = choices[condition[1]]
        const boxC = choices[condition[2]]

        if (boxA == "" || boxB == "" || boxC == "") {
            continue;
        }
        if (boxA == boxB && boxB == boxC) {
            roundWon = true
        }
    }
    if (roundWon) {
        console.log("won")
        statusText.textContent = `${currentPlayer} wins!`
        running = false
        // count++
    }
    else if (!choices.includes("")) {
        console.log("draw")
        // count++
        statusText.textContent = `Draw!`
        running = false
    } else {
        console.log("loss")
        switchPlayer()
        // count++
    }
}

function resetGame() {
    choices = ["", "", "", "", "", "", "", "", ""]
    boxes.forEach(box => box.textContent = "")
    currentPlayer = "X"
    // this makes sure whenever the game restarts it will always be X's turn
}
