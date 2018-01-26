import React from 'react'
import Link from 'gatsby-link'
import file from '../sketches/output/test.js'
import p5Convert from 'p5-global2instance'
import p5 from 'p5'
// import sketch from '../utils/baseSketch.js'

// page component
export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.forceUpdate()
  }

  componentWillUnmount() {

  }

  render() {
    if (this.mount) {
      this.mount.innerHTML = "";

      var myp5 = new p5(file, this.mount);
    }

    return (
      <div>
        <div
           ref={(mount) => {this.mount = mount}}
         />
      </div>
    )
  }
}
