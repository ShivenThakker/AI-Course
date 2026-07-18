/* ========================================
   AI Quest — Renderer
   Handles all UI rendering
   ======================================== */

const Renderer = {
  // --- Render the Level Map (Home view) ---
  renderLevelMap(levels, progress) {
    const grid = document.getElementById('level-map-grid');
    grid.innerHTML = '';

    levels.forEach((level, index) => {
      const levelProgress = this._getLevelProgress(level, progress);
      const isLocked = index > 0 && !this._isLevelUnlocked(index, levels, progress);
      const isCompleted = levelProgress.completed === levelProgress.total && levelProgress.total > 0;
      const isActive = !isLocked && !isCompleted;

      const card = document.createElement('div');
      card.className = `level-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;
      card.onclick = () => {
        if (!isLocked) window.AIQuest.navigate('level', level.id);
      };

      const bgStyle = level.gradient ? level.gradient : level.color;

      card.innerHTML = `
        <div class="level-card-top">
          <div class="level-number" style="background: ${bgStyle}">
            ${level.icon}
          </div>
          <span class="level-status-icon">
            ${isLocked ? '🔒' : isCompleted ? '✅' : '▶️'}
          </span>
        </div>
        <h3>${level.title}</h3>
        <p class="level-subtitle">${level.subtitle}</p>
        <div class="level-progress">
          <div class="level-progress-bar">
            <div class="level-progress-fill" style="width: ${levelProgress.percent}%; background: ${level.color}"></div>
          </div>
          <span class="level-progress-text">${levelProgress.completed}/${levelProgress.total}</span>
        </div>
        <div class="level-stars">
          ${this._renderStars(levelProgress.stars, levelProgress.maxStars)}
        </div>
      `;

      grid.appendChild(card);
    });
  },

  // --- Render Level Detail (Challenge list) ---
  renderLevelDetail(level, progress) {
    const view = document.getElementById('view-level');

    const challenges = level.challenges;
    let challengeListHTML = '';

    challenges.forEach((challenge, index) => {
      const chalProgress = progress.challenges[challenge.id] || {};
      const isCompleted = chalProgress.completed;
      const stars = chalProgress.stars || 0;
      const isLocked = index > 0 && !progress.challenges[challenges[index - 1].id]?.completed;
      const isActive = !isLocked && !isCompleted;

      challengeListHTML += `
        <div class="challenge-list-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}"
             onclick="${isLocked ? '' : `window.AIQuest.navigate('challenge', '${challenge.id}')`}">
          <div class="challenge-list-number">
            ${isCompleted ? '✓' : isLocked ? '🔒' : index + 1}
          </div>
          <div class="challenge-list-info">
            <h4>${challenge.title}</h4>
            <p>${challenge.description.substring(0, 80)}${challenge.description.length > 80 ? '...' : ''}</p>
          </div>
          <div class="challenge-list-stars">
            ${this._renderStars(stars, 3)}
          </div>
        </div>
      `;
    });

    view.innerHTML = `
      <div class="challenge-breadcrumb">
        <a onclick="window.AIQuest.navigate('home')">Home</a>
        <span class="separator">›</span>
        <span>${level.title}</span>
      </div>
      <div class="level-detail-header">
        <div class="level-detail-icon" style="background: ${level.gradient || level.color}">
          ${level.icon}
        </div>
        <div class="level-detail-info">
          <h1>${level.title}</h1>
          <p>${level.subtitle}</p>
        </div>
      </div>
      <div class="challenge-list">
        ${challengeListHTML}
      </div>
    `;
  },

  // --- Render Challenge View ---
  renderChallenge(challenge, level) {
    const view = document.getElementById('view-challenge');

    const typeLabels = {
      'quiz': 'Quiz',
      'tutorial': 'Tutorial',
      'text-analysis': 'AI Detection',
      'self-assessment': 'Practical Task',
      'matching': 'Match Game',
      'prompt-challenge': 'Prompt Challenge',
    };

    let contentHTML = '';

    switch (challenge.type) {
      case 'quiz':
        contentHTML = this._renderQuiz(challenge);
        break;
      case 'tutorial':
        contentHTML = this._renderTutorial(challenge);
        break;
      case 'text-analysis':
        contentHTML = this._renderTextAnalysis(challenge);
        break;
      case 'self-assessment':
        contentHTML = this._renderSelfAssessment(challenge);
        break;
      case 'matching':
        contentHTML = this._renderMatching(challenge);
        break;
      case 'prompt-challenge':
        contentHTML = this._renderPromptChallenge(challenge);
        break;
    }

    view.innerHTML = `
      <div class="challenge-header">
        <div class="challenge-breadcrumb">
          <a onclick="window.AIQuest.navigate('home')">Home</a>
          <span class="separator">›</span>
          <a onclick="window.AIQuest.navigate('level', ${level.id})">${level.title}</a>
          <span class="separator">›</span>
          <span>${challenge.title}</span>
        </div>
        <div class="challenge-title-row">
          <h1>${challenge.title}</h1>
          <div class="challenge-meta">
            <span class="challenge-tag type">${typeLabels[challenge.type] || challenge.type}</span>
            <span class="challenge-tag xp">⚡ ${challenge.xp} XP</span>
          </div>
        </div>
        <p class="challenge-description">${challenge.description}</p>
      </div>
      ${contentHTML}
    `;
  },

  // --- Quiz Renderer ---
  _renderQuiz(challenge) {
    let html = '<div class="glass-card"><h2>📝 Questions</h2>';
    if (challenge.instructions) {
      html += `<p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">${challenge.instructions}</p>`;
    }

    challenge.questions.forEach((q, i) => {
      const letters = ['A', 'B', 'C', 'D'];
      html += `
        <div class="quiz-question" id="quiz-q-${i}">
          <div class="quiz-question-number">Question ${i + 1} of ${challenge.questions.length}</div>
          <div class="quiz-question-text">${q.question}</div>
          <div class="quiz-options">
            ${q.options.map((opt, j) => `
              <div class="quiz-option" data-question="${i}" data-option="${j}" onclick="Engine.handleQuizAnswer(${i}, ${j})">
                <div class="quiz-option-letter">${letters[j]}</div>
                <span>${opt}</span>
              </div>
            `).join('')}
          </div>
          <div class="quiz-explanation" id="quiz-exp-${i}">${q.explanation}</div>
        </div>
      `;
    });

    html += `</div>
      <div class="action-bar">
        <div class="action-bar-left">
          <span id="quiz-score-display" style="color: var(--text-muted); font-size: 0.85rem;"></span>
        </div>
        <div class="action-bar-right">
          <button class="btn btn-primary btn-lg" id="quiz-submit-btn" onclick="Engine.submitQuiz()" disabled>Submit Answers</button>
        </div>
      </div>`;
    return html;
  },

  // --- Tutorial Renderer ---
  _renderTutorial(challenge) {
    let html = '';
    challenge.sections.forEach((section, i) => {
      html += `
        <div class="glass-card tutorial-section" style="animation-delay: ${i * 100}ms">
          <h2>${section.title}</h2>
          ${section.content}
        </div>
      `;
    });

    html += `
      <div class="action-bar">
        <div class="action-bar-left"></div>
        <div class="action-bar-right">
          <button class="btn btn-success btn-lg" onclick="Engine.completeTutorial()">✓ I've Read Everything — Complete</button>
        </div>
      </div>`;
    return html;
  },

  // --- Text Analysis Renderer ---
  _renderTextAnalysis(challenge) {
    let html = '';

    if (challenge.sourceText) {
      html += `
        <div class="glass-card">
          <h2>📄 Source Text (AI-Generated)</h2>
          <div class="source-text-box">
            <div class="source-label">Original AI Text — Rewrite this to sound human</div>
            <p>${challenge.sourceText}</p>
            <button class="copy-btn" onclick="navigator.clipboard.writeText(this.closest('.source-text-box').querySelector('p').textContent).then(() => this.textContent = 'Copied!')">Copy</button>
          </div>
        </div>
      `;
    }

    if (challenge.topic) {
      html += `
        <div class="glass-card">
          <h2>📝 Your Topic</h2>
          <div class="tip-box">
            <strong>Write about:</strong> "${challenge.topic}"<br>
            <span style="font-size: 0.85rem;">Minimum ${challenge.minWords} words. You CAN use AI to draft it, but the final version must pass the detector.</span>
          </div>
        </div>
      `;
    }

    html += `
      <div class="glass-card">
        <h2>✍️ Your Humanised Version</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-md);">${challenge.instructions}</p>
        <textarea class="text-input-area" id="essay-input"
          placeholder="Paste or type your humanised text here..."
          oninput="Engine.handleTextInput()"></textarea>
        <div class="word-count" id="word-count">0 words</div>
      </div>

      <div class="glass-card" id="analysis-results" style="display: none;">
        <h2>🔍 AI Detection Analysis</h2>
        <div class="ai-score-meter">
          <div class="ai-score-label">
            <span>AI Probability Score</span>
            <span class="ai-score-value" id="ai-score-value">0%</span>
          </div>
          <div class="ai-score-track">
            <div class="ai-score-fill" id="ai-score-fill" style="width: 0%"></div>
            <div class="ai-score-threshold" style="left: ${challenge.maxAiScore}%" data-label="Pass: ${challenge.maxAiScore}%"></div>
          </div>
        </div>
        <p id="ai-feedback" style="color: var(--text-secondary); margin: var(--space-md) 0; line-height: 1.7;"></p>
        <div class="analysis-details" id="analysis-details"></div>
      </div>

      <div class="action-bar">
        <div class="action-bar-left">
          <button class="btn btn-secondary" onclick="Engine.analyzeText()">🔍 Analyze Text</button>
        </div>
        <div class="action-bar-right">
          <button class="btn btn-primary btn-lg" id="essay-submit-btn" onclick="Engine.submitTextAnalysis()" disabled>Submit</button>
        </div>
      </div>`;

    return html;
  },

  // --- Self Assessment Renderer ---
  _renderSelfAssessment(challenge) {
    let html = '';

    if (challenge.tasks && challenge.tasks.length > 0) {
      // Collect ALL rubric items across ALL tasks
      let allRubricItems = [];
      let taskBriefs = [];

      challenge.tasks.forEach((task, taskIndex) => {
        taskBriefs.push(task.brief);
        task.rubric.forEach(item => {
          allRubricItems.push(item);
        });
      });

      // Render task instructions
      html += `
        <div class="glass-card">
          <h2>📋 Your Task${challenge.tasks.length > 1 ? 's' : ''}</h2>
          ${challenge.toolsNeeded ? `
            <div class="tools-needed" style="margin-bottom: var(--space-md);">
              ${challenge.toolsNeeded.map(t => `<span class="tool-chip">🔧 ${t}</span>`).join('')}
            </div>
          ` : ''}
          ${taskBriefs.map((brief, idx) => `
            <div class="task-instructions" ${challenge.tasks.length > 1 ? `style="margin-bottom: var(--space-md);"` : ''}>
              ${challenge.tasks.length > 1 ? `<h4>Task ${idx + 1}</h4>` : '<h4>What to Do</h4>'}
              <p>${brief.replace(/\n/g, '<br>')}</p>
            </div>
          `).join('')}
        </div>

        <div class="glass-card">
          <h2>✅ Completion Checklist</h2>
          <p style="color: var(--text-secondary); margin-bottom: var(--space-md);">Check off each item as you complete it honestly. You need at least ${challenge.scoring.oneStar} checks to pass.</p>
          <ul class="rubric-list" id="rubric-list">
            ${allRubricItems.map((item, i) => `
              <li class="rubric-item" onclick="Engine.toggleRubricItem(${i})">
                <div class="rubric-checkbox" id="rubric-check-${i}"></div>
                <div class="rubric-content">
                  <h5>${item.criterion}</h5>
                  <p>${item.description}</p>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
      `;

      // Hints — collect from challenge level and all tasks
      let allHints = challenge.hints ? [...challenge.hints] : [];
      challenge.tasks.forEach(t => {
        if (t.hints) allHints.push(...t.hints);
      });
      if (allHints.length > 0) {
        html += `
          <div class="hints-container">
            <button class="hint-toggle" onclick="document.getElementById('hint-list').classList.toggle('visible')">
              💡 Need help? Show hints
            </button>
            <ul class="hint-list" id="hint-list">
              ${allHints.map(h => `<li class="hint-item">${h}</li>`).join('')}
            </ul>
          </div>
        `;
      }
    }

    html += `
      <div class="action-bar">
        <div class="action-bar-left">
          <span id="rubric-count" style="color: var(--text-muted); font-size: 0.85rem;">0 items checked</span>
        </div>
        <div class="action-bar-right">
          <button class="btn btn-primary btn-lg" id="self-assess-submit-btn" onclick="Engine.submitSelfAssessment()" disabled>Complete Challenge</button>
        </div>
      </div>`;

    return html;
  },

  // --- Matching Renderer ---
  _renderMatching(challenge) {
    // Shuffle the right column
    const shuffledRight = [...challenge.pairs].map(p => p.right);
    for (let i = shuffledRight.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledRight[i], shuffledRight[j]] = [shuffledRight[j], shuffledRight[i]];
    }

    let html = `
      <div class="glass-card">
        <h2>🔗 Match the Pairs</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-sm);">${challenge.instructions}</p>
        <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: var(--space-lg);">💡 Click a scenario on the left, then click the tool you think matches it on the right.</p>
        <div class="matching-container">
          <div class="matching-column">
            <h4>Scenario</h4>
            ${challenge.pairs.map((p, i) => `
              <div class="matching-item" id="match-left-${i}" data-index="${i}" data-side="left" onclick="Engine.handleMatchClick('left', ${i})">
                ${p.left}
              </div>
            `).join('')}
          </div>
          <div class="matching-column">
            <h4>Best Tool</h4>
            ${shuffledRight.map((text, i) => `
              <div class="matching-item" id="match-right-${i}" data-value="${text}" data-side="right" onclick="Engine.handleMatchClick('right', ${i})">
                ${text}
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="action-bar">
        <div class="action-bar-left">
          <span id="match-score" style="color: var(--text-muted); font-size: 0.85rem;">0/${challenge.pairs.length} matched</span>
        </div>
        <div class="action-bar-right">
          <button class="btn btn-primary btn-lg" id="match-submit-btn" onclick="Engine.submitMatching()" disabled>Complete</button>
        </div>
      </div>`;

    return html;
  },

  // --- Prompt Challenge Renderer ---
  _renderPromptChallenge(challenge) {
    let html = `
      <div class="glass-card">
        <h2>🎯 Instructions</h2>
        <p style="color: var(--text-secondary); line-height: 1.7;">${challenge.instructions}</p>
      </div>
    `;

    challenge.tasks.forEach((task, i) => {
      html += `
        <div class="glass-card" id="prompt-task-${i}">
          <h2>Task ${i + 1}</h2>
          ${task.badPrompt ? `
            <div class="example-box bad" style="margin-bottom: var(--space-md);">
              <div class="example-label">❌ Bad Prompt</div>
              <div class="example-text">"${task.badPrompt}"</div>
            </div>
          ` : ''}
          <div class="tip-box">
            <strong>Goal:</strong> ${task.goal}
          </div>
          <div style="margin: var(--space-md) 0;">
            <strong style="color: var(--text-bright); font-size: 0.85rem;">Must include:</strong>
            <div class="constraint-list" id="constraints-${i}">
              ${task.requiredElements.map(el => `
                <span class="constraint-chip">
                  <span class="status-dot"></span>
                  ${el}
                </span>
              `).join('')}
            </div>
          </div>
          <textarea class="text-input-area" id="prompt-input-${i}" placeholder="Write your improved prompt here..."
            style="min-height: 120px; margin-top: var(--space-md);"></textarea>
          <textarea class="text-input-area" id="prompt-output-${i}" placeholder="Paste the AI's response here..."
            style="min-height: 150px; margin-top: var(--space-sm);"></textarea>

          ${task.hints ? `
            <div class="hints-container">
              <button class="hint-toggle" onclick="document.getElementById('task-hints-${i}').classList.toggle('visible')">
                💡 Hints
              </button>
              <ul class="hint-list" id="task-hints-${i}">
                ${task.hints.map(h => `<li class="hint-item">${h}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `;
    });

    html += `
      <div class="action-bar">
        <div class="action-bar-left"></div>
        <div class="action-bar-right">
          <button class="btn btn-primary btn-lg" onclick="Engine.submitPromptChallenge()">Submit All</button>
        </div>
      </div>`;

    return html;
  },

  // --- Helper: render star icons ---
  _renderStars(earned, max) {
    let html = '';
    for (let i = 0; i < max; i++) {
      html += `<span class="star ${i < earned ? 'earned' : ''}">⭐</span>`;
    }
    return html;
  },

  // --- Helper: get level progress ---
  _getLevelProgress(level, progress) {
    const total = level.challenges.length;
    let completed = 0;
    let stars = 0;
    const maxStars = total * 3;

    level.challenges.forEach(c => {
      const cp = progress.challenges[c.id];
      if (cp && cp.completed) {
        completed++;
        stars += cp.stars || 0;
      }
    });

    return {
      total,
      completed,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
      stars,
      maxStars,
    };
  },

  // --- Helper: check if level is unlocked ---
  _isLevelUnlocked(levelIndex, levels, progress) {
    if (levelIndex === 0) return true;
    const prevLevel = levels[levelIndex - 1];
    return prevLevel.challenges.every(c => progress.challenges[c.id]?.completed);
  },

  // --- Update navbar stats ---
  updateNavStats(progress) {
    const totalStars = Object.values(progress.challenges).reduce((sum, c) => sum + (c.stars || 0), 0);
    const xp = progress.xp || 0;

    document.getElementById('total-stars').textContent = totalStars;
    document.getElementById('total-xp').textContent = xp + ' XP';

    // Rank
    let rank = RANKS[0];
    let nextRank = RANKS[1];
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (xp >= RANKS[i].minXP) {
        rank = RANKS[i];
        nextRank = RANKS[i + 1] || null;
        break;
      }
    }

    document.getElementById('rank-title').textContent = rank.title;
    document.getElementById('rank-label').textContent = rank.title;

    // XP bar
    if (nextRank) {
      const progressInRank = xp - rank.minXP;
      const rankRange = nextRank.minXP - rank.minXP;
      const percent = Math.min((progressInRank / rankRange) * 100, 100);
      document.getElementById('xp-bar-fill').style.width = percent + '%';
      document.getElementById('xp-label').textContent = `${xp} / ${nextRank.minXP} XP`;
    } else {
      document.getElementById('xp-bar-fill').style.width = '100%';
      document.getElementById('xp-label').textContent = `${xp} XP — MAX RANK`;
    }
  },

  // --- Show result overlay ---
  showResult(stars, xpEarned, title, subtitle) {
    const overlay = document.getElementById('result-overlay');
    document.getElementById('result-title').textContent = title || (stars >= 3 ? 'Perfect! ⭐⭐⭐' : stars >= 2 ? 'Great Work!' : 'Challenge Complete!');
    document.getElementById('result-subtitle').textContent = subtitle || (stars >= 3 ? 'You absolutely crushed it!' : stars >= 2 ? 'Strong performance!' : 'You passed! Keep going.');
    document.getElementById('result-xp-value').textContent = `+${xpEarned} XP`;

    overlay.classList.add('visible');
    Effects.animateStars(stars);

    if (stars >= 2) {
      setTimeout(() => Effects.confetti(), 300);
    }
  },

  hideResult() {
    document.getElementById('result-overlay').classList.remove('visible');
  }
};
