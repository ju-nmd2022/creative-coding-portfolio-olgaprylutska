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
        
        stroke(3, 0, 128);
        strokeWeight(2);
        line(startX, startY, startX + randSize, startY);
        
        let smallSize = random(2, randSize / 2);
        let smallX = startX + random(0, randSize - smallSize);
        let smallY = startY + random(0, randSize - smallSize);
        
        stroke(0, 0, 255);
        strokeWeight(1);
        rect(smallX, smallY, smallSize, smallSize);
      }
    }
  }
  