//GAME SETUP AND HTML {
    var canvasWidth = 1000;
    var canvasHeight = 500;
    var cx = window.innerWidth/2 - canvasWidth/2;
    var cy = window.innerHeight/2 - canvasHeight/2;
    var bondDropdown;
    var expWidth = canvasWidth/1.5
    //setup canvas and create bond dropdown:
    function setup() {
      let cnv = createCanvas(canvasWidth, canvasHeight);
        cnv.position(cx, cy)
      bondDropdown = createSelect();
        bondDropdown.id('bonddropdown')
        bondDropdown.option(0);
      bondDropdown.option(1);
      bondDropdown.option(2);
      bondDropdown.option(3);
      bondDropdown.option(4);
        bondDropdown.changed(createBond)
      bondDropdown.hide();
      select("#infoBtn").position(cx + 10, cy + canvasHeight-11);
        select("#expBtn").position(cx + canvasWidth-150, cy + 100);
      select("#submit").position(cx + canvasWidth - 115, cy + canvasHeight-11)
        select("#explanation").position(cx+100, cy + 50);
        
    }
//}