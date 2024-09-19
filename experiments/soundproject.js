let synth;
let volume;
let filter;
let reverb;

function setup (){
    createCanvas (800,800);
    background (210,105,30);
    textAlign(CENTER,CENTER);
    textSize(24);
    text('CLICK TO PLAY SOUND', width / 2, height / 2);

    synth = new Tone.Synth({
        oscillator: {
          type: "sine",
        },
      });

      volume = new Tone.Volume(-12);
      
      filter = new Tone.Filter(800, "bandpass");
    
      reverb = new Tone.Reverb({
        decay: 3, 
        wet: 0.5, 
      });

      synth.chain(volume, filter, reverb, Tone.Destination);
}

function mousePressed() {
     Tone.start();
     synth.triggerAttackRelease("C5", "8n");

     setTimeout(() => synth.triggerAttackRelease("E5", "8n"), 200); 
    setTimeout(() => synth.triggerAttackRelease("G5", "8n"), 400); 
}