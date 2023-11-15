import "./style.css";
// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";
import { Listener, Player, Computer, Ship, Battlelog } from "./classes";
import {getRandomBoard, switchBetween} from "./utility"
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
    user = new Player("Player 1")
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

const playGame = async (player1, player2, gb1, gb2, battlelog) => {
    // TODO change this to be responsive to DOM
    let currPlayer = player1 
    let currBoard = gb2
    let result
    let coords
    let isGoingAgain = true
    let nodeDOM
    let sideString
    const listener = new Listener()
    document.body.addEventListener('mouseup', (e) => {
        console.log(e.target.id)
        listener.coords = e.target.id
    })

    while (!currBoard.isWiped()) {
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
            while (true) {
                try {
                listener.isListening = true
                coords = await listener.getCoords() 
                listener.isListening = false
                sideString = 'right-'
                result = currBoard.receiveAttack(coords)
                break
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            coords = player2.playMove(currBoard.grid)
            sideString = 'left-'
            result = currBoard.receiveAttack(coords)
        }

        nodeDOM = document.getElementById(`${sideString}${coords[0]}${coords[1]}`)

        // Proceeds with attack
        if (result instanceof Ship) {
            isGoingAgain = true
            nodeDOM.classList.add('hit')
            console.log('ship sunk')
            let sunkCoordinates
            for (let i = 0; i < currBoard.shipLoc[result.name].length; i += 1) {
                sunkCoordinates = currBoard.shipLoc[result.name][i]
                nodeDOM = document.getElementById(`${sideString}${sunkCoordinates[0]}${sunkCoordinates[1]}`)
                nodeDOM.classList.add('sunk')
            }
        } else if (result) {
            isGoingAgain = true
            nodeDOM.classList.add('hit')
            console.log('ship hit')
        } else if (!result) {
            nodeDOM.classList.add('missed')
            console.log('missed')
        }

        // battle log logs attack
        battlelog.addLog(result, currPlayer, coords)
        // updateBattleLog() // TODO DOM
    }
    return currPlayer
}

const endGame = (winner) => {
    console.log(userGameboard.grid)
    console.log(computerGameboard.grid)
    alert(`${winner.name} has won!`)    
}

const gameEncapsulate = async () => {
    startGame()
    let winner = await playGame(user, computer, userGameboard, computerGameboard, battlelog)
    endGame(winner)
}

document.addEventListener('DOMContentLoaded', function () {
    // Get all toggle items
    setTimeout(() => {
        gameEncapsulate()
    }, 1000);
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



// document.querySelector('#app').adEventListener('mouseup', gameEncapsulate)