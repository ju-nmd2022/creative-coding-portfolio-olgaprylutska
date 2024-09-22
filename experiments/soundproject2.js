let particles = [];
let synth;
let lastNoteTime = 0; 
const noteInterval = 200; 
let started = false; 

function setup() {
  createCanvas(800, 800);
  
  noStroke();
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(0, 0, 128), color(0, 0, 255), inter); 
    stroke(c);
    line(0, i, width, i);
  }

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
  
  fill(0, 10);
  rect(0, 0, width, height); 

  for (let particle of particles) {
    particle.update();
    particle.show();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(1, 3)); 
    this.size = random(5, 15); 
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(p5.Vector.random2D().mult(0.05)); 

    if (started) { 
      let currentTime = millis();
      if (currentTime - lastNoteTime > noteInterval) {
        let note = this.pos.y < height / 2 ? "C4" : "E4";
        this.playSound(note, this.size);
        lastNoteTime = currentTime; 
      }
    }

    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  playSound(note, size) {
    let frequency = 220 * (size / 10); 
    synth.triggerAttackRelease(note, "8n");
    synth.frequency.setValueAtTime(frequency, Tone.now()); 
  }

  show() {
    let colorValue = map(this.pos.y, 0, height, 0, 255);
    stroke(colorValue, 100, 255 - colorValue); 
    strokeWeight(2);
    for (let i = 0; i < 10; i++) {
      stroke(colorValue, 100, 255 - colorValue, 150 - i * 15); 
      point(this.pos.x, this.pos.y);
    }
  }
}

function keyPressed() {
  if (key === 'ArrowUp') {
    volume.volume.value += 2; 
  } else if (key === 'ArrowDown') {
    volume.volume.value -= 2; 
  } else if (key === 'ArrowRight') {
    filter.frequency.value += 50; 
  } else if (key === 'ArrowLeft') {
    filter.frequency.value -= 50; 
  }
}