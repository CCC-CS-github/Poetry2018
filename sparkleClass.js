// Sparkle class :)

class Sparkle{
    
    constructor(x,y){
        this.pos = createVector(x,y);
        
        this.rad = 20;
        this.fallRate = 0.1;
        
        this.acc = 0.01;
        
        // Ready to deactivate?
        this.rip = false;
    }
    
    update(){
        this.pos.y += this.fallRate;
        this.fallRate += this.acc;
        
        if (this.pos.y > height)
            this.rip = true;
    }
    
    render(){
        strokeWeight(this.rad);
        stroke(255,140);
        fill(255,140);
        point(this.pos.x, this.pos.y);
    }
    
}