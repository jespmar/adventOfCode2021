import { kill } from "process"
import { parseInput } from "../helper/fileImport"
let Table = require('tty-table')

const transformInput = (input:string) => {

    let segmentedArray = []

    const data = parseInput(input)

    for (let i = 0; i < data.length; i++) {

        let segmented = []

        let arr = data[i]
        let splitArr = arr.split("|")

        for (let j = 0; j < splitArr.length; j++) {

            let s = splitArr[j]
            let split = s.split(" ")

            segmented.push(split)

        }

        segmentedArray.push(segmented)

    }

    return segmentedArray

}


const testArray = ["fdgacbe", "cefdb", "cefbgd", "gcbe"]

const returnLengthArray = (array:string[]) => {

    const newArr = []

    for (let a of array) {

        newArr.push(a.length)
        console.log(a)
        console.log(probableNumber(a.length))

    }

    return newArr

}

const countUniqeSegements = (arr:number[]) => {

    let uniqeSegments = 0

    for (let a of arr) {

        if (a === 2 || a == 4 || a === 3 || a === 7 ) {

            uniqeSegments++
            console.log(probableNumber(a))

        }


    }

   return uniqeSegments

}

const probableNumber = (segments:number) => {

    if (segments === 2) return "1"
    if (segments === 4) return "4"
    if (segments === 3) return "7"
    if (segments === 7) return "8"

}


const getNumber = (segments:string) => {

    console.log({segments})

    const incl = (val:string) => {
        return segments.includes(val)
    }

    // (ge) should return 1
    if (segments.length === 2 && incl("g") && incl("e")) return 1

    // (ceafd) should return 2
    if (segments.length === 5 && incl("c") && incl("e") && incl("a") && incl("f") && incl("d")) return 2

    // (ceagd) should return 3
    if (segments.length === 5 && incl("c") && incl("e") && incl("a") && incl("g") && incl("d")) return 3

    // (ebga) should return 4
    if (segments.length === 4 && incl("e") && incl("b") && incl("g") && incl("a")) return 4

    // (cbagd) should return 5
    if (segments.length === 5 && incl("c") && incl("b") && incl("a") && incl("g") && incl("d")) return 5

    // (cbafgd) should return 6
    if (segments.length === 6 && incl("c") && incl("b") && incl("a") && incl("f") && incl("g") && incl("d")) return 6

    // (ecg) should return 7
    if (segments.length === 3 && incl("e") && incl("c") && incl("g")) return 7

    // (egcfdab) should return 8
    if (segments.length === 7 && incl("e") && incl("g") && incl("c") && incl("f") && incl("d") && incl("a") && incl("b")) return 8

    // (cebagd) should return 9
    if (segments.length === 6 && incl("c") && incl("e") && incl("b") && incl("a") && incl("g") && incl("d")) return 9




}
//countUniqeSegements(returnLengthArray(testArray))

const doTheWork = (data:any) => {

    let sum = 0

    for (let d of data) {

        let segment = d[1]

        sum = sum + countUniqeSegements(returnLengthArray(segment));

    }

    console.log(sum)

}

const doTheWorkAgain = (data:any) => {

    let sum = 0

    for (let d of data) {

        let segment = d[1]

        //sum = sum + countUniqeSegements(returnLengthArray(segment));
        console.log(getValue(segment))

    }

    console.log(sum)

}


const getValue = (segmentsArray:string[]) => {

    let value:string
    segmentsArray.splice(0,1)

    for (let a of segmentsArray) {

        if (a != " ") {
            value = value + getNumber(a).toString()
        }

        

    }

    return parseInt(value)

}



// Uniqe length
// 7 , 4, 2


// 1 = 2 segments
// 2 = 5 segments
// 3 = 5 segments
// 4 = 4 segments
// 5 = 5 segments
// 6 = 6 segments
// 7 = 3 segments
// 8 = 7 segments
// 9 = 6 segments




// 1 = ge
// 2 = ceafd
// 3 = ceagd
// 4 = ebga
// 7 = ecg
// 8 = egcfdab




