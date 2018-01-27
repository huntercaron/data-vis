
export default function (sketch) {
  let current;
  let previous;
  
  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
  };
  
  sketch.draw = function () {
    sketch.background(0);
    sketch.stroke(255);
    sketch.rect(250, 0, 20, 200);
    sketch.rect(100, 50, 20, 400)
  };
}