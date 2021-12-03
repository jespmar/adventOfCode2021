import { parseInput } from "../helper/fileImport"

const main = (input:string) => {
    const initialArray = parseInput(input)
    

    splitLoop(initialArray)
}

const splitLoop = (data:string[]) => {

    const splitArray = [];

    for (let i = 0; i < data.length; i++) {
        const s:any = data[i].split(" ")
        s[1] = parseInt(s[1])
        splitArray.push(s)
    }

    console.log(splitArray)
    calculatePosition(splitArray)
    calculatePositionPartTwo(splitArray)

}

const calculatePosition = (data:any) => {
    let horizontal = 0
    let depth = 0

    const changeHorizontal = (type:string, value:number) => {
        if (type === "sub") {
            horizontal = horizontal - value
        } else if (type === "add" ) {
            horizontal = horizontal + value
        }
    }

    const changeDepth = (type:string, value:number) => {
        if (type === "sub") {
            depth = depth - value
        } else if (type === "add" ) {
            depth = depth + value
        }
    }


    for (let i = 0; i < data.length; i++) {

        const dataPoint = data[i]
        const direction = dataPoint[0]
        const value = dataPoint[1]

        if (direction === "forward") changeHorizontal("add", value)
        if (direction === "up") changeDepth("sub", value)
        if (direction === "down") changeDepth("add", value)
    }

    const result = horizontal * depth

    console.log({horizontal, depth, result})

}


const calculatePositionPartTwo = (data:any) => {
    let horizontal = 0
    let depth = 0
    let aim = 0


    const changeAim = (type:string, value:number) => {
        if (type === "decrease") {
            aim = aim - value
        } else if (type === "increase" ) {
            aim = aim + value
        }
    }


    const evalForward = (value:number) => {
        horizontal = horizontal + value
        depth = depth + (aim * value)
    }


    for (let i = 0; i < data.length; i++) {

        const dataPoint = data[i]
        const direction = dataPoint[0]
        const value = dataPoint[1]

        if (direction === "forward") evalForward(value)
        if (direction === "up") changeAim("decrease", value)
        if (direction === "down") changeAim("increase", value)
    }

    const result = horizontal * depth

    console.log({horizontal, depth, result})

}

main('./assets/dayTwo/input.txt')