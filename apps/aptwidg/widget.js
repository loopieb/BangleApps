(() => {
  var width = 24; // width of the widget
var a = [31,32,33,34,25,26,27,28];
  function draw() {
  var date = new Date();
    g.reset(); // reset the graphics context to defaults (color/font/etc)
    g.setFontAlign(0,0); // center fonts    
       
      var t = (E.getTemperature()+4.71);
      var sum =35.8;
        a.forEach(function(x) { sum += x });
        var b =(Math.round((sum/a.length)*100)/100);
        a.push(t);
        a.shift();
   print(b,a.length);
   // print(a.length);

    g.setFont("6x8",2);
    g.drawString(b, this.x+width+8, this.y+20);
  }
  setInterval(function() {
    WIDGETS["date"].draw(WIDGETS["date"]);
  }, 60*1000); // update every 10 minutes

  // add your widget
  WIDGETS["date"]={
    area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right)
    width: width, // how wide is the widget?
    draw:draw // called to draw the widget
  };
  
})()
