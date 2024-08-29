const size = 20;
const divider = 10;
const numRows = 40;
const numCols = 40;

function setup() {
  createCanvas(800, 800);
  noLoop();
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
      
      stroke(0, 0, 128);
      strokeWeight(2);
      line(startX, startY, startX + value, startY);
      
      strokeWeight(1);
    }
  }
}
