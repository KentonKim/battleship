import { Gameboard } from "./classes"

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

const getRandomBoard = (ships) => {
    const board = new Gameboard()
    for (let i = 0; i < ships.length; i += 1) {
        let success = false
        ships[i].isVertical = getRandBool()
        while (!success) {
            try {
                board.addShip(ships[i], getRandomCoords())
                success = true
            } catch (error) {
                console.log('Computer attempting to place ship')
            }
        }
    }
    return board
}

export {getRandBool, getRandomBoard, getRandomCoords, switchBetween, isWin}