import React from 'react'
import Link from 'gatsby-link'

import p5Convert from 'p5-global2instance'
import p5 from 'p5'


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

    console.log(this.props.data);

    return (
      <div>
        <div
           ref={(mount) => {this.mount = mount}}
         />
         <code>{this.props.data.file.fields.code}</code>
      </div>

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
