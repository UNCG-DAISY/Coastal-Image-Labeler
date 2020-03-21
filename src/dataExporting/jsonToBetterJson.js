//A node core library for file system
const fs = require('fs');

//Whats the inputfile
const inputFile = './data/raw/imageJSON.json'

//Where the output should be
const dir = 'outputs'
const outputFile = `./data/${dir}/formattedJSON.json`

//variable to keep track of how long it took to run
let startTime = process.hrtime()
let counter = 0;

 //Read and load data
 let rawdata = fs.readFileSync(inputFile);
 let loadedData = JSON.parse(rawdata);

 //Create the output json
 let output = {}

 //format
 loadedData.forEach((element,index) => {
     counter++
     output[index] = element   
 });

 if (!fs.existsSync(`./data/${dir}`)){
     fs.mkdirSync(`./data/${dir}`);
 } 

 //write
 fs.writeFileSync(outputFile, JSON.stringify(output));

 //Log time
 let endTime = process.hrtime(startTime)
 console.log(`Reading and writing of ${counter} files took: ${endTime[1] / 1000000}ms`)