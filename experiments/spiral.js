function setup() {
    createCanvas(800, 800);
    background(246,241,226);
    strokeWeight(3);
  
    let numColumns = 3;
    let numRows = 3;
    let spacingX = width / (numColumns + 1);
    let spacingY = height / (numRows + 1);
    let angleStep = 0.05;
    let maxAngle = TWO_PI * 10;
    let b = 1;
  
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        let centerX = (col + 1) * spacingX;
        let centerY = (row + 1) * spacingY;
  
        push();
        translate(centerX, centerY);
        
        stroke(255, 0, 0);
  
        beginShape();
        for (let angle = 0; angle <= maxAngle; angle += angleStep) {
          let radius = b * angle;
          let x = radius * cos(angle);
          let y = radius * sin(angle);
          vertex(x, y);
        }
        endShape();
  
        pop();
      }
    }
  }
  