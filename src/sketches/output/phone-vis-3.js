
export default function (sketch) {
  const records = require('../assets/phoneRecords.json');
  const uniqueArray = arr => [...new Set(arr)];
  const propArray = (data, value) => data.map(node => node[value]);
  const uniqueObj = (data, value) => uniqueArray(propArray(data, value));
  let callsByNumber = [];
  let n = 0;
  const maxLength = Math.max(...propArray(records, 'length'));
  
  function drawLeaf() {
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
  };
  
  sketch.draw = function () {
    sketch.noFill();
    sketch.stroke(255);
    let lineY = sketch.height / 2;
    let curve = 0;
    let revCurve = 0;
    sketch.translate(sketch.width / 2, sketch.height / 2);
    let radius = sketch.height * 0.4;
    let numPoints = 32;
    let angle = sketch.TWO_PI / numPoints;
    let number = callsByNumber[n];
    sketch.rotate(360 / callsByNumber.length * n);
    for (let call of number) {
      let time = call.time.split(':');
      let minutes = +time[0] * 60 + +time[1];
      let amp = 120;
      curve = minutes / 1440 * amp;
      revCurve = minutes / 1440 * -amp;
      sketch.stroke(255, sketch.map(call.length, 1, maxLength, 120, 255));
      sketch.stroke(sketch.map(call.length, 1, maxLength, 79, 35), sketch.map(call.length, 1, maxLength, 104, 200), sketch.map(call.length, 1, maxLength, 250, 100), sketch.map(call.length, 1, maxLength, 100, 255));
      sketch.strokeWeight(0.7);
      sketch.line(0, 0, radius, 0);
      sketch.bezier(0, 0, radius / 4, 0 - curve, radius / 4 * 3, 0 - curve, radius, 0);
      sketch.bezier(0, 0, radius / 4, 0 - revCurve, radius / 4 * 3, 0 - revCurve, radius, 0)
    }
    if (n < callsByNumber.length - 1) {
      n++
    } else {
      stop()
    }
  };
}