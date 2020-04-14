var counter = 30;
function countDown() {
 counter--;
var Temp = E.getTemperature()-1.25;
//function countdown() {
  //Temp--;
  g.clear();
  g.setFont("Vector",80);
  g.setFontAlign(0,0);
  g.drawString(Temp, g.getWidth()/2,
               g.getHeight()/2);
  g.flip();
}
  var interval = setInterval(countDown, 2000);
