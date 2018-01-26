import file from '!raw-loader!../sketches/test.js'
import p5Convert from 'p5-global2instance'

export default eval(p5Convert(file).slice(16));
