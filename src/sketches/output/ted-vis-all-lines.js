
export default function (sketch) {
  var current = void 0;
  var previous = void 0;
  var tedData = require('../assets/cleanTedData.json');
  var increment = void 0;
  var padding = 100;
  var size = 2;
  var x = 0;
  var uniqueArray = function uniqueArray(arr) {
    return [].concat(_toConsumableArray(new Set(arr)))
  };
  var propArray = function propArray(data, value) {
    return data.map(function (node) {
      return node[value]
    })
  };
  var uniqueObj = function uniqueObj(data, value) {
    return uniqueArray(propArray(data, value))
  };
  
  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i]
      }
      return arr2
    } else {
      return Array.from(arr)
    }
  }
  
  function timeToMinutes(timeString) {
    var time = timeString.split(':');
    var minutes = +time[0] * 60 + +time[1];
    return minutes
  }
  
  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.angleMode(sketch.DEGREES)
  };
  
  sketch.draw = function () {
    sketch.background(0);
    sketch.noStroke();
    sketch.fill(255);
    for (var t in tedData) {
      var transcript = tedData[t].transcript;
      x = (sketch.windowWidth - padding * 2) / tedData.length * t;
      increment = (sketch.windowHeight - padding * 2) / transcript.length;
      for (var i in transcript) {
        var line = transcript[i];
        sketch.push();
        sketch.translate(x + padding, i * increment + padding / 1.5);
        if (i < transcript.length - 1) {
          size = timeToMinutes(transcript[parseInt(i) + 1].time) - timeToMinutes(line.time)
        }
        if (line.text.includes('(Applause)')) {
          sketch.fill(255, 160);
          sketch.textSize(10);
          if (line.text.includes('(Laughter)'))
            sketch.fill(180, 180, 130);
          else
            sketch.fill(255);
          sketch.rect(0, 0, (sketch.windowWidth - padding * 2) / tedData.length, size)
        }
        sketch.pop()
      }
    }
    sketch.noFill();
    sketch.stroke(255);
    sketch.noLoop()
  };
}