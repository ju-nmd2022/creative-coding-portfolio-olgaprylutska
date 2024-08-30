let angleOffset = 0;
let speed = 0.02;

function setup() {
  createCanvas(800, 800);
  strokeWeight(2);
  noFill();
}

function draw() {
  background(0);
  strokeWeight(2);

  let numColumns = 3;
  let numRows = 3;
  let spacingX = width / (numColumns + 1);
  let spacingY = height / (numRows + 1);
  let angleStep = 0.05;
  let maxAngle = TWO_PI * 10;
  let b = 1;
  let waveFrequency = 0.1;
  let waveAmplitude = 10;

  let startColor = color(255, 105, 180);
  let endColor = color(128, 0, 128);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      let centerX = (col + 1) * spacingX;
      let centerY = (row + 1) * spacingY;

      push();
      translate(centerX, centerY);
      rotate(angleOffset);

      beginShape();
      for (let angle = 0; angle <= maxAngle; angle += angleStep) {
        let radius = b * angle;
        let waveOffset = sin(angle * waveFrequency) * waveAmplitude;
        let x = (radius + waveOffset) * cos(angle);
        let y = (radius + waveOffset) * sin(angle);

        let factor = (sin(angleOffset) + 1) / 2;
        let currentColor = lerpColor(startColor, endColor, factor);

        stroke(currentColor);
        vertex(x, y);
      }
      endShape();

      pop();
    }
  }

  angleOffset += speed;
}

function mousePressed() {
  speed += 0.01;
  if (speed > 0.1) {
    speed = 0.02;
  }
}
