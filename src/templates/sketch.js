import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import p5 from 'p5'

const Container = styled.div`
  height: 100%;
  width: 100%;

`

const SketchContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  div {
  }
`

const CodePanel = styled.div`
  position: fixed;
  width: 50%;
  height: 100%;
  right: 0;
  top: 0;
  background-color: white;
  z-index: 1;
  display: flex;
`

const PanelHandle = styled.div`
  height: 100%;
  width: 40px;
  border-right: 1px solid black;
  margin-right: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
    line-height: 1rem;
    width: 1rem;

    text-align: center;
    writing-mode: vertical-lr;
  }
`

export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);

    const file = require('../sketches/output/test.js');
    this.file = file;
  }
  componentDidMount() {
    this.forceUpdate()
  }

  render() {
    if (this.mount) {
      this.mount.innerHTML = "";
      var myp5 = new p5(this.file, this.mount);
    }

    return (
      <Container>
        <SketchContainer>
          <div ref={(mount) => {this.mount = mount}}/>
        </SketchContainer>


         <CodePanel>
           <PanelHandle>
             <p>code</p>
           </PanelHandle>

           <code dangerouslySetInnerHTML={{ __html: this.props.data.file.fields.code.replace(/(?:\r\n|\r|\n)/g, '<br />') }}/>
         </CodePanel>

      </Container>

    )
  }
}

export const query = graphql`
  query SketchQuery($slug: String!) {
    file(fields: { slug: { eq: $slug } }) {
      name
      relativePath
      fields {
        slug
        code
      }
    }
  }
`;
