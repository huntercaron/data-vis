
export default function ($_p) {
  const records = require('../assets/phoneRecords.json');
  let current;
  let previous;
  
  $_p.setup = function () {
    $_p.createCanvas($_p.windowWidth, $_p.windowHeight)
  };
  
  $_p.draw = function () {
    $_p.background(0);
    $_p.stroke(255);
    $_p.rect(50, 0, 20, 200);
    $_p.rect(100, 50, 20, 400)
  };
}