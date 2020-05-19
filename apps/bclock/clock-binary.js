const canvasWidth = 290;
const numberOfColumns = 6;
const drawFullGrid = false;
g.clear();
function getTemp() { 
 var ht=g.getHeight()/2;
 var wt=g.getWidth()/2; 
//g.reset();
  NRF.findDevices(function(devices) {
    var found = false;
    for (var i in devices) {
      if (devices[i].name!="JTBPuck3") continue;
      // index of 0x1809 in advertised data
      var d = E.toString(devices[i].data);
      var idx = d.indexOf(String.fromCharCode(0x09,0x18));
      if (idx>=0) {
        t = d.charCodeAt(idx-2);
       print(t);
        g.setFontAlign(0, 0);
        g.setColor(0.8, 0.2, 0.8);
        g.setFont("Vector",20);
       g.drawString("Meds "+t+" c", wt-50, ht-45);
         }
    //  g.flip();
    }
   }, 1000 /* receive for 3000ms */);
 }
// look once a minute for temperature
setInterval(getTemp, 5000);


const colpos = canvasWidth / numberOfColumns - 10;
const binSize = (canvasWidth / numberOfColumns) / 3;

const findBinary = target => {
    return [
        [0, 0, 0, 0],  // 0
        [1, 0, 0, 0],  // 1
        [0, 1, 0, 0],  // 2
        [1, 1, 0, 0],  // 3
        [0, 0, 1, 0],  // 4
        [1, 0, 1, 0],  // 5
        [0, 1, 1, 0],  // 6
        [1, 1, 1, 0],  // 7
        [0, 0, 0, 1],  // 8
        [1, 0, 0, 1],  // 9
    ][target];
};

const getCurrentTime = () => {
    const flattenArray = (array = []) => [].concat.apply([], array);
    const format = number => {
        const numberStr = number.toString();
        return numberStr.length === 1 ? ["0", numberStr] : numberStr.split("");
    };
    const now = new Date();
    return flattenArray([now.getHours(), now.getMinutes(), now.getSeconds()].map(format));
};

let prevFrame = [];
const drawColumn = (position = 0, column = [0, 0, 0, 0]) => {
    const maxDotsPerColumn = [2, 4, 3, 4, 3, 4];

    const columnPos = position * colpos;
    let pos = colpos / 2 + 45;
    const frame = column.reverse();
    const drawDot = fn => g[fn]((columnPos + colpos / 2), pos, binSize);

    for (let i = 0; i < frame.length; i += 1) {
        if (i + maxDotsPerColumn[position] >= 4 || drawFullGrid) {
            if (prevFrame && prevFrame[position] && prevFrame[position][i]) {
                if (frame[i] !== prevFrame[position][i]) {
                    // subsequent draw
                    g.clearRect((columnPos + colpos / 2) - 15, pos - 15, (columnPos + colpos / 2) + 20, pos + 20);
                    if (frame[i]) {
                        drawDot('fillCircle');
                    } else {
                        drawDot('drawCircle');
                    }
                }
            } else {
                // First draw
                if (frame[i]) {
                    drawDot('fillCircle');
                } else {
                    drawDot('drawCircle');
                }
            }
        }
        pos += colpos;
    }
};

const drawClock = () => {
    const data = getCurrentTime().map(findBinary);
    for (let i = 0; i < data.length; i += 1) {
        drawColumn(i, data[i]);
    }
    prevFrame = data;
};

// Themes
const drawTheme = (idx) => () => {
    idx += 1;
    const themes = [
        [[0, 0, 0], [1, 1, 1]],
        [[1, 1, 1], [0, 0, 0]],
        [[0, 0, 0], [1, 0, 0]],
        [[0, 0, 0], [0, 1, 0]],
        [[0, 0, 0], [0, 0, 1]],
    ];
    if (idx >= themes.length) idx = 0;
    const color = themes[idx];
    g.setBgColor.apply(g, color[0]);
    g.setColor.apply(g, color[1]);
    g.clear();
};

const nextTheme = drawTheme(0);
setWatch(() => {
    prevFrame = [];
    Bangle.beep();
    nextTheme();
}, BTN1, { repeat: true });

Bangle.on('lcdPower', on => {
    if (on) drawClock();
});

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
setInterval(() => { drawClock(); }, 1000);
drawClock();
// Show launcher when middle button pressed
setWatch(Bangle.showLauncher, BTN2, {repeat:false,edge:"falling"});
