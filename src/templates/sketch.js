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
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  background-color: white;
  z-index: 1;
  display: flex;

  transform: translateX(${props => props.panelOpen ? "0" : "calc(100% - 39px)"});

  transition: all 250ms ease-out;
`

const PanelHandle = styled.div`
  height: 100%;
  width: 40px;
  border-right: 1px solid black;
  border-left: 1px solid black;
  margin-right: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  p {
    margin: 0;
    width: 1.4rem;
    line-height: 0.3;
    width: 0;
    text-align: center;
    writing-mode: vertical-lr;
  }
`

const CodeContainer = styled.div`
  overflow: auto;
  width: 100%;
  display: flex;
  padding: 1rem;

  justify-content: center;
`

const Code = styled.code`
  margin: 1.5rem auto;
  margin-bottom: 6rem;
  white-space: pre-wrap;
  max-width: 800px;
`

export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);

    const file = require(`!babel-loader!../sketches/output/${this.props.data.file.fields.slug}.js`);
    this.file = file.default;

    this.state = {
      panelOpen: false
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.forceUpdate()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  resize = () => {
    this.forceUpdate()
  }

  togglePanel = () => {
    this.setState(prevState => ({
      panelOpen: !prevState.panelOpen
    }));
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


         <CodePanel panelOpen={this.state.panelOpen}>
           <PanelHandle onClick={this.togglePanel}>
             <p>code</p>
           </PanelHandle>


           <CodeContainer>
             <Code dangerouslySetInnerHTML={{ __html: this.props.data.file.fields.code }}/>
           </CodeContainer>

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
