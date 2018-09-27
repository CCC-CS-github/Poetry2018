// Plip.wav orig. 'Flipping Through Book.wav' by spookymodem.
// See https://opengameart.org/content/book-pages

// Array of atoms.
let higgs = [];

// Laser Strength.
let lS = 0.1;

// Is the laser on?
let zapON = false;

// Sound effect.
let plip;

function preload(){
  plip = loadSound('plip.wav');
}

function setup(){
  createCanvas(windowWidth,
              windowHeight);
  
  background(12,255,72);
  
  
  higgs.push(
    new Atom(width/2,
            height/2));
  
  plip.setVolume(0.2);
  
}

function mousePressed(){
  higgs.push(
    new Atom(mouseX,
             mouseY));
  
  plip.play();
}


function draw(){
  background(12,255,72);
 
  // NB these lines not
  // in tut video!!!
  fill(255);
  textSize(height/10);
  text("Tap to add atoms", 12,24);
  
  // Iterate over all
  // atoms and do their
  // physics.
  for (let i = 0; 
       i < higgs.length;
      i++){
  higgs[i].jiggle();
    
    // Zap with laser.
    if (zapON){
      zap(higgs[i]);
    }
    
  higgs[i].update();
  higgs[i].render();
  }
}

function zap(a){
  // a is an Atom obj.
  
  // First check up mom.
  if (a.vel.y < 0){
    stroke(250,0,0);
    strokeWeight(3);
    line(a.pos.x,0,
         a.pos.x,a.pos.y-
        a.rad/2);
    a.acc.y += lS;
  }
  
  // First check up mom.
  if (a.vel.x < 0){
    stroke(0,0,250);
    strokeWeight(3);
    line(0,a.pos.y,
         a.pos.x
         -a.rad/2,a.pos.y);
    a.acc.x += lS;
  }
  
  
  // First check down mom.
  if (a.vel.y > 0){
    stroke(250,250,250);
    strokeWeight(3);
    line(a.pos.x,height,
         a.pos.x,a.pos.y+
        a.rad/2);
    a.acc.y -= lS;
  }
  
  // First check right mom.
  if (a.vel.x > 0){
    stroke(250,250,0);
    strokeWeight(3);
    line(width,a.pos.y,
         a.pos.x
         +a.rad/2,a.pos.y);
    a.acc.x -= lS;
  }
  
}


class Atom{
  constructor(x,y){
    this.pos = createVector(x,
             y);
    
    this.acc = createVector(0,0);
    this.vel = createVector(0,0);
    
    // Do we now want
    // to give the atom
    // a random pos?
    // And random jiggle?
    
    // Radius of atom.
    this.rad = 42;
    
  } // End of constructor.
  
  
  render(){
    stroke(0);
    strokeWeight(4);
    fill(255, 127);
    
    ellipse(this.pos.x,
           this.pos.y,
           this.rad);  
  }
  
  jiggle(){
    // Move the atom
    // in a random
    // direction.
    
    let jiggleFactor = 0.1;
    
    this.acc =
    p5.Vector.random2D().mult(
    jiggleFactor);
    
  }
  

  
  update(){
    
    // Apply Euler
    // integration.
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.mult(0);   
    
  }
  
  
} // End of Atom object.
