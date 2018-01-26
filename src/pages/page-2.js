import React from 'react'
import Link from 'gatsby-link'
import file from '!raw-loader!../sketches/test.p5.js'
import p5Convert from 'p5-global2instance'
import p5 from 'p5'
// import records from '../sketches/phoneRecords.json';
// import sketch from '../utils/baseSketch.js'

// page component
export default function SecondPage() {

  let output = p5Convert(file);
  // var myp5 = new p5(output, this.mount);
  // const sketch = eval(output.slice(16, -1));
  // console.log(sketch);
  // console.log(typeof output);
  const sketch = (output.slice(35, -1))
  console.log(sketch.replace(/(\r\n|\n|\r)/gm,""));



  let s = new Function('$_p', sketch);

  console.log(s);

  const records = require('../sketches/phoneRecords.json');
  console.log(records)

  // console.log(eval(sketch));

  var myp5 = new p5(s, this.mount);

  // console.log(output);

  return (
    <div>
      <div
         style={{ width: '100%', height: '100%'}}
         ref={(mount) => {this.mount = mount}}
       />
    </div>
  )
}

export const query = graphql`
  query Page2Query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            date(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
  }
`;
