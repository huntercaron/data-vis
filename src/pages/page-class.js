import React from 'react'
import Link from 'gatsby-link'
import file from '!raw-loader!../sketches/test.p5.js'
import p5Convert from 'p5-global2instance'
import p5 from 'p5'
// import sketch from '../utils/baseSketch.js'

// page component
export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let output = p5Convert(file);
    const sketch = (output.slice(35, -1))
    console.log(sketch);

    let s = new Function('$_p', sketch);

    while (this.mount.firstChild) {
      this.mount.removeChild(this.firstChild);
    }

    var myp5 = new p5(s, this.mount);
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <div
           ref={(mount) => {this.mount = mount}}
         />
      </div>
    )
  }
}
