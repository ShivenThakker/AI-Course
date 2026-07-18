/* ========================================
   AI Quest — AI Text Analyzer
   Heuristic-based AI detection scoring
   ======================================== */

const Analyzer = {
  // Common AI filler / transition phrases
  AI_PHRASES: [
    'it is important to note',
    'it\'s important to note',
    'it is worth noting',
    'it\'s worth noting',
    'in conclusion',
    'in summary',
    'furthermore',
    'moreover',
    'additionally',
    'consequently',
    'nevertheless',
    'in today\'s world',
    'in today\'s digital age',
    'in today\'s society',
    'in the modern world',
    'in the realm of',
    'plays a crucial role',
    'plays a vital role',
    'plays an important role',
    'it can be argued',
    'on the other hand',
    'as a result',
    'in light of',
    'with regard to',
    'in terms of',
    'it is essential to',
    'it\'s essential to',
    'it is crucial to',
    'it\'s crucial to',
    'one must consider',
    'this is because',
    'this demonstrates',
    'this highlights',
    'this underscores',
    'this illustrates',
    'delve',
    'delving',
    'tapestry',
    'multifaceted',
    'landscape',
    'in this essay',
    'this essay will',
    'throughout history',
    'since the dawn of time',
    'stands as a testament',
    'a testament to',
    'the importance of',
    'cannot be overstated',
    'in the ever-evolving',
    'navigating the',
    'leverage',
    'utilize',
    'facilitating',
    'encompasses',
    'embark on',
    'journey of',
    'shed light on',
    'myriad of',
    'myriad',
    'plethora of',
    'plethora',
    'paramount',
    'indispensable',
    'holistic',
    'comprehensive understanding',
    'nuanced',
    'intricate',
    'fostering',
    'cultivating',
    'harnessing',
    'pivotal',
    'groundbreaking',
    'revolutionary',
    'transformative',
    'cutting-edge',
  ],

  // Sentence-starting patterns typical of AI
  AI_SENTENCE_STARTS: [
    /^(however|furthermore|moreover|additionally|consequently|nevertheless|thus|therefore|hence|indeed|notably|interestingly|importantly|significantly|ultimately|overall),?\s/i,
    /^(in (conclusion|summary|essence|particular|addition|contrast|fact|other words|the (end|same way|context of|realm of|world of|face of)|this (essay|article|context|regard))),?\s/i,
    /^(it is (important|worth|essential|crucial|clear|evident|noteworthy|undeniable) (to|that|noting))\s/i,
    /^(this (is|demonstrates|highlights|illustrates|underscores|shows|suggests|reveals|indicates))\s/i,
    /^(as (we|a result|mentioned|such|one|noted|discussed))\s/i,
    /^(on the (other hand|contrary|one hand|whole))\s/i,
    /^(one (of the|can|must|might|could|should|cannot))\s/i,
    /^(while (it|this|there|some|many|the))\s/i,
  ],

  /**
   * Analyze text and return an AI probability score (0-100)
   * Higher = more likely AI-generated
   */
  analyze(text) {
    if (!text || text.trim().length < 50) {
      return { score: 0, details: {}, feedback: 'Text too short to analyze. Write at least 50 characters.' };
    }

    const scores = {};
    const details = {};

    // --- 1. Sentence length uniformity ---
    const sentences = this._getSentences(text);
    if (sentences.length >= 3) {
      const lengths = sentences.map(s => s.split(/\s+/).length);
      const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
      const variance = lengths.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / lengths.length;
      const cv = mean > 0 ? Math.sqrt(variance) / mean : 0;
      // AI tends to have low CV (uniform sentence lengths)
      // Human writing: CV typically 0.4-0.8+
      // AI writing: CV typically 0.15-0.35
      const uniformityScore = cv < 0.2 ? 95 : cv < 0.3 ? 75 : cv < 0.4 ? 50 : cv < 0.55 ? 25 : 5;
      scores.sentenceUniformity = uniformityScore;
      details.sentenceVariation = {
        label: 'Sentence Length Variation',
        value: (cv * 100).toFixed(0) + '%',
        flag: cv < 0.35,
        explanation: cv < 0.35 ? 'Your sentences are very uniform in length — AI does this. Mix short punchy sentences with longer ones.' : 'Good variation in sentence lengths.'
      };
    }

    // --- 2. Contraction usage ---
    const wordCount = text.split(/\s+/).length;
    const contractionPattern = /\b(i'm|i'll|i've|i'd|we're|we'll|we've|we'd|they're|they'll|they've|they'd|you're|you'll|you've|you'd|he's|she's|it's|that's|what's|who's|there's|here's|can't|won't|don't|doesn't|didn't|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|couldn't|wouldn't|shouldn't|mustn't|let's|ain't|y'all)\b/gi;
    const contractions = (text.match(contractionPattern) || []).length;
    const contractionRate = contractions / (wordCount / 100);
    // Human casual writing: 3-8+ contractions per 100 words
    // AI formal writing: 0-1 per 100 words
    const contractionScore = contractionRate < 0.5 ? 85 : contractionRate < 1.5 ? 60 : contractionRate < 3 ? 30 : 5;
    scores.contractions = contractionScore;
    details.contractions = {
      label: 'Contractions',
      value: contractions + ' found',
      flag: contractionRate < 1.5,
      explanation: contractionRate < 1.5 ? 'Almost no contractions. AI avoids "don\'t", "can\'t", "it\'s" etc. Use them — humans always do.' : 'Good use of contractions.'
    };

    // --- 3. AI phrase detection ---
    const lowerText = text.toLowerCase();
    const foundPhrases = this.AI_PHRASES.filter(phrase => lowerText.includes(phrase));
    const phraseRate = foundPhrases.length / (wordCount / 100);
    const phraseScore = phraseRate > 3 ? 95 : phraseRate > 2 ? 80 : phraseRate > 1 ? 55 : phraseRate > 0.5 ? 30 : 5;
    scores.aiPhrases = phraseScore;
    details.aiPhrases = {
      label: 'AI Buzzwords',
      value: foundPhrases.length + ' detected',
      flag: foundPhrases.length > 2,
      explanation: foundPhrases.length > 2 ? 'Found AI-typical phrases: "' + foundPhrases.slice(0, 3).join('", "') + '"... Replace these with natural language.' : foundPhrases.length > 0 ? 'A few AI-ish phrases: "' + foundPhrases.join('", "') + '". Consider replacing.' : 'No obvious AI phrases detected!'
    };

    // --- 4. Sentence start patterns ---
    if (sentences.length >= 3) {
      const aiStarts = sentences.filter(s => this.AI_SENTENCE_STARTS.some(pattern => pattern.test(s.trim()))).length;
      const startRate = aiStarts / sentences.length;
      const startScore = startRate > 0.5 ? 90 : startRate > 0.35 ? 70 : startRate > 0.2 ? 45 : startRate > 0.1 ? 20 : 5;
      scores.sentenceStarts = startScore;
      details.sentenceStarts = {
        label: 'Formulaic Openers',
        value: aiStarts + '/' + sentences.length + ' sentences',
        flag: startRate > 0.25,
        explanation: startRate > 0.25 ? 'Too many sentences start with "However", "Furthermore", "This demonstrates" etc. Vary your openings.' : 'Good variety in sentence openers.'
      };
    }

    // --- 5. Paragraph structure uniformity ---
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    if (paragraphs.length >= 3) {
      const paraLengths = paragraphs.map(p => p.split(/\s+/).length);
      const paraMean = paraLengths.reduce((a, b) => a + b, 0) / paraLengths.length;
      const paraVariance = paraLengths.reduce((a, b) => a + Math.pow(b - paraMean, 2), 0) / paraLengths.length;
      const paraCV = paraMean > 0 ? Math.sqrt(paraVariance) / paraMean : 0;
      const paraScore = paraCV < 0.15 ? 85 : paraCV < 0.25 ? 60 : paraCV < 0.4 ? 30 : 5;
      scores.paragraphUniformity = paraScore;
      details.paragraphUniformity = {
        label: 'Paragraph Uniformity',
        value: (paraCV * 100).toFixed(0) + '% variation',
        flag: paraCV < 0.25,
        explanation: paraCV < 0.25 ? 'Paragraphs are very similar in length — AI writes like this. Vary your paragraph sizes.' : 'Good paragraph length variation.'
      };
    }

    // --- 6. Personal pronouns (first person) ---
    const firstPersonPattern = /\b(I|me|my|mine|myself|we|us|our|ours|ourselves)\b/g;
    const firstPersonCount = (text.match(firstPersonPattern) || []).length;
    const firstPersonRate = firstPersonCount / (wordCount / 100);
    const firstPersonScore = firstPersonRate < 0.3 ? 80 : firstPersonRate < 1 ? 55 : firstPersonRate < 2 ? 25 : 5;
    scores.personalPronouns = firstPersonScore;
    details.personalPronouns = {
      label: 'Personal Voice',
      value: firstPersonCount + ' personal pronouns',
      flag: firstPersonRate < 1,
      explanation: firstPersonRate < 1 ? 'Very few personal pronouns (I, me, my, we). AI tends to write impersonally. Add your own voice.' : 'Good personal voice present.'
    };

    // --- 7. Passive voice frequency ---
    const passivePattern = /\b(is|are|was|were|be|been|being)\s+(being\s+)?\w+(ed|en|t)\b/gi;
    const passiveCount = (text.match(passivePattern) || []).length;
    const passiveRate = passiveCount / (sentences.length || 1);
    const passiveScore = passiveRate > 0.4 ? 75 : passiveRate > 0.25 ? 50 : passiveRate > 0.1 ? 25 : 5;
    scores.passiveVoice = passiveScore;
    details.passiveVoice = {
      label: 'Passive Voice',
      value: passiveCount + ' instances',
      flag: passiveRate > 0.25,
      explanation: passiveRate > 0.25 ? 'High passive voice usage. AI loves passive constructions. Use active voice: "The cat ate the fish" not "The fish was eaten by the cat".' : 'Good balance of active and passive voice.'
    };

    // --- 8. Vocabulary diversity (Type-Token Ratio) ---
    const words = text.toLowerCase().match(/\b[a-z']+\b/g) || [];
    if (words.length >= 20) {
      const uniqueWords = new Set(words).size;
      const ttr = uniqueWords / words.length;
      // AI tends to have lower TTR (more repetitive)
      // but this is length-dependent, so we adjust
      const adjustedTTR = ttr * Math.sqrt(words.length / 100);
      const vocabScore = adjustedTTR < 0.4 ? 70 : adjustedTTR < 0.5 ? 50 : adjustedTTR < 0.6 ? 30 : 10;
      scores.vocabulary = vocabScore;
      details.vocabulary = {
        label: 'Vocabulary Diversity',
        value: (ttr * 100).toFixed(0) + '% unique',
        flag: ttr < 0.5,
        explanation: ttr < 0.5 ? 'Vocabulary is a bit repetitive. Try using more varied word choices.' : 'Good vocabulary diversity.'
      };
    }

    // --- Calculate weighted overall score ---
    const weights = {
      sentenceUniformity: 0.18,
      contractions: 0.15,
      aiPhrases: 0.22,
      sentenceStarts: 0.15,
      paragraphUniformity: 0.08,
      personalPronouns: 0.10,
      passiveVoice: 0.05,
      vocabulary: 0.07,
    };

    let totalWeight = 0;
    let weightedSum = 0;
    for (const [key, weight] of Object.entries(weights)) {
      if (scores[key] !== undefined) {
        weightedSum += scores[key] * weight;
        totalWeight += weight;
      }
    }

    const finalScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

    // Build feedback
    const flagged = Object.entries(details).filter(([, d]) => d.flag).map(([, d]) => d.explanation);
    const passed = Object.entries(details).filter(([, d]) => !d.flag).map(([, d]) => d.explanation);

    let overallFeedback;
    if (finalScore >= 70) {
      overallFeedback = '🔴 This reads very much like AI-generated text. You need to significantly rework it — change sentence structures, add your personality, use contractions, and remove AI buzzwords.';
    } else if (finalScore >= 50) {
      overallFeedback = '🟡 Getting there, but still has some AI fingerprints. Focus on the flagged areas below to push it past the threshold.';
    } else if (finalScore >= 30) {
      overallFeedback = '🟢 Looking much more human! A few tweaks and it\'ll be undetectable.';
    } else {
      overallFeedback = '✅ This reads like natural human writing. Great job!';
    }

    return {
      score: finalScore,
      details,
      flagged,
      passed,
      feedback: overallFeedback,
      wordCount: wordCount,
      sentenceCount: sentences.length,
    };
  },

  // --- Helper: split text into sentences ---
  _getSentences(text) {
    // Simple sentence splitter
    return text
      .replace(/\n/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .filter(s => s.trim().length > 10);
  }
};
