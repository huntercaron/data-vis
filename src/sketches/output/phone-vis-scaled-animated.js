import p5 from 'p5'

export default function (sketch) {
  const records = require('../assets/phoneRecords.json');
  const uniqueArray = arr => [...new Set(arr)];
  const propArray = (data, value) => data.map(node => node[value]);
  const uniqueObj = (data, value) => uniqueArray(propArray(data, value));
  let callsByNumber = [];
  let n = 0;
  const maxLength = Math.max(...propArray(records, 'length'));
  let curve;
  let revCurve;
  let lineY;
  let radius;
  let numPoints;
  let angle;
  
  function drawLeaf(call) {
    let time = call.time.split(':');
    let minutes = +time[0] * 60 + +time[1];
    let amp = 120;
    curve = minutes / 1440 * amp;
    revCurve = minutes / 1440 * -amp;
    sketch.stroke(255, sketch.map(call.length, 1, maxLength, 120, 255));
    sketch.stroke(sketch.map(call.length, 1, maxLength, 79, 35), sketch.map(call.length, 1, maxLength, 104, 200), sketch.map(call.length, 1, maxLength, 250, 100), sketch.map(call.length, 1, maxLength, 50, 40));
    sketch.fill(sketch.map(call.length, 1, maxLength, 79, 35), sketch.map(call.length, 1, maxLength, 104, 200), sketch.map(call.length, 1, maxLength, 250, 100), 20);
    sketch.strokeWeight(0.7);
    sketch.noStroke();
    sketch.push();
    sketch.scale(call.length * 0.1);
    sketch.beginShape();
    sketch.bezier(0, 0, radius / 4, 0 - curve, radius / 4 * 3, 0 - curve, radius, 0);
    sketch.bezier(0, 0, radius / 4, 0 - revCurve, radius / 4 * 3, 0 - revCurve, radius, 0);
    sketch.endShape(p5.CLOSE);
    sketch.pop()
  }
  
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
    sketch.noFill();
    sketch.stroke(200);
    lineY = sketch.height / 2;
    radius = sketch.height * 0.4;
    numPoints = 32;
    angle = sketch.TWO_PI / numPoints;
    sketch.translate(sketch.width / 2, sketch.height / 2);
    for (let number of callsByNumber) {
      for (let call of number) {
        sketch.rotate(360 / callsByNumber.length);
        drawLeaf(call)
      }
    }
  };
  
  sketch.draw = function () {
  };
}