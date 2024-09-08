let particles = [];
let flowField;
let cols, rows;
let scale = 20;
let inc = 0.1;
let noiseStrength = 0.05;

function setup() {
  createCanvas(800, 800);
  background(255, 255, 255);
  cols = floor(width / scale);
  rows = floor(height / scale);
  flowField = new Array(cols * rows);

  for (let i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  let yOffset = 0;
  for (let y = 0; y < rows; y++) {
    let xOffset = 90;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xOffset, yOffset) * TWO_PI * 4;
      let vector = p5.Vector.fromAngle(angle);
      vector.setMag(1);
      flowField[index] = vector;
      xOffset += inc;
    }
    yOffset += inc;
  }

  for (let particle of particles) {
    particle.follow(flowField);
    particle.update();
    particle.applyRandomForce();
    particle.edges();
    particle.show();
    particle.checkReset();
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

  applyRandomForce() {
    let randomForce = createVector(random(-noiseStrength, noiseStrength), random(-noiseStrength, noiseStrength));
    this.applyForce(randomForce);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(147, 151, 153, 50);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
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

  checkReset() {
    if (random(1) < 0.001) {
      this.pos = createVector(random(width), random(height));
      this.updatePrev();
    }
  }
}
