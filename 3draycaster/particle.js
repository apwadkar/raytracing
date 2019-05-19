class Particle {
    constructor(fov) {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.heading = 0;
        this.fov = fov;
        for (let i = -fov / 2; i < fov / 2; i += 1) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    rotate(angle) {
        this.heading += angle;
        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays[index].setAngle(radians(a) + this.heading);
            index++;
        }
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        // for (let ray of this.rays) {
        //     ray.show();
        // }
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
        for (let i = 0; i < this.rays.length; ++i) {
            let record = Infinity;
            let closest = null;
            for (let wall of walls) {
                const pt = this.rays[i].cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            scene[i] = record;
        }
        return scene;
    }
}