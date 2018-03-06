// TITLE: Phone-Vis: Dual & Animated [Static]

const records = require('../assets/phoneRecords.json');

// helper functions
const uniqueArray = arr => [...new Set(arr)];
const propArray = (data, value) => data.map( node => node[value]);
const uniqueObj = (data, value) => uniqueArray(propArray(data,value));

let n = 0;
let curve;
let revCurve;

let lineY;
let radius;
let numPoints;
let angle;
let leaves = [];

let animFrames = 30;
let currentNum = 0;

const scaleMultiplier = 0.01;
const scaleBase = 0.1;

const maxLength = Math.max(...propArray(records, 'length'));
let totalLengths;
let maxTotalLength;
let minTotalLength;
let maxCalls;

class Leaf {
  constructor(number, calls) {
    this.number = number;
    this.calls = calls;
    this.radius = 0;
  }

  draw = () => {
    for (let call in this.calls) {      
      this.drawCall(this.calls[call], call);
    }

    let amp = 120;
    curve = 1 * amp;
    revCurve = 1 * -amp;

    // Stroke Drawing
    sketch.stroke(
      sketch.map(this.calls.length, 1, maxLength, 79, 35),
      sketch.map(this.calls.length, 1, maxLength, 104, 200),
      sketch.map(this.calls.length, 1, maxLength, 250, 100),
      150
    );

    sketch.strokeWeight(0.6);
    sketch.noFill();
    sketch.push();
    
    let callLengths = propArray(this.calls, "length");
    let totalMinutes = callLengths.reduce((a, b) => a + b);
    // propArray(this.calls, "length")
    // console.log(totalMinutes);
    
    
    let scale = (totalMinutes * 0.01 + 0.1);
    sketch.scale(sketch.map(totalMinutes, minTotalLength, maxTotalLength, 0, 0.5) + 0.8);
    
    sketch.beginShape();
    sketch.bezier(0, 0, radius / 4, 0 - curve, radius / 4 * 3, 0 - curve, radius, 0);
    sketch.bezier(0, 0, radius / 4, 0 - revCurve, radius / 4 * 3, 0 - revCurve, radius, 0);
    sketch.endShape(sketch.CLOSE);
    sketch.pop();
  }

  drawCall = (call, index) => {
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
    console.log(index);
    
    let scale = ( sketch.map(index, 0, maxCalls, 0, 0.5) + 0.8);
    let animThisFrames = 100+(this.calls.length/8*80);
    let mappedScale = sketch.map(sketch.frameCount, 0, animThisFrames, 0, scale)

    sketch.scale((20000 < animThisFrames) ? mappedScale : scale);

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

  totalLengths = leaves.map(node => propArray(node["calls"], "length").reduce((a, b) => a + b));
  maxTotalLength = Math.max(...totalLengths);
  minTotalLength = Math.min(...totalLengths);
  maxCalls = Math.max(...leaves.map(node => node.calls.length));

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

  noLoop();
  
};
