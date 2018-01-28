import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import p5 from 'p5'
import Prism from 'prismjs'
// import SyntaxHighlighter from 'react-syntax-highlighter';
// // import { docco } from 'react-syntax-highlighter/styles/hljs';

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
  left: 0;
  top: 0;
  background-color: white;
  z-index: 1;
  transform: translateY(${props => props.panelOpen ? "0" : "calc(100% - 40px)"});

  transition: all 250ms ease-out;
`

const PanelHandle = styled.div`
  width: 100%;
  height: 40px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-right: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  p {
    text-align: center;
  }

  &:hover {
    p::before {
      content: "|| "
    }
    p::after {
      content: " ||"
    }
  }


`

const CodeContainer = styled.div`
  overflow: auto;
  width: 100%;
  display: flex;
  padding: 1rem;
  height: 100%;
  justify-content: center;
`

const Code = styled.code`
  margin: 1.5rem auto;
  margin-bottom: 6rem;
  white-space: pre-wrap;
  max-width: 800px;
  height: 100%;
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
    this.mount.innerHTML = "";
    window.addEventListener("resize", this.updateDimensions);
    this.forceUpdate()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    this.mount.innerHTML = "";
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
             {/* <Code language='javascript' style={docco}>{this.props.data.file.fields.code}</Code>; */}
             <Code dangerouslySetInnerHTML={{ __html: Prism.highlight(this.props.data.file.fields.code, Prism.languages.javascript) }}/>
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
