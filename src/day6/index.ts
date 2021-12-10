import { once } from "events";

var exec = require("child_process").exec;

const readline = require("readline");
const fs = require("fs");
const lineReplace = require("line-replace");

const startTime = new Date().toLocaleString();
console.log(startTime);

const logger = (val: any) => {
  console.log(val);
};

// write to file promise
const writeToFilePromise = (file: string, data: number) =>
  new Promise((resolve, reject) => {
    let d = data.toString();
    fs.appendFile(`${file}`, d, function (err) {
      if (err) {
        // append failed
        reject(err);
      } else {
        // done
        resolve("done");
      }
    });
  });

const writeToFilePromiseString = (file: string, data: string) =>
  new Promise((resolve, reject) => {
    fs.appendFile(`${file}`, data, function (err) {
      if (err) {
        // append failed
        reject(err);
      } else {
        // done
        resolve("done");
      }
    });
  });

// Read line by line Promise
const readLineByLinePromise = (file: string) =>
  new Promise((resolve, reject) => {
    let writeTo;
    let readFrom;

    if (file === "file1.txt") {
      writeTo = "file2.txt";
      readFrom = "file1.txt";
    }

    if (file === "file2.txt") {
      writeTo = "file1.txt";
      readFrom = "file2.txt";
    }

    //Empty write file

    const readInterface = readline.createInterface({
      input: fs.createReadStream(`./assets/day6/${readFrom}`),
      console: false,
    });

    let addToEnd = [];

    const readLinesPromise = () =>
      readInterface.on("line", async (l: string) => {
        let line = parseInt(l);
        // Evalueate line
        if (line === 0) {
          await writeToFilePromise(writeTo, 6);
          addToEnd.push(9);
        } else {
          await writeToFilePromise(writeTo, line - 1);
        }
        console.log(line);
      });

    readInterface.on("close", async () => {
      for (let i = 0; i < addToEnd.length; i++) {
        await writeToFilePromise(writeTo, addToEnd[i]);
      }
      file = writeTo;
      console.log("done");
      resolve("done");
    });
  });

// Truncate file Promise
const truncateFilePromise = (file: string) =>
  new Promise((resolve, reject) => {
    fs.truncate(`./assets/day6/${file}`, 0, () => {
      resolve("done");
    });
  });

const writeToFile = (file: string, data: number) => {
  let d = data.toString();
  fs.appendFile(`${file}`, d + "\n", function (err) {
    if (err) {
      // append failed
    } else {
      // done
    }
  });
};

const readFile = (file: string) => {
  let writeTo;
  let readFrom;

  if (file === "file1.txt") {
    writeTo = "file2.txt";
    readFrom = "file1.txt";
  }

  if (file === "file2.txt") {
    writeTo = "file1.txt";
    readFrom = "file2.txt";
  }

  //Empty write file
  fs.truncate(`./assets/day6/${writeTo}`, 0, () => {
    console.log("deleted");

    const readInterface = readline.createInterface({
      input: fs.createReadStream(`./assets/day6/${readFrom}`),
      console: false,
    });

    let addToEnd = [];

    readInterface.on("line", function (l) {
      let line = parseInt(l);
      // Evalueate line
      if (line === 0) {
        writeToFile(writeTo, 6);
        addToEnd.push(9);
      } else {
        writeToFile(writeTo, line - 1);
      }
      console.log(line);
    });

    readInterface.on("close", () => {
      console.log("done");
      for (let i = 0; i < addToEnd.length; i++) {
        writeToFile(writeTo, addToEnd[i]);
      }
      file = writeTo;
    });
  });
};

const evalFishFile = (val: number, i: number, file: string) => {};

