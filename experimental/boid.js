const canvas = document.getElementById("boidCanvas")
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Boid {
    constructor() {
        this.position = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        };
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        };
        this.acceleration = { x: 0, y: 0 };
        this.maxSpeed = 2;
        this.maxForce = 0.05;
    }

    update() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.velocity.x = Math.min(Math.max(this.velocity.x, -this.maxSpeed), this.maxSpeed);
        this.velocity.y = Math.min(Math.max(this.velocity.y, -this.maxSpeed), this.maxSpeed);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.acceleration.x = 0;
        this.acceleration.y = 0;

        if (this.position.x > canvas.width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = canvas.width;
        if (this.position.y > canvas.height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = canvas.height;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

const boids = [];
for (let i = 0; i < 50; i++) {
    boids.push(new Boid());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boids.forEach(boid => {
        boid.update();
        boid.draw();
    });
    requestAnimationFrame(animate);
}
animate();