const ligtUpDisplay = (segments:string) => {

    console.log(getNumber(segments))

    let position = {
       p1: "c",
       p2: "b", 
       p3: "e", // or g
       p4: "a",
       p5: "f",
       p6: "g", // or e
       p7: "d"
    }

 // should be a five in test

generateSegementedDisplay(position,segments)

}

const generateSegementedDisplay = (positions:any, segments:string) => {

   const {p1, p2, p3, p4, p5, p6, p7 } = positions
   console.log({p1, p2, p3, p4, p5, p6, p7 })

   function formatter (value) {
    return (segments.includes(value)) ? this.style(value, "black", "bold", "bgWhite") : 
      this.style(value, "gray")
  }

   let header = [  {
    value: "-",
    align: "center",
    headerColor: "cyan",
    width: 2,
    formatter
  },
  {
    value: "-",
    align: "center",
    headerColor: "cyan",
    width: 2,
    formatter
  },{
    value: "-",
    align: "center",
    headerColor: "cyan",
    width: 2,
    formatter
  },{
    value: "-",
    align: "center",
    headerColor: "cyan",
    width: 2,
    formatter
  },{
    value: "-",
    align: "center",
    headerColor: "cyan",
    width: 2,
    formatter
  },{
    value: "-",
    align: "center",
    headerColor: "cyan",
    width: 2,
    formatter
  },
]

let segementedDisplay = [
    ["", p1, p1, p1, p1, ""],
    [p2,"","","","",p3],
    [p2,"","","","",p3],
    ["", p4, p4, p4, p4, ""],
    [p5,"","","","",p6],
    [p5,"","","","",p6],
    ["", p7, p7, p7, p7, ""],
]




const out = Table(header,segementedDisplay).render()
console.log(out); //prints output



}

ligtUpDisplay("ge") // 1
ligtUpDisplay("ceafd") //2
ligtUpDisplay("ceagd") //3
ligtUpDisplay("ebga") // 4
ligtUpDisplay("cbagd") // 5
ligtUpDisplay("cbafgd") // 6
ligtUpDisplay("ecg") // 7
ligtUpDisplay("egcfdab") //8
ligtUpDisplay("cebagd") //9


// 1 = ge
// 4 = ebga
// 7 = ecg
// 8 = egcfdab

// if 2 segments = 1
// if 3 segments = 7
// if 4 segments = 4
// if 7 segments = 8

// get know numbers

const getKnownNumbers = (array:string[]) => {

    let known:any = {
        fivers: [],
        sixers: []
    }

    for (let a of array) {

        if (a.length === 2) known.one = a;
        if (a.length === 3) known.seven = a;
        if (a.length === 4) known.four = a;
        if (a.length === 5) known.fivers.push(a);
        if (a.length === 6) known.sixers.push(a);
        if (a.length === 7) known.eight = a;

    }

    return known

}


// compare 1 (ge) with 7 (ecg)
const compareOneWithSeven = (one: string, seven:string) => {

    // loop over seven
    if (!one.includes(seven.substr(0,1))) return ({p1: seven.substr(0,1)})
    if (!one.includes(seven.substr(1,1))) return ({p1: seven.substr(1,1)})
    if (!one.includes(seven.substr(2,1))) return ({p1: seven.substr(2,1)})

}

const compareFourWithFivers = (four:string, one:string, fivers:string[], p1:string) => {

    let sorted = []

    // Sort out from one
    if (!one.includes(four.substr(0, 1))) sorted.push(four.substr(0, 1))
    if (!one.includes(four.substr(1, 1))) sorted.push(four.substr(1, 1))
    if (!one.includes(four.substr(2, 1))) sorted.push(four.substr(2, 1))
    if (!one.includes(four.substr(3, 1))) sorted.push(four.substr(3, 1))

    if (
        fivers[0].includes(sorted[0]) && 
        fivers[1].includes(sorted[0]) && 
        fivers[2].includes(sorted[0]) && 
        sorted[0] !== p1) return {p4: sorted[0]}

    if (
        fivers[0].includes(sorted[1]) && 
        fivers[1].includes(sorted[1]) && 
        fivers[2].includes(sorted[1]) && 
        sorted[1] !== p1) return {p4: sorted[1]}

}

