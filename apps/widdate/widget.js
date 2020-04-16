(() => {
  var width = 24;
  function draw() {
    g.reset();
    g.setFontAlign(0,0); 
    g.setFont("6x8",3);
      var temp = E.getTemperature()+5.56;
       
    g.drawString(temp, this.x+width/2+9, this.y+3);
  }
 //g.setColor(0, 0, 0);
  setInterval(function() {
    WIDGETS['temp'].draw(WIDGETS['temp']);
  }, 15000);
  WIDGETS["temp"]={area:"bl",width:width,draw:draw
  };
})()
