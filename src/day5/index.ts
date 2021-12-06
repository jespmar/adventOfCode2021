import { parseInput } from "../helper/fileImport";

let Table = require('tty-table')

let grid = [];

function isOdd(num:number) { return !!(num % 2)}


const start = (input:string, countDiagonal:boolean) => {
    const arr:string[] = parseInput(input);

    const newArr = [];

    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i].split("->"))
    }

    return buildObject(newArr, countDiagonal)

}

const buildObject = (newArr:string[], countDiaginal:boolean) => {
    const arr = []

    for (let i = 0; i < newArr.length; i++) {
        
        const xy1 = newArr[i][0].split(",")
        const xy2 = newArr[i][1].split(",")

        const obj = {
            x1: parseInt(xy1[0]),
            y1: parseInt(xy1[1]),
            x2: parseInt(xy2[0]),
            y2: parseInt(xy2[1])
        }

        arr.push(obj)

    }

    for (let entry of arr) {
        draw(entry, countDiaginal)
    }

    //drawInTerminal(grid)
    return calculateOverlap()


}



const createGrid = (x:number, y:number, countDiagonal:boolean) => {

    grid = []


    for (let i = 0; i <= y; i++) {

        let col = []

        // Create col
        for (let j = 0; j <= x; j++) {
            col.push(0)
        }
    
        grid.push(col)

    }

    return start('./assets/day5/input.txt', countDiagonal)


//drawInTerminal(grid)

}

const drawX = (x1:number, x2:number, y:number) => {

    const start = Math.min(x1, x2)
    const stop = Math.max(x1, x2) 
    const diff = stop - start

    //console.log({start, stop, diff})

    for (let i = 0; i <= diff; i++) {
        grid[y][start + i]++
    }


}

const drawY = (y1:number, y2:number, x:number) => {

    const start = Math.min(y1, y2)
    const stop = Math.max(y1, y2) 
    const diff = stop - start

    for (let i = 0; i <= diff; i++) {

        grid[start + i][x]++
    }



}

const draw = (entry:any, countDiagonal:boolean) => {

    if (entry.x1 === entry.x2) {
        drawY(entry.y1, entry.y2, entry.x1)
        //console.log(entry)
    } else if (entry.y1 === entry.y2) {
        drawX(entry.x1, entry.x2, entry.y1)
        //console.log(entry)
        //drawInTerminal(grid)
    } else {
        if (countDiagonal) diagonal(entry.x1, entry.y1, entry.x2, entry.y2)
       // console.log(entry)
    }

}

const drawInTerminal = (grid:any) => {

      const out = Table(grid).render()
      console.log(out);

}


const calculateOverlap = () => {

    let overlap = 0;

    for (let i = 0; i < grid.length; i++) {

        //console.log(grid[i])

        for (let j = 0; j < grid[i].length; j++) {


            if (grid[i][j] > 1) overlap++

        }


    }

    return {overlap}

}


const diagonal = (x1:number, y1:number, x2:number, y2:number) => {

    //console.log({x1, y1, x2, y2})

    const calcSteps = (x1:number, x2:number) => {
        const max = Math.max(x1, x2)
        const min = Math.min(x1, x2)
        const steps = (max - min) - 1

        //console.log({max, min, steps})

        return steps
    }

    const steps = calcSteps(x1, x2)

    if(Number.isInteger(steps)) {

        const points = []

        points.push({x: x1, y:y1})
    
        // IF x1 is less than x2 and y1 is less than y2
    if (x1 < x2 && y1 < y2) {
    
        for (let i = 1; i <= steps; i++) {
            points.push({x: x1+i, y: y1+i})
        }
    
    }
    
    if (x1 < x2 && y1 > y2) {
    
        for (let i = 1; i <= steps; i++) {
            points.push({x: x1+i, y: y1-i})
        }
    
    }
    
    if (x1 > x2 && y1 < y2) {
    
        for (let i = 1; i <= steps; i++) {
            points.push({x: x1-i, y: y1+i})
        }
    
    }
    
    if (x1 > x2 && y1 > y2) {
    
        for (let i = 1; i <= steps; i++) {
            points.push({x: x1-i, y: y1-i})
        }
    
    }
    
    points.push({x: x2, y:y2})
    //console.log({points})
    
    
    for (let point of points) {
        drawPoint(point.x, point.y)
    }


    } else {

        console.log("fail")
        console.log(steps)
        console.log(isOdd(steps))
        console.log(Number.isInteger(steps))

    }




}

const drawPoint = (x:number, y:number) => {

    //console.log({x, y})

    grid[y][x]++

}


console.log({partOne: createGrid(999, 999, false), partTwo: createGrid(999, 999, true)})

//createGrid(999, 999, false)
//createGrid(999, 999, true)
