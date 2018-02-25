const records = require('../assets/phoneRecords.json');

// helper functions
const uniqueArray = arr => [...new Set(arr)];
const propArray = (data, value) => data.map( node => node[value]);
const uniqueObj = (data, value) => uniqueArray(propArray(data,value));

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
  let minutes = (+time[0]) * 60 + (+time[1]);

  let amp = 120;
  curve = (minutes/1440)*amp;
  revCurve = (minutes/1440)*-amp;


  stroke(255,  map(call.length, 1, maxLength, 120, 255));

  stroke(
   map(call.length, 1, maxLength, 79, 35),
   map(call.length, 1, maxLength, 104, 200),
   map(call.length, 1, maxLength, 250, 100),
   map(call.length, 1, maxLength, 100, 255)
  );

  // stroke(
  //  map(minutes, 0, 1440, 79, 35),
  //  map(minutes, 0, 1440, 104, 200),
  //  map(minutes, 0, 1440, 250, 100),
  //  map(call.length, 1, maxLength, 100, 255)
  // );

  strokeWeight(0.7);
  // strokeWeight( map(call.length, 1, maxLength, 0.5, 1));
  //line(0,0, radius, 0)
  bezier(0, 0, radius/4, 0-curve, radius/4*3, 0-curve, radius, 0);
  bezier(0, 0, radius/4, 0-revCurve, radius/4*3, 0-revCurve, radius, 0);
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  height = windowHeight;
  angleMode(DEGREES);
  background(0);

  for (let phoneNum of uniqueObj(records, 'phoneNum')) {
    if (records.filter(r => r.phoneNum === phoneNum)) {
      callsByNumber.push(records.filter(r => r.phoneNum === phoneNum));
    }
  }

  noFill();
  stroke(255);

  lineY =  height/2;
  radius = height*0.4;
  numPoints = 32;
  angle =  TWO_PI/numPoints;

  translate( width/2,  height/2);


  for (let number of callsByNumber) {
    //radius = height*0.4 + number.length*20;
    for (let call of number) {
      rotate(360/callsByNumber.length);
      drawLeaf(call);
    }
  }



};


function draw() {

};
