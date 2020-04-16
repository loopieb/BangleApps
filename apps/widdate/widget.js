(() => {
  var width = 24; // width of the widget

  function draw() {
    var date = new Date();
    g.reset(); // reset the graphics context to defaults (color/font/etc)
    g.setFontAlign(0,0); // center fonts    
    //g.drawRect(this.x, this.y, this.x+width-1, this.y+23); // check the bounds!
    // Draw icon
    //g.drawImage(atob("DA0CDQBwv//+////////1VVX0AAH0AAH0AAH0AAH0AAH0AAH1VVXv//+"), this.x+6, this.y)
    // Draw a small day of the month    
   // g.drawString(date.getDate(), this.x+width/2, this.y+11);
    // Use 'locale' module to get a shortened day of the week
    // in the correct language    
      var text = E.getTemperature()+5.61;
          //require("locale").month(date,1);
    g.setFont("6x8",2);
    g.drawString(text, this.x+width/2, this.y+25);
  }

  setInterval(function() {
    WIDGETS["date"].draw(WIDGETS["date"]);
  }, 10*60000); // update every 10 minutes

  // add your widget
  WIDGETS["date"]={
    area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right)
    width: width, // how wide is the widget? You can change this and call Bangle.drawWidgets() to re-layout
    draw:draw // called to draw the widget
  };
})()
