fs = require('fs');
const  data = process.argv[2];
let userData;
let recordsFile = null;

try {
    userData = JSON.parse(data); 
} catch (e) {
    userData = data;
}

saveInputsForRecords = (recordsInputs) => {
    //check if we have already made the storage file
    recordsFile = fs.readFile("recordsFile.txt", "utf8", function(error, data){
        
        let savedRecords = JSON.stringify(recordsInputs);
        
        if (data){
            //write the inputs to the file as a list of csv in a single line
            console.log('we have already, open it and add the records');
        }
        else{
            //this means dont have the file yet, create the file and write the first set
            recordsFile = fs.writeFile("recordsFile.txt", savedRecords, function (error) {
                if (error) return console.log(error);
                console.log('creating records file');
              });
        }
    })
}

validateInputValues = (inputs) => {
    let local = inputs[0];
    
    for (var values in local){
        // do some validation of the values
        // first is number, rest are strings        
        if (typeof local[values] == "number"){
            let num = local[values];
            if (num.toString().length > 5){
                throw ("Numbers should be <= 5 characters, including decimals");
            } 
        }
        else{
            let str = local[values];
            if (str.length > 10){
                throw("Values should <= 10 characters");
            }
        }
    }
    saveInputsForRecords(inputs);
    replaceStoryParams(inputs);
}

replaceStoryParams = (param) => {    
    let fNumber = param[0].number ? param[0].number : param.number;
    let fUnit = param[0].unit_of_measure ? param[0].unit_of_measure : param.unit_of_measure;
    let fPlace = param[0].place ? param[0].place : param.place;
    let fAdjective = param[0].adjective ? param[0].adjective : param.adjective;
    let fNoun = param[0].noun ? param[0].noun :  param.noun;
    let fStory = `One day Anna was walking her ${fNumber} ${fUnit} commute to ${fPlace} and found a ${fAdjective} ${fNoun} on the ground.`; 

    outputFile = fs.writeFile(`finished-story-${fAdjective}-${fNoun}.txt`, fStory, function (error) {
        if (error) return console.log(error);
        console.log('creating final story file');
      }); 
}

validateInputValues(userData);