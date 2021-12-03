import { parseInput } from "../helper/fileImport"



const main = (input:string) => {
   const initialArray = parseInput(input)
   sumBits(initialArray)
}

const sumBits = (data:string[]) => {

    const bits = {}


    const findMostCommon = (b:number[]) => {

        let g1:string
        let g2:string
        let g3:string
        let g4:string
        let g5:string

        let e1:string
        let e2:string
        let e3:string
        let e4:string
        let e5:string

        const l = data.length / 2

        if (b[0] > l) {
            g1 = "1"
            e1 = "0"}
        else {
            g1 = "0"
            e1 = "1"
        }

        if (b[1] > l) {
            g2 = "1"
            e2 = "0"}
        else {
            g2 = "0"
            e2 = "1"
        }

        if (b[2] > l) {
            g3 = "1"
            e3 = "0"}
        else {
            g3 = "0"
            e3 = "1"
        }

        if (b[3] > l) {
            g4 = "1"
            e4 = "0"}
        else {
            g4 = "0"
            e4 = "1"
        }

        if (b[4] > l) {
            g5 = "1"
            e5 = "0"}
        else {
            g5 = "0"
            e5 = "1"
        }

        const gammaBin = g1+g2+g3+g4+g5;
        const epsilonBin = e1+e2+e3+e4+e5;
        const gammaHex = parseInt(gammaBin, 2)
        const epsilonHex = parseInt(epsilonBin, 2)

        return {gammaBin, gammaHex, epsilonBin, epsilonHex, result: gammaHex * epsilonHex}

    }


    for (let i = 0; i < data.length; i++) {
        const b = data[i];

        for (let j = 0; j < b.length; j++) {
            if (bits[j]) bits[j] = bits[j] + parseInt(b.substr(j, 1))
            else {
                bits[j] = parseInt(b.substr(j, 1))
            }
        }

    }

    console.log(bits)
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

    console.log(ga.join(""))
    console.log(ea.join(""))

    const gammaBin = ga.join("")
    const epsilonBin = ea.join("");
    const gammaHex = parseInt(gammaBin, 2)
    const epsilonHex = parseInt(epsilonBin, 2)

    console.log({gammaBin, gammaHex, epsilonBin, epsilonHex, result: gammaHex * epsilonHex})

    //console.log(findMostCommon([p1, p2, p3, p4, p5]))



}

main('./assets/dayThree/testInput.txt')
main('./assets/dayThree/input.txt')