const compareOneWithFour = (one:string, four:string, p4:string) => {

    let sorted = []

    // sort out one
    if (!one.includes(four.substr(0,1))) sorted.push(four.substr(0,1))
    if (!one.includes(four.substr(1,1))) sorted.push(four.substr(1,1))
    if (!one.includes(four.substr(2,1))) sorted.push(four.substr(2,1))
    if (!one.includes(four.substr(3,1))) sorted.push(four.substr(3,1))

    if (sorted[0] !== p4) return {p2: sorted[0]}
    if (sorted[1] !== p4) return {p2: sorted[1]}


}

const compareOneWithSixers = (one:string, sixers:string[]) => {
    if (!sixers[0].includes(one.substr(0,1))) return {p3: one.substr(0,1), p6: one.substr(1,1)}
    if (!sixers[0].includes(one.substr(1,1))) return {p3: one.substr(1,1), p6: one.substr(0,1)}
    if (!sixers[1].includes(one.substr(0,1))) return {p3: one.substr(0,1), p6: one.substr(1,1)}
    if (!sixers[1].includes(one.substr(1,1))) return {p3: one.substr(1,1), p6: one.substr(0,1)}
}

const compareFivers = (fivers:string[], p2:string, p3:string, p6:string) => {
    
    let sorted = []

    if (!fivers[0].includes(fivers[1].substr(0,1))) sorted.push(fivers[1].substr(0,1))
    if (!fivers[0].includes(fivers[1].substr(1,1))) sorted.push(fivers[1].substr(1,1))
    if (!fivers[0].includes(fivers[1].substr(2,1))) sorted.push(fivers[1].substr(2,1))
    if (!fivers[0].includes(fivers[1].substr(3,1))) sorted.push(fivers[1].substr(3,1))
    if (!fivers[0].includes(fivers[1].substr(4,1))) sorted.push(fivers[1].substr(4,1))
    if (!fivers[0].includes(fivers[1].substr(5,1))) sorted.push(fivers[1].substr(5,1))
    
    if (!fivers[0].includes(fivers[2].substr(0,1))) sorted.push(fivers[2].substr(0,1))
    if (!fivers[0].includes(fivers[2].substr(1,1))) sorted.push(fivers[2].substr(1,1))
    if (!fivers[0].includes(fivers[2].substr(2,1))) sorted.push(fivers[2].substr(2,1))
    if (!fivers[0].includes(fivers[2].substr(3,1))) sorted.push(fivers[2].substr(3,1))
    if (!fivers[0].includes(fivers[2].substr(4,1))) sorted.push(fivers[2].substr(4,1))
    if (!fivers[0].includes(fivers[2].substr(5,1))) sorted.push(fivers[2].substr(5,1))

    if (!fivers[1].includes(fivers[0].substr(0,1))) sorted.push(fivers[0].substr(0,1))
    if (!fivers[1].includes(fivers[0].substr(1,1))) sorted.push(fivers[0].substr(1,1))
    if (!fivers[1].includes(fivers[0].substr(2,1))) sorted.push(fivers[0].substr(2,1))
    if (!fivers[1].includes(fivers[0].substr(3,1))) sorted.push(fivers[0].substr(3,1))
    if (!fivers[1].includes(fivers[0].substr(4,1))) sorted.push(fivers[0].substr(4,1))
    if (!fivers[1].includes(fivers[0].substr(5,1))) sorted.push(fivers[0].substr(5,1))

    if (!fivers[1].includes(fivers[2].substr(0,1))) sorted.push(fivers[2].substr(0,1))
    if (!fivers[1].includes(fivers[2].substr(1,1))) sorted.push(fivers[2].substr(1,1))
    if (!fivers[1].includes(fivers[2].substr(2,1))) sorted.push(fivers[2].substr(2,1))
    if (!fivers[1].includes(fivers[2].substr(3,1))) sorted.push(fivers[2].substr(3,1))
    if (!fivers[1].includes(fivers[2].substr(4,1))) sorted.push(fivers[2].substr(4,1))
    if (!fivers[1].includes(fivers[2].substr(5,1))) sorted.push(fivers[2].substr(5,1))

    if (!fivers[2].includes(fivers[0].substr(0,1))) sorted.push(fivers[0].substr(0,1))
    if (!fivers[2].includes(fivers[0].substr(1,1))) sorted.push(fivers[0].substr(1,1))
    if (!fivers[2].includes(fivers[0].substr(2,1))) sorted.push(fivers[0].substr(2,1))
    if (!fivers[2].includes(fivers[0].substr(3,1))) sorted.push(fivers[0].substr(3,1))
    if (!fivers[2].includes(fivers[0].substr(4,1))) sorted.push(fivers[0].substr(4,1))
    if (!fivers[2].includes(fivers[0].substr(5,1))) sorted.push(fivers[0].substr(5,1))

    if (!fivers[2].includes(fivers[1].substr(0,1))) sorted.push(fivers[1].substr(0,1))
    if (!fivers[2].includes(fivers[1].substr(1,1))) sorted.push(fivers[1].substr(1,1))
    if (!fivers[2].includes(fivers[1].substr(2,1))) sorted.push(fivers[1].substr(2,1))
    if (!fivers[2].includes(fivers[1].substr(3,1))) sorted.push(fivers[1].substr(3,1))
    if (!fivers[2].includes(fivers[1].substr(4,1))) sorted.push(fivers[1].substr(4,1))
    if (!fivers[2].includes(fivers[1].substr(5,1))) sorted.push(fivers[1].substr(5,1))

    console.log(sorted)

    let result:string

    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i] !== p2 && sorted[i] !== p6 && sorted[i] !== p3) result = sorted[i]
    }

    return {p5: result}


}

