import { parseInput } from "../helper/fileImport"




const isIncreased = (current, previous) => {
   
    const sum = current - previous

    if (sum > 0) return true
    else return false
    
}


const threeWindowSum = (input) => {

    const sum = (v1, v2, v3) => {
        return parseInt(v1) + parseInt(v2) + parseInt(v3)
    }

    const array = []

    for (let i = 0; i < input.length; i++) {

        const v1 = input[i]
        const v2 = input[i+1]
        const v3 = input[i+2]

        if (i+2 < input.length && i+1 < input.length && i < input.length) {
            array.push(sum(v1, v2, v3))
        }
     
    }

    return sonarScan(array)

}


const sonarScan = (input) => {

    let array = []

    let increase = 0
    let decrease = 0

    for (let i = 0; i < input.length; i++) {
        if (i != 0) {
            if (isIncreased(input[i], input[i - 1])) {
                increase++
            }
            else {
                decrease++
            }
        }
    }

    return {increase, decrease}
}


const partOne = sonarScan(parseInput('./assets/dayOne/input.txt'));
const partTwo = threeWindowSum(parseInput('./assets/dayOne/input.txt'));

console.log({partOne, partTwo})

