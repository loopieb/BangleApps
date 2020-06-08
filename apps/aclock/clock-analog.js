// eliminate ide undefined errors
let g;
let Bangle;
const widgetHeight=24+1;
const centerY = (g.getWidth() / 2) + widgetHeight/2;
g.clear();
setInterval(function getTemp() { 
 var ht=120; 
//g.reset();
  NRF.findDevices(function(devices) {
    var found = false;
    for (var i in devices) {
      if (devices[i].name!="MyTemp") continue;
      // index of 0x1809 in advertised data
      var d = E.toString(devices[i].data);
      var idx = d.indexOf(String.fromCharCode(0x09,0x18));
      if (idx>=0) {
        t = d.charCodeAt(idx+2);       
      const wz = ((g.getWidth() - g.stringWidth(t)) / 2)+40;
      const rf = ((g.getWidth() - g.stringWidth(t)) / 2)+28;
        g.setFont("Vector",20);
       g.drawString(t,wz, centerY - 50,true);
       g.drawString("Meds     C", rf, centerY - 50,true);
    // g.flip();   
      }
    }
   }, 3000 /* receive for 3000ms */);
 }, 10000);
// look once a minute for temperature


// http://forum.espruino.com/conversations/345155/#comment15172813
const locale = require('locale');
const p = Math.PI / 2;
const pRad = Math.PI / 180;
const faceWidth = 100; // watch face radius (240/2 - 24px for widget area)
// const widgetHeight=24+1;
let timer = null;
let currentDate = new Date();
const centerX = g.getWidth() / 2;
// const centerY = (g.getWidth() / 2) + widgetHeight/2;




const seconds = (angle) => {
  const a = angle * pRad;
  const x = centerX + Math.sin(a) * faceWidth;
  const y = centerY - Math.cos(a) * faceWidth;

  // if 15 degrees, make hour marker larger
  const radius = (angle % 15) ? 2 : 4;
  g.fillCircle(x, y, radius);
};

const hand = (angle, r1, r2) => {
  const a = angle * pRad;
  const r3 = 3;

  g.fillPoly([
    Math.round(centerX + Math.sin(a) * r1),
    Math.round(centerY - Math.cos(a) * r1),
    Math.round(centerX + Math.sin(a + p) * r3),
    Math.round(centerY - Math.cos(a + p) * r3),
    Math.round(centerX + Math.sin(a) * r2),
    Math.round(centerY - Math.cos(a) * r2),
    Math.round(centerX + Math.sin(a - p) * r3),
    Math.round(centerY - Math.cos(a - p) * r3)
  ]);
};

const drawAll = () => {
  g.clear();
  currentDate = new Date();
  // draw hands first
  onMinute();
  // draw seconds
  const currentSec = currentDate.getSeconds();
  // draw all secs

  for (let i = 0; i < 60; i++) {
    if (i > currentSec) {
      g.setColor(0, 0, 0.6);
    } else {
      g.setColor(0.3, 0.3, 1);
    }
    seconds((360 * i) / 60);
  }
  onSecond();

};

const resetSeconds = () => {
  g.setColor(0, 0, 0.6);
  for (let i = 0; i < 60; i++) {
    seconds((360 * i) / 60);
  }
};

const onSecond = () => {
  g.setColor(0.3, 0.3, 1);
  seconds((360 * currentDate.getSeconds()) / 60);
  if (currentDate.getSeconds() === 59) {
    resetSeconds();
    onMinute();
  }
  g.setColor(1, 0.7, 0.2);
  currentDate = new Date();
  seconds((360 * currentDate.getSeconds()) / 60);
  g.setColor(1, 1, 1);
};

const drawDate = () => {
  g.reset();
  g.setColor(-1);
  g.setFont('Vector', 20);

  const dayString = locale.dow(currentDate, true);
  // pad left date
  const dateString = (currentDate.getDate() < 10) ? '0' : '' + currentDate.getDate().toString();
  const dateDisplay = `${dayString}--${dateString}`;
  // console.log(`${dayString}|${dateString}`);
  // center date
  const l = (g.getWidth() - g.stringWidth(dateDisplay)) / 2;
  const t = centerY + 37;
 // const d = centerY - 37;
  g.drawString(dateDisplay, l, t, true);
//  g.drawString(E.getTemperature()+2.6, l, d, true);
  // console.log(l, t);
};
const onMinute = () => {
  if (currentDate.getHours() === 0 && currentDate.getMinutes() === 0) {
    g.clear();
    resetSeconds();
  }
  // clear existing hands
  g.setColor(0, 0, 0);
  // Hour
  hand((360 * (currentDate.getHours() + currentDate.getMinutes() / 60)) / 12, -8, faceWidth - 35);
  // Minute
  hand((360 * currentDate.getMinutes()) / 60, -8, faceWidth - 10);

  // get new date, then draw new hands
  currentDate = new Date();
  g.setColor(1, 0.9, 0.9);
  // Hour
  hand((360 * (currentDate.getHours() + currentDate.getMinutes() / 60)) / 12, -8, faceWidth - 35);
  g.setColor(1, 1, 0.9);
  // Minute
  hand((360 * currentDate.getMinutes()) / 60, -8, faceWidth - 10);
  if (currentDate.getHours() >= 0 && currentDate.getMinutes() === 0) {
    Bangle.buzz();
  }
  drawDate();
};

const startTimers = () => {
  timer = setInterval(onSecond, 1000);
};

Bangle.on('lcdPower', (on) => {
  if (on) {
    // g.clear();
    drawAll();
    startTimers();
    Bangle.drawWidgets();
  } else {
    if (timer) {
      clearInterval(timer);
    }
  }
});


g.clear();
resetSeconds();
startTimers();
drawAll();
Bangle.loadWidgets();
Bangle.drawWidgets();

// Show launcher when middle button pressed
setWatch(Bangle.showLauncher, BTN2, { repeat: false, edge: "falling" });
