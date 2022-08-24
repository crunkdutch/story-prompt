fs = require('fs');
const  data = process.argv[2];
let userData = null;
try {
    userData = JSON.parse(data); 
} catch (e) {
    userData = data;
}


// always 5 keys, first is number, rest are strings

validateInputValues = (inputs) => {
    let local = inputs[0];
    for (var values in local){
        //do some validation of the values
    }
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
        console.log('writing this file');
      }); 
}

replaceStoryParams(userData);