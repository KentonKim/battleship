import "./style.css";
// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";
import initializeDom from "./initializeDom.js";
import { Player, Computer, Ship, Gameboard, Battlelog } from "./classes";

// Setup Dom
initializeDom(document.querySelector("#app"));

let user
let computer
let userGameboard
let computerGameboard
let computerShips
let userShips
let battlelog

const getRandomCoords = () => {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
}

const getRandBool = () => {
    if (Math.random() > 0.5) {
        return true
    }
    return false
}

const switchBetween = (current, optionOne, optionTwo) => {
    if (current=== optionOne) {
        return optionTwo 
    }
    return optionOne
}

const isWin = (board) => {
    return board.isWiped()
}

const startGame = () => {
    // refresh players
    user = new Player("User")
    computer = new Computer('computer')

    // refresh gamemboard and ships
    userGameboard = new Gameboard()
    computerGameboard = new Gameboard()
    userShips = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)]
    computerShips = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)]
    // refresh battle log
    battlelog = new Battlelog()


    // Computer fills board
    for (let i = 0; i < computerShips.length; i += 1) {
        let success = false
        computerShips[i].isVertical = getRandBool()
        while (!success) {
            try {
                computerGameboard.addShip(computerShips[i], getRandomCoords())
                success = true
            } catch (error) {
                console.log('Computer attempting to place ship')
            }
        }
    }
    // refresh DOM elements
        // TODO
}

// In game
const playGame = (player1, player2, gb1, gb2, battlelog) => {
    // TODO change this to be responsive to DOM
    let currPlayer = player1 
    let currBoard = gb2
    let result
    let coords
    let isGoingAgain = true

    while (!isWin(currBoard)) {
        // Premptive Turn Switch conclusion
        if (!isGoingAgain) {
            currPlayer = switchBetween(currPlayer, player1, player2)
            currBoard = switchBetween(currBoard, gb1, gb2)
        }
        isGoingAgain = false

        // DOM
            // show who's turn it is and what turn number it is

        // Player chooses a spot
        if (currPlayer === player1) {
            coords = [] // TODO HOW PLAYER ATTACKS COORDS
        } else {
            coords = player2.playMove()
        }

        // Proceeds with attack
        result = currBoard.receiveAttack(coords)
        if (result === null) {
            // displayMiss() // TODO DOM
        } else if (result) {
            isGoingAgain = true
            // displaySunk() // TODO DOM
        } else if (!result) {
            isGoingAgain = true
            // displayHit() // TODO DOM
        }

        console.log(`${currPlayer.name}`)
        console.log(currBoard.grid)
        // battle log logs attack
        battlelog.addLog(result, currPlayer, coords)
        // updateBattleLog() // TODO DOM
    }
    return currPlayer
}

const endGame = (winner) => {
    alert(`${winner.name} has won!`)    
}

const gameEncapsulate = () => {
    // Start Game
    startGame()
    // Game
    let winner = playGame(user, computer, userGameboard, computerGameboard, battlelog)
    // End Game
    endGame(winner)
}

gameEncapsulate()
// button.onclick(gameEncapsulate)