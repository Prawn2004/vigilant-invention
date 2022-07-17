//Game code:

//atom/molecule information {
//{
    var elements = ["H", "F", "Cl", "Br", "I", "O", "S", "Se", "N", "P", "C"];
    var valenceElectrons = [1, 7, 7, 7, 7, 6, 6, 6, 5, 5, 4];
    var octet = [2];
        //Add the octet value (8) for all the elements after hydrogen (starting at index 1):
        for (var i = 1; i < elements.length; i++) {
            octet.push(8);
        }
    //Variable representing the total number of electrons available to the user to complete octets:
    var totalElectrons = 0;
    var molecules = {
        formulas: [
          //[H, F, Cl, Br, I, O, S, Se, N, P, C]
            [0, 2,  0,  0, 0, 0, 1,  0, 0, 0, 0],
            [2, 0,  0,  0, 0, 1, 0,  0, 0, 0, 0],
            [3, 0,  0,  0, 0, 0, 0,  0, 1, 0, 0],
            [0, 0,  0,  0, 3, 0, 0,  0, 0, 1, 0],
            [0, 0,  0,  0, 0, 0, 0,  0, 2, 0, 0],
            [0, 1,  0,  0, 0, 0, 0,  0, 1, 0, 1],
            [6, 0,  0,  0, 0, 1, 0,  0, 0, 0, 2],
            [4, 0,  0,  0, 0, 1, 0,  0, 0, 0, 1],
//            [4, 0,  0,  0, 0, 2, 0,  0, 0, 0, 3],
//            [6, 0,  0,  0, 0, 2, 0,  0, 0, 0, 3],
            [4, 0,  0,  0, 0, 0, 0,  0, 1, 0, 0],
            [0, 3,  0,  0, 0, 0, 0,  0, 1, 0, 0],
            [0, 0,  0,  0, 0, 2, 0,  0, 1, 0, 0],
            [0, 0,  0,  0, 0, 2, 0,  0, 0, 0, 1],
        ],
          //[0, 0,  0,  0, 0, 0, 0,  0, 0, 0, 0]
        names: ["SF\u2082", "H\u2082O", "NH\u2083", "PI\u2083", "N\u2082", "FCN", "C\u2082H\u2086O", "CH\u2084O", 
//                "CH\u2082CHCOOH", "CH\u2083CH\u2082COOH",
                "NH\u2084\u207A", "NF\u2083", "NO\u2082", "CO\u2082"],
//        fattyAcid: [false, false, false, false, false, false, false,   false,   true,     true, false],
//        saturated: [false, false, false, false, false, false, false,   false,   false,     true, false],
//        unsaturated: [],
        charge: [0, 0, 0, 0, 0, 0, 0, 0, 
//                 0, 0, 
                 1, 0, 0, 0]
};

//for(let i = 0; i<molecules.formulas.length; i++){
//    molecules.names.push('')
//    for(let j = 0; j<molecules.formulas[i].length; j++){
//        let elAmount = molecules.formulas[i][j];
//        if(elAmount > 0){
//            molecules.names[i] += elements[j];
////            switch(elAmount){
////                case 2: 
////                    molecules.names[i] += '\u2082'; 
////                    break;
////                case 3:
////                    molecules.names[i] += '\u2082'; 
////                    break;
////                case 4:
////                    molecules.names[i] += '\u2082'; 
////                    break;
////                case 5:
////                    molecules.names[i] += '\u2082'; 
////                    break;
////                case 6:
////                    molecules.names[i] += '\u2082'; 
////                    break;
////                case 7:
////                    molecules.names[i] += '\u2082'; 
////                    break;
////            }
//            if(elAmount > 1){
//            molecules.names[i] +=  elAmount.toString()
//            }
//        }
//    }
//}

//for(let i = 0; i<molecules.fattyAcid.length; i++){
//    if(molecules.fattyAcid[i] && !molecules.saturated){
//        molecules.unsaturated.push(true);
//    }
//    else{molecules.unsaturated.push(false);}
//}

    //Used to generate a random molecule:
    var randomMoleculeIndex = math.randomInt(0, molecules.formulas.length);
//    randomMoleculeIndex = 13;
    var formula = molecules.names[randomMoleculeIndex]; 
    var atoms = [];
//}
//}





