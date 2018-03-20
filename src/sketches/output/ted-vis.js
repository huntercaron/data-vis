
export default function (sketch) {
  var current = void 0;
  var previous = void 0;
  var tedData = require('../assets/tedData.json');
  var transcript = tedData[0].transcript;
  var increment = void 0;
  var padding = 100;
  var size = 2;
  
  function timeToMinutes(timeString) {
    var time = timeString.split(':');
    var minutes = +time[0] * 60 + +time[1];
    return minutes
  }
  
  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.angleMode(sketch.DEGREES);
    increment = (sketch.windowHeight - padding * 2) / transcript.length
  };
  
  sketch.draw = function () {
    sketch.background(0);
    sketch.noStroke();
    sketch.fill(255);
    sketch.textSize(236);
    for (var i in transcript) {
      var line = transcript[i];
      sketch.push();
      sketch.translate(sketch.width / 2 - 50, i * increment + padding / 1.5);
      if (i < transcript.length - 1) {
        size = timeToMinutes(transcript[parseInt(i) + 1].time) - timeToMinutes(line.time)
      }
      if (line.text.includes('(Laughter)') || line.text.includes('(Applause)')) {
        sketch.fill(255, 160);
        sketch.textSize(10);
        sketch.text(line.time, -50, 3);
        if (line.text.includes('(Laughter)'))
          sketch.fill(180, 180, 130);
        else
          sketch.fill(255);
        sketch.rect(0, 0, 100, size)
      }
      sketch.pop()
    }
    sketch.noFill();
    sketch.stroke(255);
    sketch.noLoop()
  };
}