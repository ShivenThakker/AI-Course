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

    // Enable submit button
    const challenge = window.AIQuest.currentChallenge;
    const submitBtn = document.getElementById('essay-submit-btn');
    const words = text.split(/\s+/).filter(w => w.length > 0);
    submitBtn.disabled = !(result.score <= challenge.maxAiScore && words.length >= challenge.minWords);

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
  submitPromptChallenge() {
    const challenge = window.AIQuest.currentChallenge;
    let completedTasks = 0;

    challenge.tasks.forEach((task, i) => {
      const promptInput = document.getElementById(`prompt-input-${i}`);
      const outputInput = document.getElementById(`prompt-output-${i}`);

      const prompt = promptInput ? promptInput.value.trim() : '';
      const output = outputInput ? outputInput.value.trim() : '';

      // Check if both fields have meaningful content
      if (prompt.length > 20 && output.length > 20) {
        completedTasks++;
      }
    });

    if (completedTasks === 0) {
      alert('Please complete at least one task — write your improved prompt AND paste the AI\'s response.');
      return;
    }

    let stars = 0;
    if (completedTasks >= challenge.scoring.threeStars) stars = 3;
    else if (completedTasks >= challenge.scoring.twoStars) stars = 2;
    else if (completedTasks >= challenge.scoring.oneStar) stars = 1;

    const xpEarned = Math.round(challenge.xp * (0.5 + stars * 0.25));
    window.AIQuest.completeChallenge(challenge.id, stars, xpEarned);
  }
};
