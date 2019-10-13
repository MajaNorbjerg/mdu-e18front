"use strict";

// declaring an object by input params
let year1 = {
  year: 'year1',
  cowsFeedConsumption: '8139,35045379522',
  herdMilkProduction: '10185,4494495619',
  herdYearCows: '51',
  energyDiesel: '8284',
  energiElectricity: '41640',
  herdSelfSufficiencyInFeed: '79,2252839932684',
};


// generate and calc data to visualize
function generateOutput(input) {
  // Some calculation by the 'Big Arla Calculator'
  // 'The Black Box'
  // [...]

  let generatedOutput = {
    diesel: '0,0321754382603365',
    electricityAndHeating: '0,0314164515212698',
    digestionCows: '0,353773190328057',
    importedFeed: '0,116448603343525',
    carbonFootprintWholeFarm: '504,461639079191'
  };

  return generatedOutput;
}