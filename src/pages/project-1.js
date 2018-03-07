import React from 'react'
import styled from 'styled-components';
import p5 from 'p5';
import dat from 'dat.gui';

import angleIcon from '../assets/images/angle-icon.svg'
import petalIcon from '../assets/images/petal-icon.svg'
import petalLengthIcon from '../assets/images/petal-length-icon.svg'
import petalWidthIcon from '../assets/images/petal-width-icon.svg'

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
  margin: 0;
  font-size: ${fontSize};
  display: inline;
`

const SubTitle = styled.h1`
  font-size: ${fontSize};
  display: inline;
  opacity: 0.6;
`;

const Info = styled.div`
  color: black;
  position: absolute;
  top: 20px;
  left: 60px;
`;

const Icon = styled.img`
  width: 50px;
`

const LegendItemContainer = styled.div`
  display: flex;
  color: black;
  opacity: 0.75;
  align-items: center;
  min-width: 150px;

  p {
    font-size: ${fontSize};
    margin: 0;
    margin-left: 2rem;
    margin-top: 5px;
    font-size: 1.2rem;
  }
`

const Legend = styled.div`
  bottom: 2rem;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
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
    // this.gui = new dat.GUI();
    var myp5 = new p5(sketch, this.mount);
    
    
  }

  render() {
    return (
      <Container>
        <SketchContainer>
          <div ref={(mount) => { this.mount = mount }} />
        </SketchContainer>

        <Info>
          <Title>Together:</Title> <SubTitle>Visualizing Relationships</SubTitle>
        </Info>
        
        <Legend>
          <IamLegend icon={angleIcon} text={"ANGLE: UNIQUE PHONE #"} />
          <IamLegend icon={petalIcon} text={"PETAL: PHONE-CALL"} />
          <IamLegend icon={petalLengthIcon} text={"LENGTH & COLOUR: CALL-LENGTH"} />
          <IamLegend icon={petalWidthIcon} text={"WIDTH: TIME OF DAY (0h-24h)"} />
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
