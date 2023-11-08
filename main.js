import "./style.css";
// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";
import initializeDom from "./initializeDom.js";
import { Player, Computer, Ship, Gameboard } from "./classes";

// Setup Dom
initializeDom(document.querySelector("#app"));

let user
let computer
let userGameboard
let computerGameboard
let computerShips
let userShips
let turn

const getRandomCoords = () => {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
}

const getRandBool = () => {
    if (Math.random() > 0.5) {
        return true
    }
    return false
}

const startGame = () => {
    turn = 1

    user = new Player("User")
    computer = new Computer('computer')
    userGameboard = new Gameboard()
    computerGameboard = new Gameboard()
    userShips = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)]
    computerShips = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)]

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
}

startGame()



// Game Loop
/*
while ( "no one has won" ) {
    if ( "first player turn") {
        coordinates = await user.playMove()
        result = computerGameboard.receiveAttack(coordinates)
    } else {
        coordinates = computer.playMove()
        result = userGameboard.receiveAttack(coordinates)
    }
}
*/