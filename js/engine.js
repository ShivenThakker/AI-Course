/* ========================================
   AI Quest — Challenge Engine
   Handles interaction logic & verification
   ======================================== */

const Engine = {
  // Current state
  _quizAnswers: {},
  _quizSubmitted: false,
  _matchSelected: { left: null, right: null },
  _matchCorrect: 0,
  _matchTotal: 0,
  _matchedPairs: new Set(),
  _rubricChecked: new Set(),
  _lastAnalysis: null,

  // Reset state for new challenge
  reset() {
    this._quizAnswers = {};
    this._quizSubmitted = false;
    this._matchSelected = { left: null, right: null };
    this._matchCorrect = 0;
    this._matchTotal = 0;
    this._matchedPairs = new Set();
    this._rubricChecked = new Set();
    this._lastAnalysis = null;
    this._promptTasksSubmitted = new Set();
  },

  // =============================================
  // QUIZ ENGINE
  // =============================================
  handleQuizAnswer(questionIndex, optionIndex) {
    if (this._quizSubmitted) return;

    // Deselect all options for this question
    const options = document.querySelectorAll(`[data-question="${questionIndex}"]`);
    options.forEach(opt => opt.classList.remove('selected'));

    // Select the clicked one
    const selected = document.querySelector(`[data-question="${questionIndex}"][data-option="${optionIndex}"]`);
    selected.classList.add('selected');

    this._quizAnswers[questionIndex] = optionIndex;

    // Enable submit if all questions answered
    const challenge = window.AIQuest.currentChallenge;
    const totalQuestions = challenge.questions.length;
    const answeredCount = Object.keys(this._quizAnswers).length;

    const scoreDisplay = document.getElementById('quiz-score-display');
    scoreDisplay.textContent = `${answeredCount}/${totalQuestions} answered`;

    const submitBtn = document.getElementById('quiz-submit-btn');
    submitBtn.disabled = answeredCount < totalQuestions;
  },

  submitQuiz() {
    if (this._quizSubmitted) return;
    this._quizSubmitted = true;

    const challenge = window.AIQuest.currentChallenge;
    let correct = 0;

    challenge.questions.forEach((q, i) => {
      const userAnswer = this._quizAnswers[i];
      const options = document.querySelectorAll(`[data-question="${i}"]`);

      options.forEach(opt => {
        opt.classList.add('disabled');
        const optIndex = parseInt(opt.dataset.option);
        if (optIndex === q.correctIndex) {
          opt.classList.add('correct');
        } else if (optIndex === userAnswer && userAnswer !== q.correctIndex) {
          opt.classList.add('incorrect');
        }
      });

      if (userAnswer === q.correctIndex) {
        correct++;
      }

      // Show explanation
      document.getElementById(`quiz-exp-${i}`).classList.add('visible');
    });

    // Calculate stars
    let stars = 0;
    if (correct >= challenge.scoring.threeStars) stars = 3;
    else if (correct >= challenge.scoring.twoStars) stars = 2;
    else if (correct >= challenge.scoring.oneStar) stars = 1;

    const passed = correct >= challenge.passingScore;
    const scoreDisplay = document.getElementById('quiz-score-display');
    scoreDisplay.textContent = `Score: ${correct}/${challenge.questions.length}`;
    scoreDisplay.style.color = passed ? 'var(--accent-green)' : 'var(--accent-red)';

    // Update submit button
    const submitBtn = document.getElementById('quiz-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = passed ? `Passed! ${correct}/${challenge.questions.length}` : `${correct}/${challenge.questions.length} — Need ${challenge.passingScore} to pass`;

    if (passed) {
      const xpEarned = Math.round(challenge.xp * (0.5 + stars * 0.25));
      setTimeout(() => {
        window.AIQuest.completeChallenge(challenge.id, stars, xpEarned);
      }, 1500);
    } else {
      // Show retry button
      submitBtn.disabled = false;
      submitBtn.textContent = '🔄 Try Again';
      submitBtn.className = 'btn btn-secondary btn-lg';
      submitBtn.onclick = () => window.AIQuest.retryChallenge();
    }
  },

  // =============================================
  // TEXT ANALYSIS ENGINE
  // =============================================
  handleTextInput() {
    const textarea = document.getElementById('essay-input');
    const text = textarea.value;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    document.getElementById('word-count').textContent = `${words.length} words`;
  },

  analyzeText() {
    const textarea = document.getElementById('essay-input');
    const text = textarea.value.trim();

    if (!text || text.split(/\s+/).length < 20) {
      alert('Please write at least 20 words before analyzing.');
      return;
    }

    const result = Analyzer.analyze(text);
    this._lastAnalysis = result;

    // Show results section
    const resultsDiv = document.getElementById('analysis-results');
    resultsDiv.style.display = 'block';

    // Score
    const scoreValue = document.getElementById('ai-score-value');
    scoreValue.textContent = result.score + '%';
    scoreValue.className = 'ai-score-value ' + (result.score >= 60 ? 'high' : result.score >= 35 ? 'medium' : 'low');

    // Score bar
    const scoreFill = document.getElementById('ai-score-fill');
    scoreFill.style.width = result.score + '%';
    scoreFill.className = 'ai-score-fill ' + (result.score >= 60 ? 'high' : result.score >= 35 ? 'medium' : 'low');

    // Feedback
    document.getElementById('ai-feedback').textContent = result.feedback;

    // Details grid
    const detailsDiv = document.getElementById('analysis-details');
    detailsDiv.innerHTML = '';
    Object.values(result.details).forEach(detail => {
      detailsDiv.innerHTML += `
        <div class="analysis-detail" style="flex-direction: column; align-items: flex-start; gap: 4px;">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <span class="label">${detail.label}</span>
            <span class="value ${detail.flag ? 'flag' : 'ok'}">${detail.value}</span>
          </div>
          <span style="font-size: 0.75rem; color: ${detail.flag ? 'var(--accent-orange)' : 'var(--text-muted)'}; line-height: 1.4;">${detail.explanation}</span>
        </div>
      `;
    });

    // Enable submit button with feedback
    const challenge = window.AIQuest.currentChallenge;
    const submitBtn = document.getElementById('essay-submit-btn');
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const scoreOk = result.score <= challenge.maxAiScore;
    const wordsOk = words.length >= challenge.minWords;
    submitBtn.disabled = !(scoreOk && wordsOk);

    if (scoreOk && wordsOk) {
      submitBtn.textContent = '✓ Submit — You Passed!';
      submitBtn.className = 'btn btn-success btn-lg';
    } else if (!wordsOk) {
      submitBtn.textContent = `Need ${challenge.minWords - words.length} more words`;
      submitBtn.className = 'btn btn-primary btn-lg';
    } else {
      submitBtn.textContent = `Score ${result.score}% — Need ≤${challenge.maxAiScore}%`;
      submitBtn.className = 'btn btn-primary btn-lg';
    }

    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  submitTextAnalysis() {
    const challenge = window.AIQuest.currentChallenge;
    if (!this._lastAnalysis) return;

    const score = this._lastAnalysis.score;

    let stars = 0;
    // For text analysis, LOWER score = BETTER (less AI-like)
    if (score <= challenge.scoring.threeStars) stars = 3;
    else if (score <= challenge.scoring.twoStars) stars = 2;
    else if (score <= challenge.scoring.oneStar) stars = 1;

    const xpEarned = Math.round(challenge.xp * (0.5 + stars * 0.25));
    window.AIQuest.completeChallenge(challenge.id, stars, xpEarned);
  },

  // =============================================
  // MATCHING ENGINE
  // =============================================
  handleMatchClick(side, index) {
    const challenge = window.AIQuest.currentChallenge;
    const element = document.getElementById(`match-${side}-${index}`);

    if (element.classList.contains('matched') || element.classList.contains('disabled')) return;

    // Clear previous selection on this side
    if (this._matchSelected[side] !== null) {
      const prev = document.getElementById(`match-${side}-${this._matchSelected[side]}`);
      if (prev) prev.classList.remove('selected');
    }

    element.classList.add('selected');
    this._matchSelected[side] = index;

    // Check if both sides selected
    if (this._matchSelected.left !== null && this._matchSelected.right !== null) {
      const leftIndex = this._matchSelected.left;
      const rightElement = document.getElementById(`match-right-${this._matchSelected.right}`);
      const rightValue = rightElement.dataset.value;
      const correctRight = challenge.pairs[leftIndex].right;

      const leftEl = document.getElementById(`match-left-${leftIndex}`);

      if (rightValue === correctRight) {
        // Correct match
        leftEl.classList.remove('selected');
        leftEl.classList.add('matched');
        rightElement.classList.remove('selected');
        rightElement.classList.add('matched');
        this._matchCorrect++;
        this._matchedPairs.add(leftIndex);
      } else {
        // Wrong match
        Effects.shake(rightElement);
        leftEl.classList.remove('selected');
        rightElement.classList.remove('selected');
      }

      this._matchSelected = { left: null, right: null };
      this._matchTotal = challenge.pairs.length;

      document.getElementById('match-score').textContent = `${this._matchCorrect}/${this._matchTotal} matched`;

      // Check if all matched
      if (this._matchCorrect >= challenge.passingScore) {
        document.getElementById('match-submit-btn').disabled = false;
      }

      if (this._matchCorrect === this._matchTotal) {
        // Auto submit on all correct
        setTimeout(() => this.submitMatching(), 800);
      }
    }
  },

  submitMatching() {
    const challenge = window.AIQuest.currentChallenge;
    let stars = 0;
    if (this._matchCorrect >= challenge.scoring.threeStars) stars = 3;
    else if (this._matchCorrect >= challenge.scoring.twoStars) stars = 2;
    else if (this._matchCorrect >= challenge.scoring.oneStar) stars = 1;

    const xpEarned = Math.round(challenge.xp * (0.5 + stars * 0.25));
    window.AIQuest.completeChallenge(challenge.id, stars, xpEarned);
  },

  // =============================================
  // SELF ASSESSMENT ENGINE
  // =============================================
  toggleRubricItem(index) {
    const item = document.querySelectorAll('.rubric-item')[index];
    const checkbox = document.getElementById(`rubric-check-${index}`);

    if (this._rubricChecked.has(index)) {
      this._rubricChecked.delete(index);
      item.classList.remove('checked');
      checkbox.textContent = '';
    } else {
      this._rubricChecked.add(index);
      item.classList.add('checked');
      checkbox.textContent = '✓';
    }

    const count = this._rubricChecked.size;
    document.getElementById('rubric-count').textContent = `${count} items checked`;

    const challenge = window.AIQuest.currentChallenge;
    document.getElementById('self-assess-submit-btn').disabled = count < challenge.scoring.oneStar;
  },

  submitSelfAssessment() {
    const challenge = window.AIQuest.currentChallenge;
    const count = this._rubricChecked.size;

    let stars = 0;
    if (count >= challenge.scoring.threeStars) stars = 3;
    else if (count >= challenge.scoring.twoStars) stars = 2;
    else if (count >= challenge.scoring.oneStar) stars = 1;

    const xpEarned = Math.round(challenge.xp * (0.5 + stars * 0.25));
    window.AIQuest.completeChallenge(challenge.id, stars, xpEarned);
  },

  // =============================================
  // TUTORIAL ENGINE
  // =============================================
  completeTutorial() {
    const challenge = window.AIQuest.currentChallenge;
    window.AIQuest.completeChallenge(challenge.id, 3, challenge.xp);
  },

  // =============================================
  // PROMPT CHALLENGE ENGINE
  // =============================================
  _promptTasksSubmitted: new Set(),

  submitSinglePromptTask(taskIndex) {
    const challenge = window.AIQuest.currentChallenge;
    const task = challenge.tasks[taskIndex];
    const promptInput = document.getElementById(`prompt-input-${taskIndex}`);
    const outputInput = document.getElementById(`prompt-output-${taskIndex}`);
    const feedbackDiv = document.getElementById(`prompt-feedback-${taskIndex}`);
    const submitBtn = document.getElementById(`prompt-submit-${taskIndex}`);
    const statusSpan = document.getElementById(`prompt-task-status-${taskIndex}`);

    const prompt = promptInput ? promptInput.value.trim() : '';
    const output = outputInput ? outputInput.value.trim() : '';

    // Validation
    if (prompt.length < 20) {
      feedbackDiv.style.display = 'block';
      feedbackDiv.style.background = 'rgba(239, 68, 68, 0.1)';
      feedbackDiv.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      feedbackDiv.innerHTML = '<strong style="color: var(--accent-red);">❌ Prompt too short.</strong><br><span style="color: var(--text-secondary);">Write a detailed, improved prompt (at least a few sentences). Remember the formula: Role + Task + Context + Format + Constraints.</span>';
      return;
    }
    if (output.length < 20) {
      feedbackDiv.style.display = 'block';
      feedbackDiv.style.background = 'rgba(239, 68, 68, 0.1)';
      feedbackDiv.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      feedbackDiv.innerHTML = '<strong style="color: var(--accent-red);">❌ AI output missing.</strong><br><span style="color: var(--text-secondary);">Open ChatGPT or Claude, use your prompt, and paste the AI\'s response here so we can see if your prompt worked.</span>';
      return;
    }

    // Check which required elements are present in the prompt
    const promptLower = prompt.toLowerCase();
    const outputLower = output.toLowerCase();
    const combinedLower = promptLower + ' ' + outputLower;
    let feedbackItems = [];
    let passedCount = 0;

    task.requiredElements.forEach((el, j) => {
      const chip = document.getElementById(`constraint-${taskIndex}-${j}`);
      const elLower = el.toLowerCase();

      // Heuristic: check if the concept is addressed in the prompt
      // We check for keywords related to each required element
      const keywordMap = {
        'role': ['you are', 'act as', 'pretend', 'persona', 'tutor', 'teacher', 'coach', 'expert', 'assistant'],
        'specific topic': ['about', 'topic', 'explain', 'describe', 'regarding', 'focus on', 'specifically'],
        'format': ['bullet', 'list', 'table', 'step', 'paragraph', 'numbered', 'format', 'structure', 'points'],
        'audience level': ['grade', 'year old', 'student', 'beginner', 'simple', 'easy to understand', 'level', 'like i\'m', 'age'],
        'genre/theme': ['sci-fi', 'fantasy', 'mystery', 'romance', 'horror', 'comedy', 'adventure', 'genre', 'theme', 'setting'],
        'character details': ['character', 'protagonist', 'main character', 'personality', 'age', 'name', 'who is'],
        'length constraint': ['word', 'sentence', 'paragraph', 'short', 'brief', 'limit', 'under', 'maximum', 'no more than'],
        'style/tone': ['tone', 'style', 'casual', 'formal', 'funny', 'serious', 'professional', 'friendly', 'engaging', 'dark', 'humorous'],
        'audience': ['for a', 'audience', 'reader', 'aimed at', 'written for', 'grade', 'student'],
        'specific aspect': ['cause', 'effect', 'solution', 'impact', 'history', 'future', 'process', 'reason', 'how', 'why'],
        'constraints': ['limit', 'maximum', 'under', 'avoid', 'must', 'should', 'include', 'without', 'only', 'exactly'],
        'subjects': ['math', 'science', 'english', 'history', 'biology', 'physics', 'chemistry', 'subject', 'class'],
        'time frame': ['hour', 'day', 'week', 'month', 'minute', 'session', 'before', 'until', 'deadline', 'schedule', 'plan'],
        'study style': ['visual', 'flashcard', 'practice', 'quiz', 'summary', 'note', 'diagram', 'mind map', 'active recall'],
      };

      // Find relevant keywords for this element
      let found = false;
      const matchKeys = Object.keys(keywordMap).filter(k => elLower.includes(k));

      if (matchKeys.length > 0) {
        for (const key of matchKeys) {
          if (keywordMap[key].some(kw => promptLower.includes(kw))) {
            found = true;
            break;
          }
        }
      } else {
        // Fallback: check if the element text itself or parts of it appear in the prompt
        const elWords = elLower.split(/\s+/);
        found = elWords.some(w => w.length > 3 && promptLower.includes(w));
      }

      if (found) {
        passedCount++;
        if (chip) {
          chip.style.background = 'rgba(16, 185, 129, 0.2)';
          chip.style.borderColor = 'rgba(16, 185, 129, 0.5)';
          chip.querySelector('.status-dot').style.background = 'var(--accent-green)';
        }
        feedbackItems.push(`<span style="color: var(--accent-green);">✅ <strong>${el}</strong> — Found in your prompt. Nice!</span>`);
      } else {
        if (chip) {
          chip.style.background = 'rgba(239, 68, 68, 0.2)';
          chip.style.borderColor = 'rgba(239, 68, 68, 0.5)';
          chip.querySelector('.status-dot').style.background = 'var(--accent-red)';
        }
        // Give specific advice for what's missing
        let advice = 'Try adding this to your prompt.';
        if (elLower.includes('role')) advice = 'Start your prompt with "You are a [role]..." to give the AI a persona.';
        else if (elLower.includes('format')) advice = 'Tell the AI HOW to structure the answer: "Give me 5 bullet points" or "Format as a table."';
        else if (elLower.includes('audience') || elLower.includes('level')) advice = 'Tell the AI who this is for: "Explain to a 9th grader" or "for someone who knows nothing about this."';
        else if (elLower.includes('topic')) advice = 'Be more specific about WHAT exactly you want help with — don\'t leave it vague.';
        else if (elLower.includes('tone') || elLower.includes('style')) advice = 'Specify the vibe: "in a friendly tone," "formally," "like a coach motivating an athlete."';
        else if (elLower.includes('length') || elLower.includes('constraint')) advice = 'Set limits: "in under 200 words," "exactly 3 paragraphs," "keep each point to one sentence."';
        else if (elLower.includes('genre') || elLower.includes('theme')) advice = 'Name the genre or theme: "a sci-fi story," "mystery thriller," etc.';
        else if (elLower.includes('character')) advice = 'Describe your character: age, personality, situation, appearance — the more detail, the better.';
        feedbackItems.push(`<span style="color: var(--accent-red);">❌ <strong>${el}</strong> — Missing. ${advice}</span>`);
      }
    });

    const allPassed = passedCount === task.requiredElements.length;
    const mostPassed = passedCount >= Math.ceil(task.requiredElements.length * 0.5);

    // Show feedback
    feedbackDiv.style.display = 'block';
    if (allPassed) {
      feedbackDiv.style.background = 'rgba(16, 185, 129, 0.1)';
      feedbackDiv.style.border = '1px solid rgba(16, 185, 129, 0.3)';
      feedbackDiv.innerHTML = `<strong style="color: var(--accent-green);">✅ Great prompt!</strong> All required elements are present.<br><br>${feedbackItems.join('<br>')}`;
      this._promptTasksSubmitted.add(taskIndex);
      statusSpan.textContent = '✅';
      submitBtn.textContent = '✓ Submitted';
      submitBtn.className = 'btn btn-success';
      submitBtn.disabled = true;
    } else if (mostPassed) {
      feedbackDiv.style.background = 'rgba(245, 158, 11, 0.1)';
      feedbackDiv.style.border = '1px solid rgba(245, 158, 11, 0.3)';
      feedbackDiv.innerHTML = `<strong style="color: var(--accent-orange);">🟡 Good effort — ${passedCount}/${task.requiredElements.length} elements found.</strong> You can improve and resubmit, or accept it as-is.<br><br>${feedbackItems.join('<br>')}<br><br><button class="btn btn-secondary" style="margin-top: var(--space-sm);" onclick="Engine.acceptPromptTask(${taskIndex})">Accept anyway</button>`;
    } else {
      feedbackDiv.style.background = 'rgba(239, 68, 68, 0.1)';
      feedbackDiv.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      feedbackDiv.innerHTML = `<strong style="color: var(--accent-red);">❌ Needs work — only ${passedCount}/${task.requiredElements.length} elements found.</strong> Read the feedback below, improve your prompt, and try again.<br><br>${feedbackItems.join('<br>')}`;
    }

    // Update progress
    this._updatePromptProgress();
  },

  acceptPromptTask(taskIndex) {
    const statusSpan = document.getElementById(`prompt-task-status-${taskIndex}`);
    const submitBtn = document.getElementById(`prompt-submit-${taskIndex}`);
    this._promptTasksSubmitted.add(taskIndex);
    statusSpan.textContent = '✅';
    submitBtn.textContent = '✓ Submitted';
    submitBtn.className = 'btn btn-success';
    submitBtn.disabled = true;
    this._updatePromptProgress();
  },

  _updatePromptProgress() {
    const challenge = window.AIQuest.currentChallenge;
    const count = this._promptTasksSubmitted.size;
    const total = challenge.tasks.length;
    document.getElementById('prompt-progress').textContent = `${count}/${total} tasks submitted`;
    document.getElementById('prompt-complete-btn').disabled = count < challenge.scoring.oneStar;

    if (count >= challenge.scoring.oneStar) {
      const btn = document.getElementById('prompt-complete-btn');
      btn.className = 'btn btn-success btn-lg';
    }
  },

  completePromptChallenge() {
    const challenge = window.AIQuest.currentChallenge;
    const count = this._promptTasksSubmitted.size;

    let stars = 0;
    if (count >= challenge.scoring.threeStars) stars = 3;
    else if (count >= challenge.scoring.twoStars) stars = 2;
    else if (count >= challenge.scoring.oneStar) stars = 1;

    const xpEarned = Math.round(challenge.xp * (0.5 + stars * 0.25));
    window.AIQuest.completeChallenge(challenge.id, stars, xpEarned);
  }
};
