
// Plip.wav orig. 'Flipping Through Book.wav' by spookymodem.
// See https://opengameart.org/content/book-pages

// Sound effect.
let plip;

function preload(){
  plip = loadSound('plip.wav');
}

// Array of atoms.
let higgs = [];

// Laser Strength.
let lS = 0.1;

// Is the laser on?
let zapON = false;

// Button size.
let buS;

function setup(){
  createCanvas(windowWidth,
              windowHeight);
  
  background(12,255,72);
  
  
  for (let i = 0;
      i < 12;
      i++){
  higgs.push(
    new Atom(width/2,
            height/2));
  }
  
  buS = width/8;
  
  plip.setVolume(0.2);
  
}

function mousePressed(){
  
  if (mouseX > 
     width - buS &&
     mouseY > 
     height - buS * 0.618)
  {
    zapON = !zapON;
  } else
  createAtom();
}

function createAtom(){
  higgs.push(
    new Atom(mouseX,
             mouseY));
  plip.play();
}


function draw(){
  background(12,255,72);
 
  // NB these lines not
  // in tut video!!!
  stroke(0);
  strokeWeight(3);
  fill(255);
  let tS = height/20;
  textSize(tS);
  text("Tap to add atoms", tS,tS*2);
  // Poetry Day title.
  fill(255);
  let tSize = height/10;
  textSize(tSize);
  text("National Poetry Day\n2018", tSize*1.7,tSize);
  
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
  
  
  drawButton();
  
}

function drawButton(){
  
  fill(222,0,0);
  strokeWeight(2);
  stroke(255);
  
  rect(width-buS, 
       height-buS*0.618,
      buS,buS*0.618);
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
    
    // Now, instantiate
    // my electrons :)
    this.elects = [];
    
    let nA = Math.floor(Math.random() *
      7) + 1;
    for (let i = 0;
        i < nA;
        i++){
    this.elects.push(new 
         Electron(0,
                 0,
                 i * 420));
    }
    
  } // End of constructor.
  
  // When atom approaches
  // boundaries of canvas,
  // add a little force
  // to push towards
  // centre again.
  bounds(){
    
    // Boundary force.
    let bF = 0.05;
    
    if (this.pos.x < 
       0 + this.rad){
      this.acc.x +=
        bF;
    }
    if (this.pos.x > 
       width - this.rad){
      this.acc.x -=
        bF;
    }
    
    if (this.pos.y < 
       0 + this.rad){
      this.acc.y +=
        bF;
    }
    if (this.pos.y > 
       height - this.rad){
      this.acc.y -=
        bF;
    }
    
  }
  
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
    this.updateElectrons();
    // Stop atoms
    // wandering off.
    this.bounds();
    
    // Apply Euler
    // integration.
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.mult(0);   
    
    
  }
  
  // Update positions of
  // array of electrons.
  updateElectrons(){
    for (let i=0;
         i<this.elects.length;
         i++
        ){
      this.elects[i].theta+=PI;
      this.elects[i].pos.x =
        this.pos.x + 
        this.rad * ((i+1)/4) * 
        Math.cos(radians((i+1)/3.2*this.elects[i].theta));
      this.elects[i].pos.y =
        this.pos.y + 
        this.rad * ((i+1)/4) * 
        Math.sin(radians((i+1)/3*this.elects[i].theta));
      
      this.elects[i].render();
      
    }
  }
  
  
} // End of Atom object.

class Electron{
  constructor(x,y,t){
    this.pos = createVector(x,
             y);
    
    // Orbital angle.
    this.theta = t;
    
    this.rad = 8;
  }
  
  render(){
    stroke(0);
    strokeWeight(2);
    fill(0,0,222);
    ellipse(this.pos.x,
           this.pos.y,
           this.rad, 
            this.rad);
  }
  
}