//const initialState = [1,3,4,1,5,2,1,1,1,1,5,1,5,1,1,1,1,3,1,1,1,1,1,1,1,2,1,5,1,1,1,1,1,4,4,1,1,4,1,1,2,3,1,5,1,4,1,2,4,1,1,1,1,1,1,1,1,2,5,3,3,5,1,1,1,1,4,1,1,3,1,1,1,2,3,4,1,1,5,1,1,1,1,1,2,1,3,1,3,1,2,5,1,1,1,1,5,1,5,5,1,1,1,1,3,4,4,4,1,5,1,1,4,4,1,1,1,1,3,1,1,1,1,1,1,3,2,1,4,1,1,4,1,5,5,1,2,2,1,5,4,2,1,1,5,1,5,1,3,1,1,1,1,1,4,1,2,1,1,5,1,1,4,1,4,5,3,5,5,1,2,1,1,1,1,1,3,5,1,2,1,2,1,3,1,1,1,1,1,4,5,4,1,3,3,1,1,1,1,1,1,1,1,1,5,1,1,1,5,1,1,4,1,5,2,4,1,1,1,2,1,1,4,4,1,2,1,1,1,1,5,3,1,1,1,1,4,1,4,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,5,1,2,1,1,1,1,1,1,1,1,1]
const initialState = [3, 4, 3, 1, 2];
//let initialStateString = "1,3,4,1,5,2,1,1,1,1,5,1,5,1,1,1,1,3,1,1,1,1,1,1,1,2,1,5,1,1,1,1,1,4,4,1,1,4,1,1,2,3,1,5,1,4,1,2,4,1,1,1,1,1,1,1,1,2,5,3,3,5,1,1,1,1,4,1,1,3,1,1,1,2,3,4,1,1,5,1,1,1,1,1,2,1,3,1,3,1,2,5,1,1,1,1,5,1,5,5,1,1,1,1,3,4,4,4,1,5,1,1,4,4,1,1,1,1,3,1,1,1,1,1,1,3,2,1,4,1,1,4,1,5,5,1,2,2,1,5,4,2,1,1,5,1,5,1,3,1,1,1,1,1,4,1,2,1,1,5,1,1,4,1,4,5,3,5,5,1,2,1,1,1,1,1,3,5,1,2,1,2,1,3,1,1,1,1,1,4,5,4,1,3,3,1,1,1,1,1,1,1,1,1,5,1,1,1,5,1,1,4,1,5,2,4,1,1,1,2,1,1,4,4,1,2,1,1,1,1,5,3,1,1,1,1,4,1,4,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,5,1,2,1,1,1,1,1,1,1,1,1"
let initialStateString = "3,4,3,1,2";
let initialStateArray = initialStateString.split(",");
initialStateString = initialStateArray.join(" \n");

let nextKey = "1";
let currentKey = "0";

const initialStateObj = {
  "0": [3, 4, 3, 1, 2],
};
let day = 1;

function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

const runString = async () => {
  let len = initialStateString.length;
  //console.log(len)

  for (let i = 0; i < len; i++) {
    let char = initialStateString.substr(i, 1);

    evalFishString(char, i);
  }

  console.log(`After ${day} day(s): ${initialStateString.length}`);
  day++;
};

const evalFishString = async (char: string, i: number) => {
  //console.log(char)

  let val = parseInt(char);
  //console.log(val)

  if (val === 0) {
    initialStateString = setCharAt(initialStateString, i, "6");
    //console.log(initialStateString)
    //initialState[i] = 6
    initialStateString = initialStateString + "8";
  } else {
    initialStateString = setCharAt(initialStateString, i, (val - 1).toString());
  }
};

const evalFish = (val: number, i: number) => {
  if (val === 0) {
    initialState[i] = 6;
    initialState.push(9);
  } else {
    initialState[i] = val - 1;
  }
};

const findNextKey = () => {
  let next = parseInt(currentKey) + 1;
  if (initialStateObj[currentKey].length > 100000) {
    console.log(initialStateObj[currentKey].length);
    initialStateObj[next] = [];
    //const nextKey = Object.keys(initialStateObj).length.toString()
    // console.log({nextKey})
    currentKey = next.toString();
  }
};

const evalFish2 = (val: number, i: number, key: string) => {
  //console.log({key})

  //console.log({nextKey})

  if (val === 0) {
    initialStateObj[key][i] = 6;
    initialStateObj[currentKey].push(8);
  } else {
    initialStateObj[key][i] = val - 1;
  }
};

const runPartTwo = () => {
  let keys = Object.keys(initialStateObj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const fishes = initialStateObj[key];

    for (let j = 0; j < fishes.length; j++) {
      const val = fishes[j];
      evalFish2(val, j, key);
    }
  }

  console.log(`After ${day} day(s)`);
  day++;

  // console.log({initialStateObj})
};

