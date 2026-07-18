/* ========================================
   AI Quest — Main App Controller
   State management, routing, persistence
   ======================================== */

(function() {
  'use strict';

  const STORAGE_KEY = 'aiquest_progress';

  const App = {
    currentView: 'home',
    currentLevelId: null,
    currentChallenge: null,

    // --- Initialize ---
    init() {
      this.progress = this.loadProgress();
      Effects.initParticles();
      Renderer.updateNavStats(this.progress);
      this.navigate('home');

      // Handle browser back/forward
      window.addEventListener('popstate', (e) => {
        if (e.state) {
          this._navigateInternal(e.state.view, e.state.param, false);
        }
      });

      // Resize confetti canvas on window resize
      window.addEventListener('resize', () => {
        const canvas = document.getElementById('confetti-canvas');
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      });
    },

    // --- Navigation ---
    navigate(view, param) {
      this._navigateInternal(view, param, true);
    },

    _navigateInternal(view, param, pushState) {
      // Hide all views
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      Engine.reset();
      Renderer.hideResult();

      switch (view) {
        case 'home':
          document.getElementById('view-home').classList.add('active');
          Renderer.renderLevelMap(LEVELS, this.progress);
          if (pushState) history.pushState({ view: 'home' }, '', '#');
          break;

        case 'level':
          const level = LEVELS.find(l => l.id === param);
          if (!level) return this.navigate('home');
          this.currentLevelId = param;
          document.getElementById('view-level').classList.add('active');
          Renderer.renderLevelDetail(level, this.progress);
          if (pushState) history.pushState({ view: 'level', param }, '', `#level-${param}`);
          break;

        case 'challenge':
          const chal = this._findChallenge(param);
          if (!chal) return this.navigate('home');
          this.currentChallenge = chal.challenge;
          this.currentLevelId = chal.level.id;
          document.getElementById('view-challenge').classList.add('active');
          Renderer.renderChallenge(chal.challenge, chal.level);
          if (pushState) history.pushState({ view: 'challenge', param }, '', `#challenge-${param}`);
          break;
      }

      this.currentView = view;
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // --- Find challenge by ID ---
    _findChallenge(challengeId) {
      for (const level of LEVELS) {
        const challenge = level.challenges.find(c => c.id === challengeId);
        if (challenge) return { challenge, level };
      }
      return null;
    },

    // --- Complete a challenge ---
    completeChallenge(challengeId, stars, xpEarned) {
      const existing = this.progress.challenges[challengeId];

      // Only update if new score is better
      if (existing && existing.completed && existing.stars >= stars) {
        // Already completed with equal or better score
        Renderer.showResult(
          stars,
          0,
          'Already Completed',
          `You already earned ${existing.stars} stars on this one!`
        );
        return;
      }

      const previousStars = existing ? (existing.stars || 0) : 0;
      const starsDelta = stars - previousStars;
      const previousXP = existing && existing.completed ? (existing.xpEarned || 0) : 0;
      const xpDelta = xpEarned - previousXP;

      this.progress.challenges[challengeId] = {
        completed: true,
        stars: stars,
        xpEarned: xpEarned,
        completedAt: new Date().toISOString(),
      };

      this.progress.xp = (this.progress.xp || 0) + Math.max(xpDelta, 0);

      this.saveProgress();
      Renderer.updateNavStats(this.progress);

      // Show result
      const messages = {
        3: { title: 'Perfect! ⭐⭐⭐', subtitle: 'You absolutely crushed it!' },
        2: { title: 'Great Work! ⭐⭐', subtitle: 'Strong performance — almost perfect!' },
        1: { title: 'Passed! ⭐', subtitle: 'You made it through! Try again for more stars.' },
        0: { title: 'Almost...', subtitle: 'Not quite enough — give it another shot!' },
      };

      const msg = messages[stars] || messages[1];
      Renderer.showResult(stars, Math.max(xpDelta, 0), msg.title, msg.subtitle);
    },

    // --- Retry current challenge ---
    retryChallenge() {
      Renderer.hideResult();
      if (this.currentChallenge) {
        this.navigate('challenge', this.currentChallenge.id);
      }
    },

    // --- Go to next challenge ---
    nextChallenge() {
      Renderer.hideResult();

      if (!this.currentChallenge || !this.currentLevelId) {
        this.navigate('home');
        return;
      }

      const level = LEVELS.find(l => l.id === this.currentLevelId);
      if (!level) return this.navigate('home');

      const currentIndex = level.challenges.findIndex(c => c.id === this.currentChallenge.id);

      if (currentIndex < level.challenges.length - 1) {
        // Next challenge in this level
        this.navigate('challenge', level.challenges[currentIndex + 1].id);
      } else {
        // Level complete — check if next level unlocked
        const levelIndex = LEVELS.findIndex(l => l.id === this.currentLevelId);
        if (levelIndex < LEVELS.length - 1) {
          const nextLevel = LEVELS[levelIndex + 1];
          const isUnlocked = level.challenges.every(c => this.progress.challenges[c.id]?.completed);
          if (isUnlocked) {
            this.navigate('level', nextLevel.id);
          } else {
            this.navigate('level', level.id);
          }
        } else {
          this.navigate('home');
        }
      }
    },

    // --- Progress Persistence ---
    loadProgress() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Failed to load progress:', e);
      }
      return { challenges: {}, xp: 0 };
    },

    saveProgress() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
      } catch (e) {
        console.warn('Failed to save progress:', e);
      }
    },

    // --- Reset (for debugging) ---
    resetProgress() {
      if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        this.progress = { challenges: {}, xp: 0 };
        Renderer.updateNavStats(this.progress);
        this.navigate('home');
      }
    }
  };

  // Expose to global scope
  window.AIQuest = App;

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
})();
