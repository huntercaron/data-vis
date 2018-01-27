
export default function (sketch) {
  const records = require('../assets/phoneRecords.json');
  let current;
  let previous;
  
  sketch.setup = function () {
    sketch.createCanvas(720, 400)
  };
  
  sketch.draw = function () {
    sketch.background(0);
    sketch.stroke(255);
    sketch.rect(50, 0, 20, 200);
    sketch.rect(100, 50, 20, 400)
  };
}