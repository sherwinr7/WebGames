# 🔧 Debug & Development Tools

## Development Commands

### Start Development Server
```bash
npm run dev
```
- Opens at: http://localhost:5173
- Hot reload enabled
- Source maps for debugging

### Build for Production
```bash
npm run build
```
- Output: `dist/` folder
- Minified and optimized
- Ready for deployment

### Preview Production Build
```bash
npm run preview
```
- Test production build locally
- Verify before deployment

## Browser DevTools

### Open Console
- **Windows/Linux**: `F12` or `Ctrl + Shift + I`
- **Mac**: `Cmd + Option + I`

### Useful Console Commands

```javascript
// Check game state
console.log(window.gameState);

// Check current score
console.log(window.gameState?.score);

// Check board state
console.log(window.gameState?.board);

// Enable debug mode (if implemented)
localStorage.setItem('debug', 'true');
```

## Common Issues & Solutions

### Issue: Game Not Loading

**Check:**
1. Open browser console (F12)
2. Look for errors in red
3. Check Network tab for failed requests

**Solutions:**
- Clear browser cache: `Ctrl + Shift + Delete`
- Hard refresh: `Ctrl + F5`
- Check if dev server is running

### Issue: Controls Not Working

**Check:**
1. Console for input handler errors
2. Verify keyboard focus on game canvas
3. Check if game is paused

**Debug:**
```javascript
// Test input handler
document.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
});
```

### Issue: Performance Problems

**Check:**
1. Open Performance tab in DevTools
2. Record while playing
3. Look for long tasks or memory leaks

**Solutions:**
- Reduce particle effects
- Lower frame rate
- Check for memory leaks in console

### Issue: Audio Not Playing

**Check:**
1. Browser audio permissions
2. Volume settings
3. Console for audio errors

**Debug:**
```javascript
// Check audio context
console.log(window.audioContext?.state);
```

## Git Debugging

### Check Git Status
```bash
git status
```

### View Commit History
```bash
git log --oneline -10
```

### Check Remote URL
```bash
git remote -v
```

### Reset to Last Commit
```bash
git reset --hard HEAD
```

### Discard Local Changes
```bash
git checkout -- .
```

## Network Debugging

### Check API Calls
1. Open DevTools → Network tab
2. Filter by XHR/Fetch
3. Check request/response

### Test GitHub Connection
```bash
# Test SSH
ssh -T git@github.com

# Test HTTPS
curl -I https://github.com
```

## Performance Profiling

### Measure Frame Rate
```javascript
let lastTime = performance.now();
let frames = 0;

function measureFPS() {
  frames++;
  const now = performance.now();
  if (now >= lastTime + 1000) {
    console.log(`FPS: ${frames}`);
    frames = 0;
    lastTime = now;
  }
  requestAnimationFrame(measureFPS);
}
measureFPS();
```

### Memory Usage
```javascript
// Check memory (Chrome only)
if (performance.memory) {
  console.log('Used:', (performance.memory.usedJSHeapSize / 1048576).toFixed(2), 'MB');
  console.log('Total:', (performance.memory.totalJSHeapSize / 1048576).toFixed(2), 'MB');
}
```

## Testing Checklist

### Before Deployment
- [ ] Game loads without errors
- [ ] All controls work (keyboard + touch)
- [ ] Audio plays correctly
- [ ] Score system works
- [ ] Level progression works
- [ ] Pause/Resume works
- [ ] Game over screen appears
- [ ] Theme toggle works
- [ ] Mobile responsive
- [ ] No console errors

### Cross-Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Chrome
- [ ] Mobile Safari

## Useful Browser Extensions

### Development
- **React DevTools** - Component inspection
- **Redux DevTools** - State management
- **Lighthouse** - Performance auditing

### Debugging
- **JSON Viewer** - Format JSON responses
- **ColorZilla** - Color picker
- **WhatFont** - Font inspector

## VS Code Extensions

### Recommended
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Live Server** - Quick preview
- **GitLens** - Git integration
- **Error Lens** - Inline errors

## Quick Fixes

### Clear All Data
```javascript
// Clear localStorage
localStorage.clear();

// Clear sessionStorage
sessionStorage.clear();

// Reload
location.reload();
```

### Force Rebuild
```bash
# Remove build cache
rm -rf dist node_modules/.vite

# Reinstall and rebuild
npm install
npm run build
```

### Reset Git Config
```bash
# Remove saved config
rm .git-config.json

# Remove remote
git remote remove origin

# Run deploy script again
.\scripts\deploy.ps1
```

## Environment Variables

Create `.env.local` for local development:

```env
# Development
VITE_DEBUG=true
VITE_LOG_LEVEL=debug

# API endpoints (if needed)
VITE_API_URL=http://localhost:3000
```

Access in code:
```javascript
const debug = import.meta.env.VITE_DEBUG;
```

## Logging Levels

```javascript
// Production: Errors only
console.error('Critical error:', error);

// Development: All logs
console.log('Info:', data);
console.warn('Warning:', warning);
console.debug('Debug:', details);
```

## Performance Tips

1. **Use Chrome DevTools Performance Tab**
   - Record gameplay
   - Identify bottlenecks
   - Optimize slow functions

2. **Monitor Memory**
   - Check for memory leaks
   - Profile heap snapshots
   - Compare before/after

3. **Network Optimization**
   - Minimize asset sizes
   - Use CDN for libraries
   - Enable compression

## Getting Help

### Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [Stack Overflow](https://stackoverflow.com/)
- [GitHub Issues](https://github.com/sherwinr7/falling-block-game/issues)

### Debug Checklist
1. ✅ Check console for errors
2. ✅ Verify network requests
3. ✅ Test in different browsers
4. ✅ Clear cache and retry
5. ✅ Check Git status
6. ✅ Review recent changes

---

**Happy Debugging! 🐛🔨**
