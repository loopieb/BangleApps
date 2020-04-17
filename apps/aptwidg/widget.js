(() => {
  var width = 24; // width of the widget

  function draw() {
    var date = new Date();
    g.reset(); // reset the graphics context to defaults (color/font/etc)
    g.setFontAlign(0,0); // center fonts    
       
      var text = E.getTemperature()+4.91;
          //require("locale").month(date,1);
    g.setFont("6x8",2);
    g.drawString(text, this.x+width+8, this.y+20);
  }

  setInterval(function() {
    WIDGETS["date"].draw(WIDGETS["date"]);
  }, 60*1000); // update every 10 minutes

  // add your widget
  WIDGETS["date"]={
    area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right)
    width: width, // how wide is the widget? You can change this and call Bangle.drawWidgets() to re-layout
    draw:draw // called to draw the widget
  };
})()
