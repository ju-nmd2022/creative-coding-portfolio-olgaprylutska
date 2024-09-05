let scale = 20;
let cols, rows;
let flowField = [];
let particles = [];

function setup() {
  createCanvas(800, 800);
  cols = floor(width / scale);
  rows = floor(height / scale);
  flowField = new Array(cols * rows);

  for (let i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }

  background(0);
}

function draw() {
  for (let particle of particles) {
    particle.follow(flowField);
    particle.update();
    particle.show();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
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
    stroke(255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }
}
