let current;
let previous;

function setup () {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
};

function draw () {
  background(0);
  noStroke();
  fill(255);

  textSize(236);
  translate(width/2, height/2)
  text('P5', -160,  330*Math.sin(frameCount*0.01));
  translate(-width/2, -height/2)

  noFill();
  stroke(255);
  ellipse(mouseX,mouseY, 100,100)
};
