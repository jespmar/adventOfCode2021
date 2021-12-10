import { parseInput } from "../helper/fileImport"

let lowest = 2000000000000
let bestOption

const importData = (input:string) => {

    const d = parseInput(input)
    console.log(d)
    return d[0].split(",")

}

const data = importData("./assets/day7/input.txt")


const loop = (start:number, goal:number) => {

    let spentFule = 0

    while (start !== goal) {

        if (start < goal) {
            start++
            spentFule++
        }

        if (start > goal) {
            start--
            spentFule++
        }

    }

    return spentFule


}

const loop2 = (start:number, goal:number) => {


    // 1 = 1
    // 2 = 2
    // 3 = 3

    let spentFule = 0
    let cost = 1

    while (start !== goal) {

        if (start < goal) {
            start++
            spentFule = spentFule + cost
            cost++
        }

        if (start > goal) {
            start--
            spentFule = spentFule + cost
            cost++
        }

    }


    return spentFule


}

// for each possible possition

let loops = 2000

for (let i = 0; i < loops; i++) {

    const num = i

    let fuel = 0

    for (let j = 0; j < data.length; j++) {

        let g = parseInt(data[j])

        if (num !== g) {
            fuel = fuel + loop2(g, num)
        }


    }

    if (fuel < lowest) {
        lowest = fuel
    }

    console.log({num, goal: num, fuel})



}
console.log(loop2(16, 5))
console.log({lowest})

//console.log({lowestFule, bestOption})

