export class AudioManager {
  constructor(gameState) {
    this.gameState = gameState;
    this.sounds = {};
    this.music = null;
    this.initialized = false;
    this.audioContext = null;
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
  }

  async init() {
    if (this.initialized) return;
    
    try {
      // Initialize audio context on user interaction
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Resume audio context if suspended (required by some browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      this.initialized = true;
      
      // Generate procedural sounds
      this.generateSounds();
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  generateSounds() {
    // Generate simple beep sounds using oscillators
    // This avoids needing external audio files
    this.sounds = {
      rotate: this.createBeep(200, 0.05, 'sine'),
      lock: this.createBeep(150, 0.1, 'square'),
      clear: this.createBeep(400, 0.15, 'sine'),
      tspin: this.createBeep(600, 0.2, 'triangle')
    };
  }

  createBeep(frequency, duration, type = 'sine') {
    return () => {
      if (!this.initialized || this.gameState.isMuted) return;
      
      try {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
      } catch (e) {
        console.warn('Error playing sound:', e);
      }
    };
  }

  playRotate() {
    if (this.sounds.rotate) {
      this.sounds.rotate();
    }
  }

  playLock() {
    if (this.sounds.lock) {
      this.sounds.lock();
    }
  }

  playClear(lineCount) {
    if (this.sounds.clear) {
      // Play with higher pitch for more lines
      const frequency = 400 + (lineCount * 100);
      const beep = this.createBeep(frequency, 0.15, 'sine');
      beep();
    }
  }

  playTSpin() {
    if (this.sounds.tspin) {
      this.sounds.tspin();
    }
  }

  playMusic() {
    if (this.gameState.isMuted || !this.initialized) return;
    
    // Simple background music using oscillators
    // This creates a basic ambient tone
    try {
      if (this.music) return; // Already playing
      
      const oscillator1 = this.audioContext.createOscillator();
      const oscillator2 = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator1.frequency.value = 220; // A3
      oscillator2.frequency.value = 330; // E4
      oscillator1.type = 'sine';
      oscillator2.type = 'sine';
      
      gainNode.gain.value = this.musicVolume * 0.3;
      
      oscillator1.start();
      oscillator2.start();
      
      this.music = { oscillator1, oscillator2, gainNode };
    } catch (e) {
      console.warn('Error playing music:', e);
    }
  }

  stopMusic() {
    if (this.music) {
      try {
        this.music.oscillator1.stop();
        this.music.oscillator2.stop();
        this.music = null;
      } catch (e) {
        console.warn('Error stopping music:', e);
      }
    }
  }

  pauseMusic() {
    if (this.music && this.music.gainNode) {
      this.music.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    }
  }

  resumeMusic() {
    if (this.gameState.isMuted) return;
    
    if (this.music && this.music.gainNode) {
      this.music.gainNode.gain.setValueAtTime(this.musicVolume * 0.3, this.audioContext.currentTime);
    } else {
      this.playMusic();
    }
  }

  setMuted(muted) {
    if (muted) {
      this.pauseMusic();
    } else {
      this.resumeMusic();
    }
  }
}