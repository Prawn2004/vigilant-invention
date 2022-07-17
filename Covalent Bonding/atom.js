class Atom{
  constructor(index, x, y, r, g, b){
    this.id = 0;
    this.element = elements[index];
    this.currentElectrons = 0;
    this.bonds = 0;
    this.lonePairs = 0;
    this.octet = octet[index];
    this.valenceElectrons = valenceElectrons[index];
//Position {
    this.x = x;
    this.y = y;
//}
//Color {
    this.r = r;
    this.g = g;
    this.b = b;
//}
    this.radius = 20;
    this.dragging = false;
    this.bondedTo = []
      this.clicked = false;
  }
  establishPotentialBonds(){
    //For every atom
    for(let i = 0; i<atoms.length; i++){
    //If that atom is the same atom as this one:
      if(atoms[i].id == this.id){
        //Then since this atom can't bond to itself, make that bond possibility null:
        this.bondedTo.push(null)
      }
      //Add bonding possibilities for all the other indexes in the atoms list and make them false, indicating that this atoms is not bonded to anything right now but can be bonded to the atoms of such indexes.
      else{this.bondedTo.push(0)}
      
    }
    console.log(this.bondedTo)
  }
  maintainOctet(){
    this.bonds = summedValues(this.bondedTo);
    this.lonePairs = this.octet/2 - this.bonds;
  }
  show(){
    fill(this.r, this.g, this.b)
    ellipse(this.x, this.y, this.radius*2);
    fill(0);
    textStyle(BOLD);
    text(this.element + this.id, this.x, this.y)
  }
  drag(){
     
    if(this.clicked && mouseIsPressed && dist(mouseX, mouseY, this.x, this.y) <= this.radius){
       this.dragging = true;  
    }
//      if(this.overlap()){
//          atoms[1].dragging = false;
//          
//      }
    if(this.dragging){
      this.x = mouseX;
      this.y = mouseY;
    }
  }
  drop(){
    if(!mouseIsPressed){
      this.dragging = false;
    }
      
  }
    overlap(){
        for(let i = 0; i < atoms.length; i++){
          if(this.id != i){
          if(dist(this.x, this.y, atoms[i].x, atoms[i].y) <= this.radius*2){
              return i;
          }
          }
      }
        return false;
    }
}