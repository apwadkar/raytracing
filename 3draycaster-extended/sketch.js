let walls = [];
let particle;
let xoff = 0;
let yoff = 5;

const screenWidth = 400;
const screenHeight = 400;

function setup() {
    createCanvas(screenWidth * 2, screenHeight);
    for (let i = 0; i < 1; ++i) {
        const x1 = random(screenWidth);
        const y1 = random(screenHeight);
        const x2 = random(screenWidth);
        const y2 = random(screenHeight);
        walls[i] = new Boundary(x1, y1, x2, y2, random());
    }
    walls.push(new Boundary(0, 0, 0, screenHeight, 1));
    walls.push(new Boundary(screenWidth - 4, 0, screenWidth - 4, screenHeight, 0.75));
    walls.push(new Boundary(0, 0, screenWidth, 0, 0.25));
    walls.push(new Boundary(0, screenHeight, screenWidth, screenHeight));
    particle = new Particle(createVector(screenWidth / 2, height / 2), 1, 1, radians(45));
}

function draw() {
    if (keyIsDown(LEFT_ARROW)) {
        particle.rotate(-0.1);
    } else if (keyIsDown(RIGHT_ARROW)) {
        particle.rotate(0.1);
    }
    if (keyIsDown(UP_ARROW)) {
        particle.move(1);
    } else if (keyIsDown(DOWN_ARROW)) {
        particle.move(-1);
    }

    background(0);
    
    for (let wall of walls) wall.show();
    particle.show();

    const [scene, brightness] = particle.look(walls);
    const w = screenWidth / scene.length;
    push();
    translate(screenWidth, 0);
    for (let i = 0; i < scene.length; ++i) {
        noStroke();
        const h = screenHeight * 45 / scene[i];
        fill(brightness[i]);
        rectMode(CENTER);
        rect(i * w + w / 2, screenHeight / 2, w + 1, h);
    }
    pop();
}