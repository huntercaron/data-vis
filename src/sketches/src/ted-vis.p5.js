let current;
let previous;
const tedData = require('../assets/tedData.json');
const transcript = tedData[0].transcript;
let increment;
const padding = 100;
let size = 2;

function timeToMinutes(timeString) {
  let time = timeString.split(':');
  let minutes = (+time[0]) * 60 + (+time[1]);

  return minutes;
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  increment = (windowHeight - (padding*2))/transcript.length
};

function draw () {
  background(0);
  noStroke();
  fill(255);

  textSize(236);

  for (let i in transcript) {
    let line = transcript[i];
    push();
    translate(width/2-50, i*increment+padding/1.5)

    if (i < transcript.length-1) {
      size = timeToMinutes(transcript[parseInt(i) + 1].time) - timeToMinutes(line.time);
    }
    

    if (line.text.includes("(Laughter)") || line.text.includes("(Applause)") ) {
      fill(255, 160);
      textSize(10);
      text(line.time, -50, 3);

      if (line.text.includes("(Laughter)"))
        fill(180,180,130);
      else
        fill(255);

      rect(0, 0, 100, size)
    }
    pop();
  }

  noFill();
  stroke(255);
  noLoop();
};
