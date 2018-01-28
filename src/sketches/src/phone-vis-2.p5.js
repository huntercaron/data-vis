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

  console.log(callsByNumber);
};


function draw() {
  noFill();
  stroke(255);

  let lineY =  height/2;
  let curve = 0;

  let length = 300;
  let numPoints = 32;
  let angle =  TWO_PI/numPoints;
  let number = callsByNumber[n];



  translate(20, height/2)

  for (let call of number) {

    let time = call.time.split(':');
    let minutes = (+time[0]) * 60 + (+time[1]);
    curve = (minutes-720)*0.6;

    stroke(255,  map(call.length, 1, maxLength, 10, 255));

    // 1440

    // length = n*((width-150)/callsByNumber.length)+100
    length = width - 30 - (callsByNumber[n].length)*20;

    stroke(
     map(minutes, 0, 1440, 79, 35),
     map(minutes, 0, 1440, 104, 200),
     map(minutes, 0, 1440, 250, 100),
     map(call.length, 1, maxLength, 50, 200)
    );

    strokeWeight( map(call.length, 1, maxLength, 0.8, 2));
    bezier(0, 0, length/4, 0-curve, length/4*3, 0-curve, length, 0);
  }


  if (n < callsByNumber.length-1) {
    n++;
  }

};
