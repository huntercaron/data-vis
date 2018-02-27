// TITLE: Phone-Vis: Scaled & Animated

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
let leaves = [];


class Leaf {
  constructor(number, calls) {
    this.number = number;
    this.calls = calls;
    this.radius = 0;
  }

  draw = () => {
    for (let call of this.calls) {      
      this.drawCall(call);
    }
  }

  drawCall = (call) => {
    let time = call.time.split(':');
    let minutes = (+time[0]) * 60 + (+time[1]);

    let amp = 120;
    curve = (minutes / 1440) * amp;
    revCurve = (minutes / 1440) * -amp;

    sketch.stroke(255, sketch.map(call.length, 1, maxLength, 120, 255));


    sketch.fill(
      sketch.map(call.length, 1, maxLength, 79, 35),
      sketch.map(call.length, 1, maxLength, 104, 200),
      sketch.map(call.length, 1, maxLength, 250, 100),
      20
    );


    sketch.strokeWeight(0.7);
    // strokeWeight( map(call.length, 1, maxLength, 0.5, 1));
    //line(0,0, radius, 0)
    sketch.noStroke();
    sketch.push();
    sketch.scale(call.length * 0.015+ 1)

    sketch.beginShape();
    sketch.bezier(0, 0, radius / 4, 0 - curve, radius / 4 * 3, 0 - curve, radius, 0);
    sketch.bezier(0, 0, radius / 4, 0 - revCurve, radius / 4 * 3, 0 - revCurve, radius, 0);
    sketch.endShape(sketch.CLOSE);
    sketch.pop();
  }

  logInfo = () => {
    console.log(this.number, this.calls);
  }
}


function setup () {
  createCanvas(windowWidth, windowHeight);
  height = windowHeight;
  angleMode(DEGREES);
  background(0);

  for (let phoneNum of uniqueObj(records, 'phoneNum')) {
    if (records.filter(r => r.phoneNum === phoneNum)) {
      leaves.push(new Leaf(phoneNum, records.filter(r => r.phoneNum === phoneNum)))
    }
  }

  noFill();
  stroke(200);

  lineY =  height/2;
  radius = height*0.4;
  numPoints = 32;
  angle =  TWO_PI/numPoints;

  translate( width/2,  height/2);

  for (let leaf of leaves) {
    rotate(360 / leaves.length);
    leaf.draw();
  }
};


function draw() {
};
