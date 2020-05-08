(() => {
  
  var width = 25; // width of the widget
//var a = [37,37,37,37,37,37,37,37];
  var x = 5;
  //g.reset();
   function draw() {
     var date = new Date();
     //var x = 5;
     var sum;
//    g.clear();
    g.reset(); 
    g.setFontAlign(0,0); // center fonts
     // var t = (E.getTemperature());
      //var sum = 30;
//var currentTemp = 0;
  function getTemp() { 
//  var d = 0;  
  NRF.findDevices(function(devices) {
    var found = false;
    for (var i in devices) {
      if (devices[i].name!="MedsTemp") continue;
      // index of 0x1809 in advertised data
      //print("Found");
      var d = E.toString(devices[i].data);
      var idx = d.indexOf(String.fromCharCode(0x09,0x18));
      if (idx>=0) {
        t = d.charCodeAt(idx+2);
      //  print(t);
        g.setFont("6x8",2.5);
       g.drawString("M"+t+"c", this.x+width+4, this.y+18);
      
 // g.flip();
        }
    }
   }, 2000 /* receive for 2000ms */);
}
// look once a minute for temperature
setInterval(getTemp, 20000);

  }
  setInterval(function() {
 WIDGETS.date.draw(WIDGETS.date);
   // print("hi");
  }, 30*1000); // update every 30 secs

  // add your widget
  WIDGETS.date={
    area:"bl", width: width, draw:draw // called to draw the widget
  }; 
  
})();
