(() => {
  var width = 25; // width of the widget
var a = [37,37,37,37,37,37,37,37];
  function draw() {
  var date = new Date();
    g.reset(); // reset the graphics context to defaults (color/font/etc)
    g.setFontAlign(0,0); // center fonts    
       
      var t = (E.getTemperature()+2.65);
      var sum = 30;
        a.forEach(function(x) { sum += x });
        var b =(Math.round((sum/a.length)*100)/100);
        a.push(t);
        a.shift();
  // print(sum,b+"c");
 //  print(b,a.length);

    g.setFont("6x8",2.5);
    g.drawString(b+"C", this.x+width+4, this.y+18);
  }
  setInterval(function() {
    WIDGETS["date"].draw(WIDGETS["date"]);
  }, 30*1000); // update every 30 secs

  // add your widget
  WIDGETS["date"]={
    area:"bl", // tl (top left), tr (top right), bl (bottom left), br (bottom right)
    width: width, // how wide is the widget?
    draw:draw // called to draw the widget
  };
  
})()
