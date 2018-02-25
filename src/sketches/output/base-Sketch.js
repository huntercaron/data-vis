
export default function (sketch) {
  var current = void 0;
  var previous = void 0;
  
  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.angleMode(sketch.DEGREES)
  };
  
  sketch.draw = function () {
    sketch.background(0);
    sketch.noStroke();
    sketch.fill(255);
    sketch.textSize(236);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    sketch.text('P5', -160, 330 * Math.sin(sketch.frameCount * 0.01));
    sketch.translate(-sketch.width / 2, -sketch.height / 2);
    sketch.noFill();
    sketch.stroke(255);
    sketch.ellipse(sketch.mouseX, sketch.mouseY, 100, 100)
  };
}