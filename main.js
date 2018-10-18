
// Sound effect.
let plip;

// Array of buttons.
let bus = [];

// Ratio scalar for window size.
let tSize;

function preload(){
    //plip = loadSound('plip.wav');
    plip =   loadSound('https://cccpoetry.github.io/Poetry2018/plip.wav');
    // Plip.wav orig. 'Flipping Through Book.wav' by spookymodem.
    // See https://opengameart.org/content/book-pages
}

let testBu;


function setup(){
    createCanvas(   windowWidth,
                    windowHeight);
  
    plip.setVolume(0.2);
    plip.play();
    
    // For buttonClass.
    rectMode(CENTER);
    
    // Scalar. Universal.
    tSize = height/10;
    
    let y8Bu;
    
    for (let i = 0; i < 5; i++){
    y8Bu = new Button(44 + tSize * 1.7 + i * 100,height/2-42,88,42);
    y8Bu.text = "Y" + (i+7) + " winner";
    y8Bu.fill.x = 0;
    y8Bu.fill.y = 0;
    y8Bu.fill.z = 90 + i * 22;
    y8Bu.stroke.x = 255;
    y8Bu.stroke.y = 255;
    y8Bu.stroke.z = 255;
    y8Bu.sRate = 120 + i * 10;
        bus.push(y8Bu);
    }
}

function draw(){
    background(0,142,172);
  
    // Poetry Day title.
    renderTitle();
    
    for (let i = 0; i < bus.length; i++){
    bus[i].hoverCheck(mouseX,mouseY);
    bus[i].animate();
    bus[i].render();
    bus[i].hoverCheck(mouseX,mouseY);
    bus[i].animate();
    bus[i].render();
    }
}

function mousePressed(){
    
    for (let i = 0; i < bus.length; i++){
    if (bus[i].checkClick(mouseX,mouseY)){
        bus[i].activate();
    }
    }
    
}

function renderTitle(){
    fill(255);
    stroke(0);
    textSize(tSize);
    //textStyle(NORMAL);
    strokeWeight(8);
    text("National Poetry Day\n2018", tSize*1.7,tSize);
    
    
    // Quotation.
    fill(   Math.sin(frameCount/30)*255,
            Math.sin(frameCount/30)*255,
            Math.sin(frameCount/30)*255);
    stroke(255-Math.sin(frameCount/40)*255,
            255-Math.sin(frameCount/40)*255,
            255-Math.sin(frameCount/40)*255);
    textSize(tSize/2);
    strokeWeight(1);
    textStyle(ITALIC);
    text("'How out of Breath you are -'", tSize*1.7,height-tSize*2);
    textSize(tSize/3);
    text("(Emily Dickinson)", tSize*1.7,height-tSize*1);
    textStyle(NORMAL);
}

