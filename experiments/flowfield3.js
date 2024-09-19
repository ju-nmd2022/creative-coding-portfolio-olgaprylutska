let particles = [];
let flowField;
let cols, rows;
let scale = 20;
let inc = 0.1;
let noiseStrength = 0.05;
let prevMousePos;
let mouseTrail = []; 

function setup() {
  createCanvas(800, 800);
  background(0, 0, 50); 
  cols = floor(width / scale);
  rows = floor(height / scale);
  flowField = new Array(cols * rows);

  // Create silver particles
  for (let i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
  
  prevMousePos = createVector(mouseX, mouseY);
  mouseTrail.push(prevMousePos.copy()); 
}

function draw() {
  background(0, 0, 50); 

  // Update flow field with mouse influence
  let yOffset = 0;
  for (let y = 0; y < rows; y++) {
    let xOffset = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let noiseFactor = noise(xOffset, yOffset) * TWO_PI * 4;
      
      // Influence of mouse on the flow field
      let mouseDist = dist(mouseX, mouseY, x * scale, y * scale);
      let angle = noiseFactor + map(mouseDist, 0, width, -PI, PI);
      
      let vector = p5.Vector.fromAngle(angle);
      vector.setMag(1);
      flowField[index] = vector;
      
      xOffset += inc;
    }
    yOffset += inc;
  }

  // Update and display particles
  for (let particle of particles) {
    particle.follow(flowField);
    particle.update();
    particle.edges();
    particle.show();
  }

  // Update mouse trail
  mouseTrail.push(createVector(mouseX, mouseY));
  if (mouseTrail.length > 100) { 
    mouseTrail.shift();
  }

  // Draw the lines that follow the mouse
  drawMouseLines();

  // Update previous mouse position
  prevMousePos.set(mouseX, mouseY);
}

function drawMouseLines() {
  stroke(192, 192, 122); 
  strokeWeight(2);
  
  for (let i = 1; i < mouseTrail.length; i++) {
    let p1 = mouseTrail[i - 1];
    let p2 = mouseTrail[i];
    
    let dir = p5.Vector.sub(p2, p1).normalize(); 
    let length = p5.Vector.dist(p1, p2); 

    // Draw segments following the direction from the initial point
    for (let j = 0; j < length; j += 5) {
      let x = lerp(p1.x, p2.x, j / length);
      let y = lerp(p1.y, p2.y, j / length);
      let flowIndex = floor(x / scale) + floor(y / scale) * cols;
      
      if (flowIndex >= 0 && flowIndex < flowField.length) {
        let flow = flowField[flowIndex];
        x += flow.x * 5; 
        y += flow.y * 5;
      }
      point(x, y);
    }
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.prevPos = this.pos.copy();
  }

  follow(vectors) {
    let x = floor(this.pos.x / scale);
    let y = floor(this.pos.y / scale);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(192, 192, 192); 
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
