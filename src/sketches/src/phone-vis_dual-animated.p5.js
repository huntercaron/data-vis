// TITLE: Phone-Vis: Dual & Animated

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

let animFrames = 30;
let currentNum = 0;

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

    let amp = 120;
    curve = (500) * amp;
    revCurve = (500) * -amp;

    // Stroke Drawing
    sketch.stroke(
      sketch.map(this.calls.length, 1, maxLength, 79, 35),
      sketch.map(this.calls.length, 1, maxLength, 104, 200),
      sketch.map(this.calls.length, 1, maxLength, 250, 100),
      200
    );
    sketch.strokeWeight(2);
    sketch.noFill();
    sketch.push();
    // let scale = (this.calls.length * 0.015+1);

    // sketch.scale(scale);

    sketch.beginShape();
    sketch.bezier(0, 0, radius / 4, 0 - curve, radius / 4 * 3, 0 - curve, radius, 0);
    sketch.bezier(0, 0, radius / 4, 0 - revCurve, radius / 4 * 3, 0 - revCurve, radius, 0);
    sketch.endShape(sketch.CLOSE);
    sketch.pop();
  }

  drawCall = (call) => {
    let time = call.time.split(':');
    let minutes = (+time[0]) * 60 + (+time[1]);

    let amp = 120;
    curve = (minutes / 1440) * amp;
    revCurve = (minutes / 1440) * -amp;


    // fill drawing
    sketch.fill(
      sketch.map(call.length, 1, maxLength, 79, 35),
      sketch.map(call.length, 1, maxLength, 104, 200),
      sketch.map(call.length, 1, maxLength, 250, 100),
      20
    );

    sketch.noStroke();
    sketch.push();
    let scale = (call.length * 0.015 + 1);
    let animThisFrames = 100+(this.calls.length/8*80);
    let mappedScale = sketch.map(sketch.frameCount, 0, animThisFrames, 0, scale)

    sketch.scale((sketch.frameCount < animThisFrames) ? mappedScale : scale);

    sketch.beginShape();
    sketch.bezier(0, 0, radius / 4, 0 - curve, radius / 4 * 3, 0 - curve, radius, 0);
    sketch.bezier(0, 0, radius / 4, 0 - revCurve, radius / 4 * 3, 0 - revCurve, radius, 0);
    sketch.endShape(sketch.CLOSE);
    sketch.pop();
  }

  logInfo = () => {
    // console.log(this.number, this.calls);
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
};


function draw() {
  currentNum = frameCount/animFrames;
  background(0);

  translate(width / 2, height / 2);

  for (let leaf of leaves) {
    rotate(360 / leaves.length);
    leaf.draw();
  }
  
};
