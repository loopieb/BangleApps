(() => {
  
  var width = 24; // width of the widget
   function draw() {
    g.reset(); 
    g.setFontAlign(0,0); // center fonts
  function getTemp() { 
  NRF.findDevices(function(devices) {
    var found = false;
    for (var i in devices) {
      if (devices[i].name!="MedsTemp") continue;
      // index of 0x1809 in advertised data
      var d = E.toString(devices[i].data);
      var idx = d.indexOf(String.fromCharCode(0x09,0x18));
      if (idx>=0) {
        t = d.charCodeAt(idx+2);      
        g.setFont("6x8",2.5);
       g.drawString("M"+t+"c", this.x+width/2, this.y+12);
      }
    }
   }, 2000 /* receive for 2000ms */);
}
// look once a minute for temperature
setInterval(getTemp, 20000);
   }
  setInterval(function() {
 WIDGETS.date.draw(WIDGETS.date);
  }, 30*1000); // update every 30 secs

  // add your widget
  WIDGETS.date={
    area:"bl", width: width, draw:draw // called to draw the widget
  }; 
})()