const getTheLastOne = (positions:any) => {

    const {p1, p2, p3, p4 ,p5, p6} = positions
    let posArray = [p1, p2, p3, p4, p5, p6]

    if (!posArray.includes("a")) return {p7: "a"}
    if (!posArray.includes("b")) return {p7: "b"}
    if (!posArray.includes("c")) return {p7: "c"}
    if (!posArray.includes("d")) return {p7: "d"}
    if (!posArray.includes("e")) return {p7: "e"}
    if (!posArray.includes("f")) return {p7: "f"}
    if (!posArray.includes("g")) return {p7: "g"}

}

console.log(getKnownNumbers(["acedgfb", "cdfbe", "gcdfa", "fbcad", "dab", "cefabd", "cdfgeb", "eafb", "cagedb", "ab"]))

const setTheNumbers = (known:any) => {
    let p1 = compareOneWithSeven(known.one, known.seven).p1
    let p4 = compareFourWithFivers(known.four, known.one, known.fivers, p1).p4
    let p2 = compareOneWithFour(known.one, known.four, p4).p2
    let p3 = compareOneWithSixers(known.one, known.sixer).p3
    let p6 = compareOneWithSixers(known.one, known.sixer).p6
    let p5 = compareFivers(known.fivers, p2, p3, p6).p5
    let p7 = getTheLastOne({p1, p2, p3, p4, p5, p6})

    return {p1,p2,p3,p4,p5,p6,p7}
}


console.log(setTheNumbers(getKnownNumbers(["acedgfb", "cdfbe", "gcdfa", "fbcad", "dab", "cefabd", "cdfgeb", "eafb", "cagedb", "ab"])))

console.log(compareOneWithSeven("ge", "ecg"))
console.log(compareFourWithFivers("ebga", "eg", ["ceafd","ceagd", "cbagd"], "c"))
console.log(compareOneWithFour("ge", "ebga", "a"))
console.log(compareOneWithSixers("ge", ["cbafgd", "cebagd"]))
console.log(compareFivers(["ceafd","ceagd", "cbagd"], "b", "e", "g"))
console.log(getTheLastOne({p1: "c", p2: "b", p3: "e", p4: "a", p5: "f", p6: "g",}))


//doTheWork(transformInput("./assets/day8/input.txt"))
//doTheWorkAgain(transformInput("./assets/day8/input.txt"))


