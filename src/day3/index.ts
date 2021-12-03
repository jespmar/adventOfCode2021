import { parseInput } from "../helper/fileImport"


let oxygenDec
let co2Dec



const main = (input:string) => {
   const initialArray = parseInput(input)
   sumBits(initialArray)
   stepOxygen(initialArray, 0)
   stepCO2(initialArray, 0)
   console.log("---- PART TWO ----")
   console.log({oxygenDec, co2Dec, result: oxygenDec * co2Dec})
}

const stepOxygen = (initial:string[], position:number) => {

    let one = 0;
    let zero = 0

    for (let i = 0; i < initial.length; i++) {
        const value = initial[i].substr(position, 1)
        if (value === "0") zero++
        if (value === "1") one++
    }

    let newArr

    if (one > zero) newArr = filter(initial, "1", position)
    else if (one == zero) newArr = filter(initial, "1", position)
    else newArr = filter(initial, "0", position)

    if (newArr.length === 1) {
        //console.log("only one")
        oxygenDec = parseInt(newArr[0], 2)
    }
    else {
        //console.log("moving along to possition: " + (position + 1))
        stepOxygen(newArr, position + 1)
    }
    

}

const stepCO2 = (initial:string[], position:number) => {

    let one = 0;
    let zero = 0

    for (let i = 0; i < initial.length; i++) {
        const value = initial[i].substr(position, 1)
        if (value === "0") zero++
        if (value === "1") one++
    }

    let newArr

    if (one < zero) newArr = filter(initial, "1", position)
    else if (one == zero) newArr = filter(initial, "0", position)
    else newArr = filter(initial, "0", position)

    if (newArr.length === 1) {
        //console.log("only one")
        co2Dec = parseInt(newArr[0], 2)
    }
    else {
        //console.log("moving along to possition: " + (position + 1))
        stepCO2(newArr, position + 1)
    }
    

}

const filter = (arr:string[], value:string, position:number) => {

    const filteredArr = []

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].substr(position, 1) === value) {
            filteredArr.push(arr[i])
        }
    }

    return filteredArr

}

const sumBits = (data:string[]) => {

    const bits = {}


    for (let i = 0; i < data.length; i++) {
        const b = data[i];

        for (let j = 0; j < b.length; j++) {
            if (bits[j]) bits[j] = bits[j] + parseInt(b.substr(j, 1))
            else {
                bits[j] = parseInt(b.substr(j, 1))
            }
        }

    }

    // console.log(bits)
    const keys = Object.keys(bits)

    const l = data.length / 2

    const ga = []
    const ea = []

    for (let i = 0; i < keys.length; i++) {

        if (bits[keys[i]] > l) {
            ga.push("1")
            ea.push("0")
        }
        else {
            ga.push("0")
            ea.push("1")
        }

    }

    const gammaBin = ga.join("")
    const epsilonBin = ea.join("");
    const gammaHex = parseInt(gammaBin, 2)
    const epsilonHex = parseInt(epsilonBin, 2)

    console.log("---- PART ONE ----")
    console.log({gammaBin, gammaHex, epsilonBin, epsilonHex, result: gammaHex * epsilonHex})

    //console.log(findMostCommon([p1, p2, p3, p4, p5]))



}

// main('./assets/dayThree/testInput.txt')
main('./assets/dayThree/input.txt')