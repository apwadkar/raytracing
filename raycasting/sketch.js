let walls = [];
let particle;
let xoff = 0;
let yoff = 100;

function setup() {
    const w = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    const h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    createCanvas(w, h);
    for (let i = 0; i < 5; ++i) {
        const x1 = random(width);
        const y1 = random(height);
        const x2 = random(width);
        const y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    walls.push(new Boundary(0, 0, 0, height));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(0, height, width, height));
    particle = new Particle(2);
}

function draw() {
    background(0);
    
    for (let wall of walls) wall.show();

    particle.update(noise(xoff) * width, noise(yoff) * height);
    particle.look(walls);
    particle.show();
    
    xoff += 0.01;
    yoff += 0.01;
}