import { Ship } from "./classes"

describe("Ship class", () => {
 let length = 5 
 let ship

 beforeEach(() => {
    ship = new Ship(length)
 })

 it("Initialized with correct length", () => {
    expect(ship.length).toBe(length)
 })

 it("Sinks with correct number of hits", () => {
    for (let i = 0; i < length; i += 1) {
        expect(ship.isSunk()).toBe(false)
        ship.hit()
    }
    expect(ship.isSunk()).toBe(true)
 })

 it("Throws error when hit more than length and checked", () => {
    for (let i = 0; i < length+1; i += 1) {
        ship.hit()
    }
    expect(() => {
        ship.isSunk()
    }).toThrow()
 })
})

describe("Gameboard class", () => {

})

describe("Player class", () => {

})

describe("Computer class", () => {

})

