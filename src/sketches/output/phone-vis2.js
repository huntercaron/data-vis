
export default function (sketch) {
  const records = require('../assets/phoneRecords.json');
  const uniqueArray = arr => [...new Set(arr)];
  const propArray = (data, value) => data.map(node => node[value]);
  const uniqueObj = (data, value) => uniqueArray(propArray(data, value));
  let callsByNumber = [];
  let n = 0;
  const maxLength = Math.max(...propArray(records, 'length'));
  
  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.height = sketch.windowHeight;
    sketch.angleMode(sketch.DEGREES);
    sketch.background(0);
    for (let phoneNum of uniqueObj(records, 'phoneNum')) {
      if (records.filter(r => r.phoneNum === phoneNum)) {
        callsByNumber.push(records.filter(r => r.phoneNum === phoneNum))
      }
    }
    console.log(callsByNumber)
  };
  
  sketch.draw = function () {
    sketch.noFill();
    sketch.stroke(255);
    let lineY = sketch.height / 2;
    let curve = 0;
    let length = 300;
    let numPoints = 32;
    let angle = sketch.TWO_PI / numPoints;
    let number = callsByNumber[n];
    sketch.translate(20, sketch.height / 2);
    for (let call of number) {
      let time = call.time.split(':');
      let minutes = +time[0] * 60 + +time[1];
      curve = (minutes - 720) * 0.6;
      sketch.stroke(255, sketch.map(call.length, 1, maxLength, 10, 255));
      length = sketch.width - 30 - callsByNumber[n].length * 20;
      sketch.stroke(sketch.map(minutes, 0, 1440, 79, 35), sketch.map(minutes, 0, 1440, 104, 200), sketch.map(minutes, 0, 1440, 250, 100), sketch.map(call.length, 1, maxLength, 50, 200));
      sketch.strokeWeight(sketch.map(call.length, 1, maxLength, 0.8, 2));
      sketch.bezier(0, 0, length / 4, 0 - curve, length / 4 * 3, 0 - curve, length, 0)
    }
    if (n < callsByNumber.length - 1) {
      n++
    }
  };
}