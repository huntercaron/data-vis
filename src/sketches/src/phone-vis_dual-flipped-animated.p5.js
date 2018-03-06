// TITLE: Phone-Vis: Dual Flipped [Animated]

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


    let amp = 120;
    curve = 1 * amp;
    revCurve = 1 * -amp;

    // Stroke Drawing
    sketch.stroke(
      sketch.map(this.calls.length, 1, maxLength, 79, 35),
      sketch.map(this.calls.length, 1, maxLength, 104, 200),
      sketch.map(this.calls.length, 1, maxLength, 250, 100),
      120
    );

    sketch.strokeWeight(0.6);
    sketch.noFill();
    sketch.push();
    
    let callLengths = propArray(this.calls, "length");
    let totalMinutes = callLengths.reduce((a, b) => a + b);
    // propArray(this.calls, "length")
    // console.log(totalMinutes);
    
    
    let scale = (totalMinutes * 0.01 + 0.1);
    // console.log(maxCalls);
    
    // console.log(sketch.map(this.calls.length, 0, maxCalls, 0, 1));
    sketch.scale(sketch.map(this.calls.length, 0, maxCalls, 0, 0.6) + 0.9);
    
    // sketch.beginShape();
    // sketch.bezier(0, 0, radius / 4, 0 - curve, radius / 4 * 3, 0 - curve, radius, 0);
    // sketch.bezier(0, 0, radius / 4, 0 - revCurve, radius / 4 * 3, 0 - revCurve, radius, 0);
    // sketch.endShape(sketch.CLOSE);
    sketch.pop();

    for (let call in this.calls) {
      this.drawCall(this.calls[call], call);
    }
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
    let scale = (sketch.map(call.length, 1, maxLength, 0, 0.6) + 0.9);
    // let animThisFrames = 100+(this.calls.length/8*80);
    let animThisFrames = 200-call.length*2;
    let animBaseFrames = index*20;
    let mappedScale = sketch.map(sketch.frameCount, animBaseFrames, animThisFrames + animBaseFrames, 0, scale)
    if (mappedScale < 0)
      mappedScale = 0;

    sketch.scale((sketch.frameCount < animThisFrames + animBaseFrames) ? mappedScale : scale);

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

  if (currentNum > 50) {
    noLoop();
  }

  
};
