
function setup() {
  createCanvas(800, 800);
  background(255); 
  noFill(); 
  let stepSize = 20;

  for (let y = 0; y <= height; y += stepSize) {
    for (let x = 0; x <= width; x += stepSize) {
      let randSize = random(5, stepSize);
      let startX = x + random(-stepSize / 2, stepSize / 2);
      let startY = y + random(-stepSize / 2, stepSize / 2);
      
      
      stroke(0); 
      
     
      rect(startX, startY, randSize, randSize);
    }
  }
}

