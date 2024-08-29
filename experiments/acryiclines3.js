const size = 20;
const divider = 10;
const numRows = 40;
const numCols = 40;
const noiseScale = 0.1;
const dotSize = 6;
let counter = 0;

function setup() {
  createCanvas(800, 800);
  frameRate(10);
}

function draw() {
  background(255);
  noFill();
  
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = noise(x / divider, y / divider) * size;
      const startX = x * size;
      const startY = y * size;
      
      stroke(255, 215, 0);
      rect(startX, startY, value, value);
      
      const noiseOffsetX = noise(x * noiseScale, y * noiseScale, counter) * value;
      const noiseOffsetY = noise((x + 100) * noiseScale, y * noiseScale, counter) * value;
      
      const centerX = startX + value / 2;
      const centerY = startY + value / 2;
      stroke(0, 0, 255);
      strokeWeight(1);
      ellipse(centerX + noiseOffsetX, centerY + noiseOffsetY, dotSize);
    }
  }

  counter += 0.1;
}

