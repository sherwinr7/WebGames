// Breakout Game - Main Game Logic

class Paddle {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 100;
    this.height = 15;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - 40;
    this.speed = 8;
    this.dx = 0;
  }

  draw(ctx) {
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
    gradient.addColorStop(0, '#00f0f0');
    gradient.addColorStop(0.5, '#a000f0');
    gradient.addColorStop(1, '#00f0f0');
    
    ctx.fillStyle = gradient;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00f0f0';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.shadowBlur = 0;
  }

  update() {
    this.x += this.dx;
    
    // Boundaries
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > this.canvas.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  moveLeft() {
    this.dx = -this.speed;
  }

  moveRight() {
    this.dx = this.speed;
  }

  stop() {
    this.dx = 0;
  }

  expand() {
    this.width = Math.min(150, this.width + 30);
  }

  shrink() {
    this.width = Math.max(60, this.width - 30);
  }
}

class Ball {
  constructor(canvas, paddle) {
    this.canvas = canvas;
    this.paddle = paddle;
    this.radius = 8;
    this.reset();
  }

  reset() {
    this.x = this.paddle.x + this.paddle.width / 2;
    this.y = this.paddle.y - this.radius - 2;
    this.dx = 0;
    this.dy = 0;
    this.launched = false;
    this.speed = 5;
  }

  launch() {
    if (!this.launched) {
      this.launched = true;
      const angle = (Math.random() - 0.5) * Math.PI / 3; // Random angle
      this.dx = this.speed * Math.sin(angle);
      this.dy = -this.speed * Math.cos(angle);
    }
  }

  draw(ctx) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.5, '#00f0f0');
    gradient.addColorStop(1, '#a000f0');
    
    ctx.fillStyle = gradient;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00f0f0';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  update() {
    if (!this.launched) {
      this.x = this.paddle.x + this.paddle.width / 2;
      this.y = this.paddle.y - this.radius - 2;
      return;
    }

    this.x += this.dx;
    this.y += this.dy;

    // Wall collision
    if (this.x - this.radius < 0 || this.x + this.radius > this.canvas.width) {
      this.dx = -this.dx;
    }
    
    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Paddle collision
    if (
      this.y + this.radius > this.paddle.y &&
      this.y - this.radius < this.paddle.y + this.paddle.height &&
      this.x > this.paddle.x &&
      this.x < this.paddle.x + this.paddle.width
    ) {
      // Calculate hit position on paddle (-1 to 1)
      const hitPos = (this.x - (this.paddle.x + this.paddle.width / 2)) / (this.paddle.width / 2);
      const angle = hitPos * Math.PI / 3; // Max 60 degrees
      
      this.dx = this.speed * Math.sin(angle);
      this.dy = -this.speed * Math.cos(angle);
      this.y = this.paddle.y - this.radius;
    }
  }

  isOut() {
    return this.y - this.radius > this.canvas.height;
  }
}

class Brick {
  constructor(x, y, width, height, color, points) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.points = points;
    this.destroyed = false;
  }

  draw(ctx) {
    if (this.destroyed) return;

    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.shadowBlur = 0;
  }

  checkCollision(ball) {
    if (this.destroyed) return false;

    if (
      ball.x + ball.radius > this.x &&
      ball.x - ball.radius < this.x + this.width &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y + this.height
    ) {
      // Determine collision side
      const overlapLeft = ball.x + ball.radius - this.x;
      const overlapRight = this.x + this.width - (ball.x - ball.radius);
      const overlapTop = ball.y + ball.radius - this.y;
      const overlapBottom = this.y + this.height - (ball.y - ball.radius);

      const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

      if (minOverlap === overlapLeft || minOverlap === overlapRight) {
        ball.dx = -ball.dx;
      } else {
        ball.dy = -ball.dy;
      }

      this.destroyed = true;
      return true;
    }
    return false;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  createExplosion(x, y, color) {
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1,
        color
      });
    }
  }

  update() {
    this.particles = this.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // Gravity
      p.life -= 0.02;
      return p.life > 0;
    });
  }

  draw(ctx) {
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fillRect(p.x, p.y, 4, 4);
    });
    ctx.globalAlpha = 1;
  }
}

export class BreakoutGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.paddle = new Paddle(canvas);
    this.ball = new Ball(canvas, this.paddle);
    this.bricks = [];
    this.particles = new ParticleSystem();
    
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.paused = false;
    this.gameOver = false;
    this.won = false;
    
    this.initBricks();
  }

  initBricks() {
    this.bricks = [];
    const rows = 5 + this.level;
    const cols = 8;
    const brickWidth = (this.canvas.width - 20) / cols - 5;
    const brickHeight = 20;
    const colors = ['#ff0066', '#ff6600', '#ffcc00', '#00ff66', '#0066ff', '#6600ff'];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * (brickWidth + 5) + 10;
        const y = row * (brickHeight + 5) + 50;
        const color = colors[row % colors.length];
        const points = (rows - row) * 10;
        this.bricks.push(new Brick(x, y, brickWidth, brickHeight, color, points));
      }
    }
  }

  update() {
    if (this.paused || this.gameOver || this.won) return;

    this.paddle.update();
    this.ball.update();
    this.particles.update();

    // Check brick collisions
    this.bricks.forEach(brick => {
      if (brick.checkCollision(this.ball)) {
        this.score += brick.points;
        this.particles.createExplosion(
          brick.x + brick.width / 2,
          brick.y + brick.height / 2,
          brick.color
        );
      }
    });

    // Check if ball is out
    if (this.ball.isOut()) {
      this.lives--;
      if (this.lives <= 0) {
        this.gameOver = true;
      } else {
        this.ball.reset();
      }
    }

    // Check win condition
    if (this.bricks.every(b => b.destroyed)) {
      this.won = true;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.bricks.forEach(brick => brick.draw(this.ctx));
    this.paddle.draw(this.ctx);
    this.ball.draw(this.ctx);
    this.particles.draw(this.ctx);
  }

  nextLevel() {
    this.level++;
    this.ball.reset();
    this.initBricks();
    this.won = false;
  }

  restart() {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.gameOver = false;
    this.won = false;
    this.ball.reset();
    this.initBricks();
  }

  getRemainingBricks() {
    return this.bricks.filter(b => !b.destroyed).length;
  }
}
