let cat; 

function preload() {
  cat = loadImage('assets/laugh-point.png'); 
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (mouseIsPressed) { 
    background(cat); 
  } else {
    background(240);
    text('Click and hold for sound effect', 50, 50);
  }
}

let osc = new Tone.Oscillator(440, 'sawtooth').toDestination();
let filter = new Tone.Filter(200, 'lowpass').toDestination();
osc.connect(filter);

let lfo = new Tone.LFO(5, 100, 500).connect(filter.frequency).start();

let noise = new Tone.Noise('white').start();

let envelope = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 0.5,
  release: 0.5
}).toDestination();

noise.connect(envelope);

function mousePressed() {
  envelope.triggerAttack(0.5);
  osc.start();
}

function mouseReleased() {
  envelope.triggerRelease(); 
  osc.stop();
}
