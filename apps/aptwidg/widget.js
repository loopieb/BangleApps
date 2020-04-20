(() => {
  var width = 25; // width of the widget
var a = [37,37,37,37,37,37,37,37];
  function draw() {
  var temp = new Temp();
    g.reset(); // reset the graphics context to defaults (color/font/etc)
    g.setFontAlign(0,0); // center fonts    
       
      var t = (E.getTemperature()+4.71);
      var sum = 36.5;
        a.forEach(function(x) { sum += x });
        var b =(Math.round((sum/a.length)*100)/100);
        a.push(t);
        a.shift();
   print(b+"c");
   // print(a.length);

    g.setFont("6x8",2);
    g.drawString(b+"C", this.x+width+4, this.y+18);
  }
  setInterval(function() {
    WIDGETS["temp"].draw(WIDGETS["temp"]);
  }, 60*1000); // update every minute

  // add your widget
  WIDGETS["temp"]={
    area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right)
    width: width, // how wide is the widget?
    draw:draw // called to draw the widget
  };
  
})()

