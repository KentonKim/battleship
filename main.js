import "./style.css";
// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";
import { Player, Computer, Ship, Gameboard, Battlelog } from "./classes";
import {getRandomBoard, switchBetween, isWin} from "./utility"
import fillGrid from "./fillGrid";

// Setup Dom
fillGrid('left', document.querySelector("#grid-left"));
fillGrid('right', document.querySelector("#grid-right"));

let user
let computer
let userGameboard
let computerGameboard
let computerShips
let userShips
let battlelog

const startGame = () => {
    // refresh players
    user = new Computer("Computer 1")
    computer = new Computer('Computer 2')

    // refresh gamemboard and ships
    userShips = [new Ship('carrier', 5), new Ship('battleship', 4), new Ship('cruiser', 3), new Ship('submarine', 3), new Ship('destroyer', 2)]
    computerShips = [new Ship('carrier', 5), new Ship('battleship', 4), new Ship('cruiser', 3), new Ship('submarine', 3), new Ship('destroyer', 2)]
    userGameboard = getRandomBoard(userShips) 
    computerGameboard = getRandomBoard(computerShips) 
    // refresh battle log
    battlelog = new Battlelog()
    // refresh DOM elements
        // TODO
}

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
        console.log(`${currPlayer.name}`)
        if (currPlayer === player1) {
            coords = player1.playMove(currBoard.grid)
        } else {
            coords = player2.playMove(currBoard.grid)
        }

        // Proceeds with attack
        result = currBoard.receiveAttack(coords)
        if (result === null) {
            // displayMiss() // TODO DOM
            console.log('missed')
        } else if (result) {
            isGoingAgain = true
            // displaySunk() // TODO DOM
            console.log('ship sunk')
        } else if (!result) {
            isGoingAgain = true
            // displayHit() // TODO DOM
            console.log('ship hit')
        }

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
    startGame()
    let winner = playGame(user, computer, userGameboard, computerGameboard, battlelog)
    endGame(winner)
}


document.addEventListener('DOMContentLoaded', function () {
    // Get all toggle items
    const toggleDifficulty = document.querySelectorAll('.toggle-difficulty');

    // Add click event listener to each item
    toggleDifficulty.forEach(item => {
        item.onclick = function () {
            // Remove 'active' class from all items
            toggleDifficulty.forEach(item => {
                item.classList.remove('active');
            });

            // Add 'active' class to the clicked item
            this.classList.add('active');
        };
    });
});



// gameEncapsulate()
// document.querySelector('#app').adEventListener('mouseup', gameEncapsulate)