const runDay = () => {
  for (let i = 0; i < initialState.length; i++) {
    let val = initialState[i];

    evalFish(val, i);
  }

  console.log(`After ${day} day(s): ${initialState.length} Lantern Fishes`);
  day++;

  setTimeout(() => {
    return;
  }, 1000);
};

/* for (let i = 0; i < 200; i++) {
    runDay()
    
} */

console.log(startTime);
console.log(new Date().toLocaleString());

const sumFishes = () => {
  let keys = Object.keys(initialStateObj);
  let sum = 0;

  for (let i = 0; i < keys.length; i++) {
    sum = sum + initialStateObj[keys[i]].length;
  }

  console.log({ sum });
};

function isEven(x: number) {
  return x % 2 == 0;
}
function isOdd(x: number) {
  return !isEven(x);
}

//runFromFile(1)

const getRead = (loop: number): Promise<string> =>
  new Promise((resolve, reject) => {
    if (isEven(loop)) resolve(`file1.txt`);
    else resolve(`file2.txt`);
  });

const getWrite = (loop: number): Promise<string> =>
  new Promise((resolve, reject) => {
    if (isOdd(loop)) resolve(`file1.txt`);
    else resolve(`file2.txt`);
  });

const countFish = (file: string) => {
  console.log(file);
  let data = fs.readFileSync(`${file}`, "utf-8");
  console.log(data.length);
};

let files = ["file1.txt"];

const test = async () => {
  await truncateFilePromise(`./assets/day6/file1.txt`);
  console.log(`./assets/day6/file1.txt -> deleted`);
  await truncateFilePromise(`./assets/day6/file2.txt`);
  console.log(`./assets/day6/file2.txt -> deleted`);
  await writeToFilePromiseString(`./assets/day6/file1.txt`, initialStateString);
  console.log(`Initial data written`);

  // processLineByLine(0)
};

let loops = 256;

//test()

const test2 = async (loopsDone: number) => {
  console.log({ loopsDone });

  let writeTo = await getWrite(loopsDone);
  let readFrom = await getRead(loopsDone);

  let truncate = await truncateFilePromise(writeTo);

  let data = fs.readFileSync(`./assets/day6/${readFrom}`, "utf-8");

  data.on("line", (line) => {
    console.log(line);
  });

  /*     if (loopsDone <= loops - 1) {

        for (const ch of data){

            let line = parseInt(ch)
            //console.log(l)
            // Evalueate line
            if (line === 0) {
                await writeToFilePromise(`./assets/day6/${writeTo}`, 6)
                // new fish
                await writeToFilePromise(`./assets/day6/${writeTo}`, 8)
            } else {
                await writeToFilePromise(`./assets/day6/${writeTo}`, line - 1)
            }
        }

        test2(loopsDone + 1)


      } else {
          console.log("loop complete")
          countFish(`./assets/day6/${readFrom}`)
        } */
};

//test2(0)

async function processLineByLine(loopsDone: number) {

  console.log({ loopsDone });

  let writeTo = await getWrite(loopsDone);
  let readFrom = await getRead(loopsDone);

  let truncate = await truncateFilePromise(writeTo);

  let stream = fs.createWriteStream(`./assets/day6/${writeTo}`, 'utf-8');


  const fileStream = fs.createReadStream(`./assets/day6/${readFrom}`);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let charCountTotal = 0

  


    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.

      let charCount = 0;

      for (let i = 0; i < line.length; i++) {
        let char = line.substr(i, 1);
        //console.log(char);

        let val = parseInt(char);
        //console.log(l)
        // Evalueate line
        if (val === 0) {
          stream.write( (6).toString());
          charCount++;
          charCountTotal++
          // new fish
          stream.write( (8).toString());
          charCount++;
          charCountTotal++
        } else if (val > 0) {
          //console.log(val);
          stream.write( (val - 1).toString());
          charCount++;
          charCountTotal++
        }
        if (charCount > 70) {
          stream.write("\n");
          charCount = 0;
        }
      }

      //console.log(`Line from file: ${line}`);
    }

    stream.end()

    if (loopsDone < loops - 1) {
        console.log(charCountTotal)
        processLineByLine(loopsDone + 1);
      } else {
        console.log(writeTo);
        console.log(charCountTotal)
      }

      rl.close()

  }


processLineByLine(0);

//sumFishes()
