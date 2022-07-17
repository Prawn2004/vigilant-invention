//class Bond {
//  constructor(a1, a2){
//    this.id = 0;
//    this.atom1 = a1;
//    this.atom2 = a2;
//    this.exists = false;
//    this.x = 0;
//    this.y = 0;
//    this.previousExists = false;
//    this.dropdownVisible = false;
//    this.dropDown = 0;
//  }
//  show(a1, a2){
//    fill(0);
//    line(a1.x, a1.y, a2.x, a2.y)
//  }
//  setOldState(){
//    this.previousExists = this.exists;
//  }
//  
//  showPopUp(){
//    if(this.previousExists != this.exists && this.exists == true){
//      this.dropdownVisible = true;
//      console.log('bye')
//    }
//  }
//  createBond(){
//    this.dropdownVisible = false;
//    console.log('hi')
//  }
//  
//  
//}