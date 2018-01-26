const records = require('../assets/phoneRecords.json');
let current;
let previous;

function setup () {
  createCanvas(720, 400);
};

function draw () {
  background(0);
  stroke(255);
  rect(50,0,20,200);
  rect(100,50,20,400);
};
