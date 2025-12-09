import { CELL_SIZE, BOARD_HIDDEN_ROWS } from '../utils/constants.js';

class Particle {
  constructor(x, y, color, type = 'default') {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4 - 2;
    this.life = 1.0;
    this.decay = 0.02;
    this.size = Math.random() * 4 + 2;
    this.color = color;
    this.type = type;
    this.gravity = 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.life -= this.decay;
    return this.life > 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    
    if (this.type === 'star') {
      this.drawStar(ctx);
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }

  drawStar(ctx) {
    const spikes = 5;
    const outerRadius = this.size;
    const innerRadius = this.size / 2;
    
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const x = this.x + Math.cos(angle) * radius;
      const y = this.y + Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
  }
}

export class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 500;
  }

  spawnLineClearParticles(rows) {
    rows.forEach(row => {
      const adjustedY = (row - BOARD_HIDDEN_ROWS) * CELL_SIZE + CELL_SIZE / 2;
      
      // Don't spawn particles for hidden rows
      if (adjustedY < 0) return;
      
      // Spawn particles along the cleared line
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * this.canvas.width;
        const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#a78bfa'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        this.addParticle(new Particle(x, adjustedY, color, 'default'));
      }
    });
  }

  spawnHardDropParticles(x, y) {
    const adjustedY = (y - BOARD_HIDDEN_ROWS) * CELL_SIZE + CELL_SIZE / 2;
    
    // Don't spawn particles for hidden rows
    if (adjustedY < 0) return;
    
    const pixelX = x * CELL_SIZE + CELL_SIZE / 2;
    
    // Spawn impact particles
    for (let i = 0; i < 15; i++) {
      const colors = ['#ffffff', '#ffff00', '#ff8800'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      this.addParticle(new Particle(pixelX, adjustedY, color, 'default'));
    }
  }

  spawnTSpinParticles(piece) {
    const cells = piece.getCells();
    
    cells.forEach(cell => {
      const adjustedY = cell.y - BOARD_HIDDEN_ROWS;
      
      // Don't spawn particles for hidden rows
      if (adjustedY < 0) return;
      
      const pixelX = cell.x * CELL_SIZE + CELL_SIZE / 2;
      const pixelY = adjustedY * CELL_SIZE + CELL_SIZE / 2;
      
      // Spawn star particles for T-Spin
      for (let i = 0; i < 5; i++) {
        this.addParticle(new Particle(pixelX, pixelY, '#ffd700', 'star'));
      }
    });
  }

  addParticle(particle) {
    if (this.particles.length < this.maxParticles) {
      this.particles.push(particle);
    }
  }

  update() {
    this.particles = this.particles.filter(particle => particle.update());
  }

  render() {
    this.particles.forEach(particle => particle.draw(this.ctx));
  }

  clear() {
    this.particles = [];
  }
}
