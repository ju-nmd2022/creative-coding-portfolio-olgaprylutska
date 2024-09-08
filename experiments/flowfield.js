let particles = [];

function setup() {
  createCanvas(800, 800);
  background(0);

  for (let i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(0, 25);

  for (let particle of particles) {
    particle.update();
    particle.show();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
  }

  update() {
    this.pos.add(p5.Vector.random2D());
  }

  show() {
    stroke(255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }
}
