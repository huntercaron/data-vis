import React from 'react'
import styled from 'styled-components';
import p5 from 'p5';
import dat from 'dat.gui';

import angleIcon from '../assets/images/angle-icon.svg'
import petalIcon from '../assets/images/petal-icon.svg'
import petalLengthIcon from '../assets/images/petal-length-icon.svg'

import sketch from '../sketches/output/phone-vis_dual-flipped-animated'
import phoneRecords from '../sketches/assets/phoneRecords.json'

const fontSize = "1.5rem";

const Container = styled.div`
  background-color: black;
  height: 100vh;
`;

const SketchContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
`

const Title = styled.h1`
  font-size: ${fontSize};
  opacity: 0.75;
`

const SubTitle = styled.h4`
  font-size: ${fontSize};
`;

const Info = styled.div`
  color: white;
  position: absolute;
  top: 20px;
  left: 60px;
`;

const Icon = styled.img`

`

const LegendItemContainer = styled.div`
  display: flex;
  color: white;
  opacity: 0.75;

  p {
    font-size: ${fontSize};
    margin-left: 2rem;
  }
`

const Legend = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;


function IamLegend(props) {
  return (
    <LegendItemContainer>
      <Icon src={props.icon} />
      <p>{props.text}</p>
    </LegendItemContainer>
  )
}


// page component
export default class Project1 extends React.Component {
  componentDidMount() {
    this.gui = new dat.GUI();
    var myp5 = new p5(sketch, this.mount);
    
    
  }

  render() {
    return (
      <Container>
        <SketchContainer>
          <div ref={(mount) => { this.mount = mount }} />
        </SketchContainer>

        <Info>
          <Title>Together: Visualizing Relationships</Title>
        </Info>
        
        <Legend>
          <IamLegend icon={angleIcon} text={"ANGLE: UNIQUE PHONE #"} />
          <IamLegend icon={petalIcon} text={"PETAL: PHONE-CALL"} />
          <IamLegend icon={petalLengthIcon} text={"LENGTH: CALL-LENGTH"} />
        </Legend>
      </Container>
    )
  }
}

// export const query = graphql`
//   query Project1Query {
//     file (name: { eq: "phone-vis_dual-flipped-animated.p5" }) {
//       name
//       relativePath
//     }
//   }
// `

var proj1Sketch = function (sketch)  {
  const records = phoneRecords;
  console.log("WASSAAHH");
  

  // helper functions
  const uniqueArray = arr => [...new Set(arr)];
  const propArray = (data, value) => data.map(node => node[value]);
  const uniqueObj = (data, value) => uniqueArray(propArray(data, value));

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
      let animThisFrames = 200 - call.length * 2;
      let animBaseFrames = index * 20;
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


  function setup() {
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


    lineY = height / 2;
    radius = height * 0.4;
    numPoints = 32;
    angle = TWO_PI / numPoints;
  };


  function draw() {
    currentNum = frameCount / animFrames;
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

}