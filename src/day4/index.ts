import { parseInput } from "../helper/fileImport"

let Table = require('tty-table')
let inquirer = require('inquirer');

let numbersToDraw
let winnerFound = false

let drawnNumbers = []
let numberIndexing = 0

let finalBoards

let doneBoards = []

const dataBuilder = (input:string) => {

    const arr = parseInput(input)

    numbersToDraw = arr[0].split(",")


    createBoards(arr)


}

const createBoards = (arr:string []) => {

    const boards = []

    // remove numbers to dray
    const newArr = arr.splice(0, 1)

    let rowCount = 0
    let board = []

    // remove empty lines
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") continue
        else {
            if (board.length === 5) {
                boards.push(board)
                board = []
            }
            board.push(arr[i])
        }
    }
    boards.push(board)

    buildBetterBoards(boards)

}

const buildBetterBoards = (boards:any[]) => {

    let boardObject = {}

    for (let i = 0; i < boards.length; i++) {
        if (!boardObject[i]) boardObject[i] = []

        let board = boards[i]
        for (let j = 0; j < board.length; j++) {
            let row = board[j]
            let rowArr = row.split(" ");

            for (let k = 0; k < rowArr.length; k++) {
                if (rowArr[k] === "" || rowArr[k] === " ") {
                    rowArr.splice(k, 1)
                }
                console.log(rowArr[k])
                rowArr[k] = parseInt(rowArr[k])
            }


            boardObject[i].push(rowArr)

        }

    }

    finalBoards = boardObject

   drawNumbers(boardObject)

   //run()

}


const matchValue = (value:number) => {
    let match = false

    for (let i = 0; i < drawnNumbers.length; i++) {
        if (value === drawnNumbers[i]) match = true
    }

    return match
}


const drawBoards = (boards:any) => {

    const keys = Object.keys(boards)
    // console.log(keys)

    for (let i = 0; i < keys.length; i++) {
        console.log("BOARD " + keys[i])
        if (!winnerFound) drawBoard(boards[keys[i]], keys[i])
        // if (winnerFound) break
        
    }
}


const drawInTerminal = (board:any) => {

    function formatter(value) {
        //console.log(value)
        if (value === drawnNumbers[drawnNumbers.length - 1]) return this.style(value.toString(), "bgRed", "white", "bold")
        else {
            return (matchValue(value)) ? this.style(value.toString(), "bgGreen", "white", "bold") : 
          this.style(value.toString(), "white")
        }
        
      }


    let header = [{
        value: "B",
        color: "white",
        align: "center",
        formatter 
      },
      {
        value: "I",
        color: "white",
        align: "center",
        formatter 
      },
      {
        value: "N",
        color: "white",
        align: "center",
        formatter 
      },
      {
        value: "G",
        color: "white",
        align: "center",
        formatter 
      },
      {
        value: "O",
        color: "white",
        align: "center",
        formatter 
      }]


      const out = Table(header,board).render()
      console.log(out);

}




const drawBoard = (board:any, key:string) => {


    const checkCol = (pos:number) => {
        if (matchValue(board[0][pos]) && matchValue(board[1][pos]) && matchValue(board[2][pos]) && matchValue(board[3][pos]) && matchValue(board[4][pos])) {
            return true
        } else return false
    }


    let isWinner = false

    const allRows = (row:number[]) => {
        if (matchValue(row[0]) && matchValue(row[1]) && matchValue(row[2]) && matchValue(row[3]) && matchValue(row[4])) {
            return true
            } else return false
    }


    for (let i = 0; i < board.length; i++) {


        if (allRows(board[i])) {
            isWinner = true
            //winnerFound = true
            //break
        }
    }

    /* formatter: function (value) {
        let str = `$${value.toFixed(2)}`
        return (value > 5) ? this.style(str, "green", "bold") : 
          this.style(str, "red", "underline")
      } */

     drawInTerminal(board)

      if (checkCol(0) || checkCol(1) || checkCol(2) || checkCol(3) || checkCol(4)) {
        isWinner = true
        //winnerFound = true
    }


      if (isWinner) {

        const lastDrawnNumber = drawnNumbers[drawnNumbers.length - 1]

        //Remove winning row

        let sum = 0

        for (let i = 0; i < board.length; i++) {

            for (let num of board[i]) {

                if (!matchValue(num)) {
                    sum = sum + num
                }
                
            }

        }

        //console.log({sum, lastDrawnNumber, result: sum * lastDrawnNumber})
        doneBoards.push({board: board, boardNumber: key, sum, lastDrawnNumber, result: sum * lastDrawnNumber})
        //console.log(doneBoards)
        delete finalBoards[key]


      }


}


const drawNumbers = (boards:any) => {


    for (let i = 0; i < numbersToDraw.length; i++) {

       // if (winnerFound) break

        drawnNumbers.push(parseInt(numbersToDraw[i]))
        //console.log({drawnNumbers})

        drawBoards(boards)


    }

    drawInTerminal(doneBoards[0].board)
    console.log({partOne: doneBoards[0]})
    drawInTerminal(doneBoards[doneBoards.length - 1].board)
    console.log({partTwo: doneBoards[doneBoards.length - 1]})


}


//rowChecker([ '14', '21', '17', '24', '4' ])
//drawBoards()
dataBuilder("./assets/day4/input.txt")