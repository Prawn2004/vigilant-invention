//Function that checks your answer once you submit:
function checkAnswer(){
    let buttonText = document.getElementById("submit").innerHTML
    if (buttonText == "CHECK ANSWER"){
        expButton.style.display = 'block';
      document.getElementById("submit").innerHTML = "NEXT"  
  for (let i = 0; i < atoms.length; i++) {
    atoms[i].maintainOctet();
  }
//    if(molecules.fattyAcid[randomMoleculeIndex]){
//        let carboxylGroup = false;
//        for(let i = 0; i < atoms.length; i++){
//            if(atoms[i].element == 'C'){
//                let bondedOxygens = 0;
//               for(let j = 0; j < atoms[i].bondedTo.length; j++){
//                  if(atoms[i].bondedTo[j] && atoms[j].element == 'O'){
//                      bondedOxygens ++;
//                      let bondedCarbons = 0;
//                      for(let k = 0; k < atoms[j].bondedTo.length; k++){
//                         if(atoms[j].bondedTo[k] && atoms[k].element == 'C'){
//                      bondedCarbons ++; 
//                      }
//                       if(bondedCarbons > 1){
//                              console.log('OXYGEN HAS 2 CARBONS NOOO')
//                              return false;
//                          }   
//                  } 
//                      
//               }
//                
//            }
//                if(bondedOxygens == 2){
//                    carboxylGroup = true;
//                }
//        }
//        
//    }
//        if(!carboxylGroup){
//            console.log('noooooooooo')
//            return false;
//        }
//    }
  console.log('bonds: ' + atoms[0].bondedTo);
  
  console.log('Current Bonds: ' + currentBonds);
  
  //Define variables representing:
  // 1) The number of lone pairs on the screen
  var lonePairs = 0;
  // 2) The number of bonds on the screen
  var bonds = 0;
  
  //For all possibleBonds: 
  for(let i = 0; i<possibleBonds.length; i++){
    //If the bond is true:
    if(currentBonds[i] != false){
      //Increment bonds:
      bonds += Number(currentBonds[i]);
    }
  }
  
  //For every atom:
  for(let i = 0; i < atoms.length; i++){
    
    console.log(atoms[i].element + atoms[i].id + " bondedTo: " + atoms[i].bondedTo)
      console.log(atoms[i].element + atoms[i].id + " bonds: " + atoms[i].bonds)
    console.log(atoms[i].element + atoms[i].id + " lone pairs: " + atoms[i].lonePairs);
    //Increment lone pairs by the atoms current number of lone pairs maintained by the maintainOctet function (which is run in the draw function):
      if(atoms[i].lonePairs < 0){
      correct = false;
          console.log('NOOOOOO')
          return false;
      }
      
    lonePairs += atoms[i].lonePairs;
  }
  
  let currentTotalElectronCount = 2*lonePairs + 2*bonds
  
  console.log('electron goal:' + totalElectrons)
  console.log("lone pairs: " + lonePairs);
  console.log('current Electron: ' + currentTotalElectronCount)
  if(currentTotalElectronCount - totalElectrons == -1*molecules.charge[randomMoleculeIndex]){
    correct = true;
    console.log('WOOHOO');
      return true;
  }
}else{
   newProblem();
    document.getElementById("submit").innerHTML = "CHECK ANSWER"
    expButton.style.display = 'none';
}
}


function createBond(){
 // bondButton.style.display = 'none';
  // console.log(bondRequests)
  for(let i = 0; i < bondRequests.length; i++){
    if(bondRequests[i] == true){
      currentBonds[i] = bondDropdown.value();
      atoms[possibleBonds[i][0]].bondedTo[possibleBonds[i][1]] = bondDropdown.value();
  atoms[possibleBonds[i][1]].bondedTo[possibleBonds[i][0]] = bondDropdown.value();
      console.log(atoms[possibleBonds[i][0]].bondedTo[possibleBonds[i][1]])
    bondRequests[i] = false;
        $("#bonddropdown").prop("selectedIndex", 0);
    return("bonded");
    }
     
  }
  
 
  
  // console.log(bondDropdown.value())
  // console.log(currentBonds);
}

function includes(list, number) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] == number) {
      return true;
    }
  }
}

function trueAmount(list) {
  var count = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] != false && list[i] != null) {
      count++;
    }
  }
  return count;
}

function summedValues(list) {
  var sum = 0;
  for (let i = 0; i < list.length; i++){
    if(list[i] != false && list[i] != null){
    sum += Number(list[i])
    }
  }
  return sum;
}

function newProblem() {
    let oldRandomIndex = randomMoleculeIndex;
    while(randomMoleculeIndex==oldRandomIndex){
    randomMoleculeIndex = math.randomInt(0, molecules.formulas.length);
    }
    formula = molecules.names[randomMoleculeIndex];
    atoms = [];
    totalElectrons = 0;
    for (let i = 0; i < molecules.formulas[randomMoleculeIndex].length; i++) {
  //If that element is present in the formula:
  if (molecules.formulas[randomMoleculeIndex][i] != 0) {
    //Create a new random color for that element:
    var Red = math.randomInt(0, 255);
    var Green = math.randomInt(0, 255);
    var Blue = math.randomInt(0, 255);
      while(((0.21 * Red) + (0.72 * Green) + (0.07 * Blue)) < 150){
         Red = math.randomInt(0, 255);
    Green = math.randomInt(0, 255);
    Blue = math.randomInt(0, 255); 
      }
    //Create new instances of however many atoms of that element the formula has:
    for (let j = 0; j < molecules.formulas[randomMoleculeIndex][i]; j++) {
      //Add each instance to to the atoms list:
      atoms.push(new Atom(i, 0, 200, Red, Green, Blue));
    }
  }
}
    //For every atom in the game, position it, assign id, add valence electrons to totalElectrons:
for (let i = 0; i < atoms.length; i++) {
  //Position the atom:
  atoms[i].x = (canvasWidth/2 + 50) - (100 * atoms.length) / 2 + 100 * i;
  //Assigning each atom an id starting from 0:
  atoms[i].id = i;
  //Add to totalElectrons the amount of valence electrons
  totalElectrons += atoms[i].valenceElectrons;
}

//Establish potential bonds:
for (let i = 0; i < atoms.length; i++) {
  
atoms[i].establishPotentialBonds();
}
    //---------------------------------------------------------------------------------------------------------
//Bonding parallel lists

    //List holding individual 2 element lists representing all the possible bonding pairs on the screen (This list will stay constant until next level):
    possibleBonds = [];
    
    //List representing which bonds in the possibleBonds list exist at the moment(true) or not (false):
    currentBonds = [];
    //List holding whether or not a bond is being requested between two atoms (with respective indexes from possibleBonds)
    bondRequests = [];
//Create all the possible bond combinations and make them all false in the currentBonds and bondRequests parallel lists:
for (let i = 0; i < atoms.length - 1; i++) {
  for (let j = i + 1; j < atoms.length; j++) {
    let bond = [atoms[i].id, atoms[j].id];
    possibleBonds.push(bond);
    // bonds.push(new Bond(i, j))
    currentBonds.push(false);
    bondRequests.push(false);
  }
}

//---------------------------------------------------------------------------------------------------------
correct = false;
bondButton.style.display = 'none';
}