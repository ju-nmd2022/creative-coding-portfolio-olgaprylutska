let particles = [];
let synth;
let lastNoteTime = 0; 
const noteInterval = 200; 
let started = false; 

function setup() {
  createCanvas(800, 800);
  background(208, 138, 192);

  
  synth = new Tone.Synth({
    oscillator: { type: "triangle" }, 
    envelope: {
      attack: 0.2,  
      decay: 0.3,   
      sustain: 0.4, 
      release: 0.6, 
    },
  });

  
  volume = new Tone.Volume(0); 
  filter = new Tone.Filter(500, "lowpass"); 
  reverb = new Tone.Reverb({ decay: 1.5, wet: 0.4 }); 
  
  synth.chain(volume, filter, reverb, Tone.Destination);

  
  mousePressed = () => {
    Tone.start();
    started = true; 
  };

  for (let i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(192, 107, 172);

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

    
    if (started) { 
      let currentTime = millis();
      if (currentTime - lastNoteTime > noteInterval) {
        if (this.pos.y < height / 2) {
          this.playSound("C4"); 
        } else {
          this.playSound("E4"); 
        }
        lastNoteTime = currentTime; 
      }
    }

    
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  playSound(note) {
    
    synth.triggerAttackRelease(note, "8n");
  }

  show() {
    stroke(255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }
}