//for every element in the game
for (let i = 0; i < molecules.formulas[randomMoleculeIndex].length; i++) {
  //If that element is present in the formula:
  if (molecules.formulas[randomMoleculeIndex][i] != 0) {
    //Create a new random color for that element:
    var Red = math.randomInt(0, 255);
    var Green = math.randomInt(0, 255);
    var Blue = math.randomInt(0, 255);
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
    var possibleBonds = [];
    
    //List representing which bonds in the possibleBonds list exist at the moment(true) or not (false):
    let currentBonds = [];
    //List holding whether or not a bond is being requested between two atoms (with respective indexes from possibleBonds)
    var bondRequests = [];
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


//Create bond button
var bondButton = document.getElementById('bondButton');
bondButton.style.display = 'none';

var expButton = document.getElementById('expBtn');
expButton.style.display = 'none';

var correct = false;
function draw() {
    cursor('crosshair')
  textAlign(CENTER, CENTER);
    background(220);
    
    push()
    fill(0)
    text("Create the Lewis structure for:", canvasWidth/2, 50);
    textSize(20)
    text(formula, canvasWidth/2, 75);
    pop()
    
    if(correct){
        push()
    fill(0)
         textSize(20)
    text("WOOOOOOO", canvasWidth/2, 100);
   
    pop()
    }
  
  //For every atom:
  for (let i = 0; i < atoms.length-1; i++) {
    //For every atom
    for (var j = i+1; j < atoms.length; j++) {
      //If the current atom in the "i" loop is not the same as the one in the "j" loop:
      if (i != j) {
        //For every possible bonding pair:
        for (let k = 0; k < possibleBonds.length; k++) {
          //For the bonding pair in possibleBond that matches the current pair (atoms[i] and atoms[j]):
          if (
            // $.inArray(atoms[i].id, possibleBonds[k]) &&
            // $.inArray(atoms[j].id, possibleBonds[k])
            includes(possibleBonds[k], atoms[i].id) &&
            includes(possibleBonds[k], atoms[j].id)
          ) {
            //If the two atoms are within 60 pixels of each other:
            if (dist(atoms[i].x, atoms[i].y, atoms[j].x, atoms[j].y) < 60) {
              
              //Draw a line between them
              push()
              stroke(150);
              line(atoms[i].x, atoms[i].y, atoms[j].x, atoms[j].y);
              pop()
             
               //If they havent officially been bonded yet
               if(currentBonds[k] == false){
                 //Create a bond request:
                 if((!mouseIsPressed || mouseX<0 || mouseX > 400 || mouseY < 0 || mouseY > 400))
                bondRequests[k] = true;
               }else{
                 push()
              stroke(0);
                 strokeWeight(3*sq(currentBonds[k]) - 5*currentBonds[k] + 3)
              line(atoms[i].x, atoms[i].y, atoms[j].x, atoms[j].y);
              pop()
                 bondRequests[k] = false;}
              
            }
            //If they are not within 60 pixels of each other:
            else {
              //Make the currentBonds value false;
              currentBonds[k] = false;
              bondRequests[k] = false;
              //The bond for these two atoms doesn't exist:
              // bonds[k].exists = false;
              //Make each atoms bondedTo value false for the other atom:
              atoms[i].bondedTo[j] = false;
              atoms[j].bondedTo[i] = false;
              // bonds[k].dropdownVisible = false;
            }
          }
        }
      }
    }
  }
// console.log(currentBonds);
// console.log(atoms[0].lonePairs)
  if(trueAmount(bondRequests) > 0){
    // console.log('BONDS')
      
    bondDropdown.show();
      
    bondButton.style.display = 'block';
      
  }else{bondDropdown.hide();
       bondButton.style.display = 'none';}
  
  
  // for (let i = 0; i < atoms.length; i++) {
  //   atoms[i].maintainOctet();
  // } 
  
  
  //For every atom:
  for (let i = 0; i < atoms.length; i++) {
    //Show the circle:
    atoms[i].show();
    //Make it drag and droppable:
    atoms[i].drag();
//    atoms[i].drop();
  }
    
    //Outline in yellow the two atoms you are asked to bond in the dropdown:
    for(let i = 0; i < bondRequests.length; i++){
         if(bondRequests[i] == true){
             push()
             stroke(255, 255, 0)
             noFill();
             strokeWeight(2);
             ellipse(atoms[possibleBonds[i][0]].x, atoms[possibleBonds[i][0]].y, atoms[0].radius*2)
             ellipse(atoms[possibleBonds[i][1]].x, atoms[possibleBonds[i][1]].y, atoms[0].radius*2)
             pop()
             bondDropdown.position(cx+(atoms[possibleBonds[i][0]].x+atoms[possibleBonds[i][1]].x)/2, cy-60+(atoms[possibleBonds[i][0]].y+atoms[possibleBonds[i][1]].y)/2)
             
             break;
         } 
        
      }
}

function mousePressed(){
    for(let i = atoms.length-1; i >= 0; i--){
        if(dist(mouseX, mouseY, atoms[i].x, atoms[i].y) <= atoms[i].radius){
            atoms[i].clicked = true;
            break;
        }
    }
}

function mouseReleased(){
    for(let i = 0; i < atoms.length; i++){
        atoms[i].clicked = false;
        atoms[i].dragging = false;
    }
}


