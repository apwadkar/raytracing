class Particle {
    constructor(pos, fov, delta=1, heading=0, reflected=false) {
        this.pos = pos;
        this.rays = [];
        this.heading = heading;
        this.fov = fov;
        this.delta = delta;
        this.reflected = reflected;
        for (let i = -fov / 2; i < fov / 2; i += delta) {
            this.rays.push(new Ray(this.pos, radians(i) + heading));
        }
    }

    rotate(angle) {
        this.heading += angle;
        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.delta) {
            this.rays[index].setAngle(radians(a) + this.heading);
            index++;
        }
    }

    show() {
        noStroke();
        if (!this.reflected) {
            fill(255, 0, 0);
        } else {
            fill(0, 255, 0);
        }
        ellipse(this.pos.x, this.pos.y, 8);
    }

    update(x, y) {
        this.pos.set(x, y);
    }

    move(amount) {
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amount);
        this.pos.add(vel);
        this.pos.x = constrain(this.pos.x, 0, screenWidth);
        this.pos.y = constrain(this.pos.y, 0, screenHeight);
    }

    look(walls) {
        let scene = [];
        let brightness = [];
        for (let i = 0; i < this.rays.length; ++i) {
            let record = Infinity;
            let closest = null;
            let closestWall = null;
            for (let wall of walls) {
                const pt = this.rays[i].cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                        closestWall = wall;
                    }
                }
            }
            if (closest) {
                const sq = record * record;
                const wSq = screenWidth * screenWidth;
                const b = map(sq, 0, wSq, 255, 0);
                // stroke(255, 100);
                stroke(b);
                brightness[i] = b;
                line(this.pos.x, this.pos.y, closest.x, closest.y);
                if (closestWall.r > 0 && closestWall.r <= 1 && b > 20) {
                    const ra = degrees(this.rays[i].angle);
                    let off = (ra >= 0 && ra < 90 || ra >= 180 && ra < 270) ? 90 : 180;
                    const angle = (ra + off) % 360;
                    console.log(`${ra} + ${off} = ${angle}`);
                    let p = new Particle(closest, 1, 1, radians(angle), true);
                    p.show();
                    const [, br] = p.look(walls);
                    brightness[i] = b * (1 - closestWall.r) + r * br;
                }
            }
            scene[i] = record;
        }
        return [scene, brightness];
    }
}