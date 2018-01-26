import React from 'react'
import Link from 'gatsby-link'
import file from '../sketches/output/test.js'
import p5Convert from 'p5-global2instance'
import p5 from 'p5'


export default function SecondPage() {
  var myp5 = new p5(file, this.mount);

  return (
    <div>
      <div
         ref={(mount) => {this.mount = mount}}
       />
    </div>
  )
}
