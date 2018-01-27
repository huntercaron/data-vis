const records = require('../assets/phoneRecords.json');

// helper functions
const uniqueArray = arr => [...new Set(arr)];
const propArray = (data, value) => data.map( node => node[value]);
const uniqueObj = (data, value) => uniqueArray(propArray(data,value));

let callsByNumber = [];
let n = 0;
const maxLength = Math.max(...propArray(records, 'length'));

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
};


function draw() {
  noFill();
  stroke(255);

  let lineY =  height/2;
  let curve = 0;

  translate( width/2,  height/2);

  let radius = 300;
  let numPoints = 32;
  let angle =  TWO_PI/numPoints;
  let number = callsByNumber[n];

  rotate(360/callsByNumber.length*n);

  for (let call of number) {

    let time = call.time.split(':');
    let minutes = (+time[0]) * 60 + (+time[1]);
    curve = (minutes-720)*0.1;

    stroke(255,  map(call.length, 1, maxLength, 10, 255));

    // 1440

    stroke(
     map(minutes, 0, 1440, 79, 35),
     map(minutes, 0, 1440, 104, 200),
     map(minutes, 0, 1440, 250, 100),
     map(call.length, 1, maxLength, 100, 255)
    );

    strokeWeight( map(call.length, 1, maxLength, 0.5, 3));
    bezier(0, 0, radius/4, 0-curve, radius/4*3, 0-curve, radius, 0);
  }


  if (n < callsByNumber.length-1) {
    n++;
  }

};
