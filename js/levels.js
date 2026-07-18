/* ========================================
   AI Quest — Level & Challenge Data
   All content for 8 levels of challenges
   ======================================== */

const RANKS = [
  { title: 'AI Novice', minXP: 0 },
  { title: 'Prompt Padawan', minXP: 300 },
  { title: 'Tool Wielder', minXP: 700 },
  { title: 'AI Adept', minXP: 1200 },
  { title: 'Digital Alchemist', minXP: 1800 },
  { title: 'AI Master', minXP: 2500 },
  { title: 'Legendary', minXP: 3500 },
];

const LEVELS = [
  // =============================================
  // LEVEL 1 — AI Foundations
  // =============================================
  {
    id: 1,
    title: 'AI Foundations',
    subtitle: 'Understand what AI actually is and how it works',
    icon: '🧠',
    color: '#8b5cf6',
    challenges: [
      {
        id: '1-1',
        title: 'How AI Actually Works',
        type: 'quiz',
        description: 'Test your understanding of what LLMs are, how they work, and what they can\'t do.',
        instructions: 'Answer all questions. You need at least 7 correct to pass.',
        passingScore: 7,
        xp: 100,
        scoring: { oneStar: 7, twoStars: 9, threeStars: 10 },
        questions: [
          {
            question: 'What does LLM stand for?',
            options: ['Large Learning Machine', 'Large Language Model', 'Linguistic Logic Module', 'Long Language Memory'],
            correctIndex: 1,
            explanation: 'LLM = Large Language Model. It\'s "Large" because it was trained on massive amounts of text, and "Language Model" because its core job is modeling how language works.'
          },
          {
            question: 'What is the ONE thing an LLM actually does at its core?',
            options: ['Searches the internet for answers', 'Predicts the most likely next word', 'Thinks about your question logically', 'Copies from a database of answers'],
            correctIndex: 1,
            explanation: 'At its core, an LLM is a next-word prediction machine. It predicts, word by word, what text should come next — trained on enormous amounts of text from the internet.'
          },
          {
            question: 'Why do AI models sometimes "hallucinate" (make things up)?',
            options: ['Because they\'re broken', 'Because they run out of memory', 'Because they prioritise plausible-sounding text over factual accuracy', 'Because they get confused by hard questions'],
            correctIndex: 2,
            explanation: 'Hallucination happens because the model is optimising for "what text sounds most plausible here" — not "is this factually true." It generates text that *looks* right even if the content is invented.'
          },
          {
            question: 'What is a "knowledge cutoff"?',
            options: ['When the AI runs out of words', 'The date after which the AI has no training data', 'A limit on how long your prompt can be', 'When the AI stops being accurate'],
            correctIndex: 1,
            explanation: 'A knowledge cutoff is the date beyond which the model hasn\'t been trained. If trained up to January 2025, it genuinely doesn\'t know about events after that date.'
          },
          {
            question: 'What is a "prompt"?',
            options: ['The AI\'s response', 'A type of AI model', 'The input/message you give to the AI', 'The AI\'s source code'],
            correctIndex: 2,
            explanation: 'A prompt is simply what you type into the AI — your message, your question, your instructions. The quality of your prompt directly determines the quality of the AI\'s output.'
          },
          {
            question: 'What is a "token" in AI?',
            options: ['A unit of currency to pay for AI', 'A security password', 'A unit of text — roughly a word or part of a word', 'A type of AI model'],
            correctIndex: 2,
            explanation: 'A token is the unit AI models process text in. It\'s roughly one word, but common words might be one token while longer words get split into multiple tokens. Models have token limits.'
          },
          {
            question: 'Does ChatGPT search the internet in real-time when you ask it something?',
            options: ['Yes, always', 'No, never', 'Only when browsing mode is enabled', 'Only for recent events'],
            correctIndex: 2,
            explanation: 'By default, ChatGPT does NOT search the internet — it generates responses from its training data. It CAN search the web when Browse mode is turned on, but that\'s a separate feature.'
          },
          {
            question: 'What is a "context window"?',
            options: ['The screen where you see AI responses', 'How much text the model can "hold in mind" during a conversation', 'The settings panel', 'The AI\'s memory across different conversations'],
            correctIndex: 1,
            explanation: 'The context window is the total amount of text (tokens) the AI can process at once — your messages + its responses. Once the conversation exceeds this, it starts "forgetting" earlier parts.'
          },
          {
            question: 'Which tool is BEST for research with cited sources?',
            options: ['ChatGPT', 'Claude', 'Perplexity', 'Google Gemini'],
            correctIndex: 2,
            explanation: 'Perplexity is specifically designed as a research tool — it searches the internet in real-time and provides answers with linked sources, so you can verify the information.'
          },
          {
            question: 'If ChatGPT gives you a confident, detailed answer about a historical date, should you trust it?',
            options: ['Yes — if it\'s confident, it\'s correct', 'No — always verify factual claims independently', 'Yes — but only for history, not science', 'Only if you asked nicely'],
            correctIndex: 1,
            explanation: 'AI is ALWAYS confident in its tone — even when wrong. The confident tone is a product of how it was trained (human writing online tends to be confident). Always verify important facts.'
          }
        ]
      },
      {
        id: '1-2',
        title: 'Spot the Hallucination',
        type: 'quiz',
        description: 'AI can make up facts with complete confidence. Can you spot what\'s real and what\'s fabricated?',
        instructions: 'For each AI-generated paragraph, identify which claim is likely hallucinated (made up). Think critically!',
        passingScore: 4,
        xp: 120,
        scoring: { oneStar: 4, twoStars: 5, threeStars: 6 },
        questions: [
          {
            question: 'An AI wrote: "The Great Wall of China is the only man-made structure visible from space with the naked eye. It spans over 13,000 miles." — What\'s hallucinated?',
            options: ['The length (13,000 miles) is made up', 'The "visible from space" claim is a myth', 'Both claims are hallucinated', 'Neither — both are true'],
            correctIndex: 1,
            explanation: 'The Great Wall is NOT visible from space with the naked eye — this is a well-known myth that AI often repeats because it appears so frequently in training data. The length is roughly accurate.'
          },
          {
            question: 'An AI wrote: "Albert Einstein failed mathematics in school and was considered a poor student by his teachers." — What\'s hallucinated?',
            options: ['Einstein was actually great at math', 'Einstein didn\'t go to school', 'This is completely true', 'Einstein was homeschooled'],
            correctIndex: 0,
            explanation: 'This is a famous myth. Einstein excelled at mathematics from a young age. He may have struggled with some non-math subjects and clashed with rigid teaching styles, but he never failed math.'
          },
          {
            question: 'An AI listed a research paper: "Smith, J. (2019). The Effects of Social Media on Teenage Sleep Patterns. Journal of Adolescent Health, 45(3), 112-128." — What should concern you?',
            options: ['The year seems wrong', 'The author name is suspicious', 'The entire citation could be fabricated — always verify', 'Journal names are never fake'],
            correctIndex: 2,
            explanation: 'AI frequently fabricates entire citations — real-sounding titles, plausible author names, legitimate-looking journal names and page numbers — that simply don\'t exist. ALWAYS look up citations to verify.'
          },
          {
            question: 'An AI wrote: "Goldfish have a memory span of only 3 seconds, making them one of the most forgetful animals on Earth." — Is this accurate?',
            options: ['Yes, this is scientifically proven', 'No — goldfish can remember things for months', 'Partially true — it\'s 10 seconds, not 3', 'We don\'t actually know'],
            correctIndex: 1,
            explanation: 'The "3-second goldfish memory" is completely false. Studies have shown goldfish can remember things for months — they can learn tricks, navigate mazes, and recognise their owners. AI repeats this myth because it\'s everywhere online.'
          },
          {
            question: 'An AI wrote: "Humans only use 10% of their brain, which is why we haven\'t unlocked our full potential yet." — What\'s wrong here?',
            options: ['The percentage should be 15%', 'This is a common myth — we use virtually all of our brain', 'Only geniuses use more than 10%', 'Nothing — this is correct'],
            correctIndex: 1,
            explanation: 'The "10% of the brain" claim is one of the most persistent neuroscience myths. Brain imaging shows that virtually all areas of the brain have a function, and we use far more than 10% even during simple tasks.'
          },
          {
            question: 'An AI recommended a book: "I highly recommend \'The Silent Algorithm\' by Dr. Maya Patel (2022), which explores how AI bias affects hiring practices." Why should you be careful?',
            options: ['The topic isn\'t real', 'AI never recommends good books', 'The book, author, or both might be completely fabricated', 'Books about AI are always unreliable'],
            correctIndex: 2,
            explanation: 'AI can generate extremely convincing book recommendations where the title, author, and description sound completely real — but the book doesn\'t actually exist. Always search for the book before citing or buying it.'
          }
        ]
      },
      {
        id: '1-3',
        title: 'Pick the Right Tool',
        type: 'matching',
        description: 'Different AI tools excel at different things. Match each scenario to the best tool for the job.',
        instructions: 'Click a scenario on the left, then click the matching tool on the right. Get 6+ correct to pass.',
        passingScore: 6,
        xp: 100,
        scoring: { oneStar: 6, twoStars: 7, threeStars: 8 },
        pairs: [
          { left: 'You need to research a recent event with cited sources', right: 'Perplexity' },
          { left: 'You want the most human-sounding, nuanced essay', right: 'Claude' },
          { left: 'You need to summarise a YouTube video', right: 'Google Gemini' },
          { left: 'You want to generate images from text', right: 'DALL-E / ChatGPT' },
          { left: 'You need help debugging code', right: 'ChatGPT' },
          { left: 'You want to study from your own PDF textbook', right: 'NotebookLM' },
          { left: 'You need AI-generated presentations', right: 'Gamma / Canva' },
          { left: 'You want to chat with an AI character', right: 'Character.ai' }
        ]
      }
    ]
  },

  // =============================================
  // LEVEL 2 — Prompt Engineering
  // =============================================
  {
    id: 2,
    title: 'Prompt Engineering',
    subtitle: 'The #1 skill — learn to talk to AI properly',
    icon: '✍️',
    color: '#3b82f6',
    challenges: [
      {
        id: '2-1',
        title: 'The Art of the Prompt',
        type: 'tutorial',
        description: 'Learn the techniques that separate good AI users from great ones. Based on official guides from Anthropic (Claude) and OpenAI (ChatGPT).',
        xp: 80,
        sections: [
          {
            title: 'Why Prompting Matters',
            content: `<p>Here's the truth: <strong>the quality of what AI gives you is almost entirely determined by how you ask.</strong></p>
<p>A bad prompt gets a generic, bland answer. A good prompt gets a genuinely great one. This isn't an opinion — it's how the technology works. The AI is predicting what text should come after YOUR text. So if your text is vague, the prediction is vague. If your text is specific and detailed, the prediction is specific and detailed.</p>
<p>This is the single most valuable skill you'll learn in this entire course. Master this, and every AI tool becomes 10x more useful.</p>`
          },
          {
            title: 'The Universal Formula',
            content: `<p>Every great prompt has these building blocks:</p>
<div class="tip-box"><strong>ROLE + TASK + CONTEXT + FORMAT + CONSTRAINTS</strong></div>
<ul>
<li><strong>Role</strong> — Who should the AI be? "You are a patient biology tutor"</li>
<li><strong>Task</strong> — What exactly should it do? "Explain how photosynthesis works"</li>
<li><strong>Context</strong> — What background does it need? "I'm a 9th grader studying for a test"</li>
<li><strong>Format</strong> — How should the answer look? "Use 5 numbered steps with simple language"</li>
<li><strong>Constraints</strong> — What are the limits? "Keep it under 200 words, include one analogy"</li>
</ul>
<p>You don't always need ALL five — but the more you include, the better your results.</p>`
          },
          {
            title: 'Bad vs. Good Prompts — See the Difference',
            content: `<div class="example-compare">
<div class="example-box bad">
<div class="example-label">❌ Bad Prompt</div>
<div class="example-text">"Explain photosynthesis"</div>
</div>
<div class="example-box good">
<div class="example-label">✅ Good Prompt</div>
<div class="example-text">"I'm a 14-year-old who just started biology. Explain photosynthesis using a cooking analogy, in under 150 words, then give me 3 questions I can ask myself to check if I understood it."</div>
</div>
</div>
<div class="example-compare">
<div class="example-box bad">
<div class="example-label">❌ Bad Prompt</div>
<div class="example-text">"Is my essay good?"</div>
</div>
<div class="example-box good">
<div class="example-label">✅ Good Prompt</div>
<div class="example-text">"Act as a constructive English teacher. Read my essay below. Give me 3 specific things I did well and 3 things I can improve. For each improvement, show me how to rewrite that sentence better."</div>
</div>
</div>
<p>Notice the pattern? The good prompts tell the AI <em>who</em> to be, <em>what</em> to do, <em>who</em> it's talking to, and <em>how</em> to format the answer.</p>`
          },
          {
            title: '5 Golden Rules of Prompting',
            content: `<p>These come directly from the official guides published by Anthropic (who make Claude) and OpenAI (who make ChatGPT):</p>
<ul>
<li>🎯 <strong>Be Specific</strong> — Vague prompts = vague answers. "Write about dogs" will always be worse than "Write a 200-word essay about why Golden Retrievers make the best family pets, aimed at a family considering their first dog"</li>
<li>📋 <strong>Show, Don't Tell</strong> — Give examples of what you want. Instead of saying "write in a casual tone," show an example of casual writing and say "match this tone"</li>
<li>🧩 <strong>Break It Down</strong> — Big tasks work better as smaller steps. Don't ask "Write my entire essay." Ask it to outline first, then write section by section</li>
<li>🔄 <strong>Iterate</strong> — Your first prompt is a rough draft. Read the output, identify what's wrong, and refine your prompt. Ask "How can I improve this prompt?" — the AI will help!</li>
<li>✅ <strong>Say What You Want, Not What You Don't</strong> — "Write in a formal tone" works better than "Don't be casual." AI handles positive instructions better than negative ones</li>
</ul>`
          },
          {
            title: 'Power Techniques',
            content: `<p><strong>Role Prompting</strong> — Give the AI a persona. "You are a strict debate coach — poke holes in my argument" gets much sharper feedback than just "what do you think of this?"</p>
<p><strong>Chain of Thought</strong> — For math, logic, or analysis, add "Think through this step-by-step before giving your answer." This dramatically reduces wrong answers.</p>
<p><strong>Few-Shot Examples</strong> — Show 1-3 examples of the input/output pattern you want. This is the single most powerful technique for consistent results.</p>
<div class="tip-box success"><strong>Pro Tip:</strong> After getting a response, try asking: "How confident are you in that answer?" or "What might be wrong with this?" — AI will suddenly become much more nuanced and honest about its limitations.</div>`
          }
        ]
      },
      {
        id: '2-2',
        title: 'The Prompt Upgrade',
        type: 'prompt-challenge',
        description: 'Take terrible prompts and transform them into great ones. Then test them on any AI and paste the results.',
        instructions: 'For each bad prompt shown, write an improved version using the formula you just learned (Role + Task + Context + Format + Constraints). Then open ChatGPT or Claude, use your improved prompt, and paste the AI\'s response below.',
        xp: 150,
        scoring: { oneStar: 2, twoStars: 3, threeStars: 4 },
        tasks: [
          {
            badPrompt: 'Help me with my history homework',
            goal: 'Get specific, high-quality help on a history topic',
            requiredElements: ['role', 'specific topic', 'format', 'audience level'],
            hints: ['Give the AI a role (e.g., "patient history tutor")', 'Specify which topic and what kind of help', 'Say what grade level / how complex the language should be', 'Ask for a specific format (bullet points, timeline, etc.)']
          },
          {
            badPrompt: 'Write me a story',
            goal: 'Get a creative, specific short story',
            requiredElements: ['genre/theme', 'character details', 'length constraint', 'style/tone'],
            hints: ['Specify genre (sci-fi, mystery, romance, etc.)', 'Describe the main character (age, personality, situation)', 'Set a word/paragraph limit', 'Define the tone (funny, dark, suspenseful, heartwarming)']
          },
          {
            badPrompt: 'Explain climate change',
            goal: 'Get a clear, tailored explanation',
            requiredElements: ['audience level', 'specific aspect', 'format', 'constraints'],
            hints: ['Say who the explanation is for (age, knowledge level)', 'Pick ONE aspect (causes, effects, solutions — not everything)', 'Ask for analogies or examples', 'Set a length limit']
          },
          {
            badPrompt: 'Make me a study plan',
            goal: 'Get a practical, actionable study plan',
            requiredElements: ['subjects', 'time frame', 'study style', 'format'],
            hints: ['List your actual subjects and which ones are hardest', 'Specify how much time you have (hours per day, days until exam)', 'Mention your study preferences (visual, practice questions, etc.)', 'Ask for a day-by-day or hour-by-hour breakdown']
          }
        ]
      },
      {
        id: '2-3',
        title: 'Constraint Master',
        type: 'prompt-challenge',
        description: 'Write prompts that hit EXACT constraints. The output must match specific requirements — no wiggle room.',
        instructions: 'For each task, write a prompt that makes the AI produce output matching ALL the constraints listed. Copy your prompt and the AI output below.',
        xp: 150,
        scoring: { oneStar: 2, twoStars: 3, threeStars: 3 },
        tasks: [
          {
            badPrompt: null,
            goal: 'Make the AI explain gravity to a 5-year-old',
            requiredElements: ['under 80 words', 'uses an analogy', 'no scientific jargon', 'ends with a question for the child'],
            hints: ['Set the audience explicitly: "explain to a 5-year-old"', 'Request a specific analogy', 'Say "use no words a 5-year-old wouldn\'t know"', 'Tell it to end with an engaging question']
          },
          {
            badPrompt: null,
            goal: 'Get exactly 5 bullet points about why sleep matters for students',
            requiredElements: ['exactly 5 bullets', 'each bullet is one sentence', 'includes at least one statistic', 'written in a motivating tone'],
            hints: ['Specify "exactly 5 bullet points — no more, no less"', 'Add "each bullet must be a single sentence"', 'Ask it to "include at least one real statistic"', 'Set the tone: "motivating, like a coach talking to an athlete"']
          },
          {
            badPrompt: null,
            goal: 'Create a comparison table of 3 AI tools',
            requiredElements: ['table format', 'exactly 3 tools', 'at least 4 comparison criteria', 'include a "best for" row'],
            hints: ['Ask for a "markdown table" or "comparison table"', 'Name the 3 tools you want compared', 'List the criteria: features, price, best use case, limitations', 'Add a final row: "Best for: [use case]"']
          }
        ]
      }
    ]
  },

  // =============================================
  // LEVEL 3 — Essay Alchemy (Humanization)
  // =============================================
  {
    id: 3,
    title: 'Essay Alchemy',
    subtitle: 'Make AI text pass as human writing',
    icon: '🧪',
    color: '#06b6d4',
    challenges: [
      {
        id: '3-1',
        title: 'What Makes Text "Sound AI"',
        type: 'tutorial',
        description: 'Learn to recognise the telltale signs of AI-generated text — and how to fix them.',
        xp: 80,
        sections: [
          {
            title: 'The AI Writing Fingerprint',
            content: `<p>AI text has patterns — invisible to most people, but obvious once you know what to look for. These are the fingerprints that AI detectors (and smart teachers) pick up on:</p>`
          },
          {
            title: '1. Robot Sentences — All the Same Length',
            content: `<p>AI writes sentences that are eerily uniform in length. Humans don't do this. Real writing has short punchy sentences. Then longer ones that meander and take their time getting to the point. Then a quick one. See?</p>
<div class="example-compare">
<div class="example-box bad">
<div class="example-label">🤖 AI Pattern</div>
<div class="example-text">"Climate change affects many ecosystems around the world. Rising temperatures cause glaciers to melt at unprecedented rates. This leads to rising sea levels that threaten coastal communities. Scientists have been studying these patterns for several decades."</div>
</div>
<div class="example-box good">
<div class="example-label">👤 Human Pattern</div>
<div class="example-text">"Climate change is wrecking ecosystems everywhere. And the scary part? Glaciers are melting faster than anyone predicted — we're talking unprecedented rates. Coastal cities are literally at risk of flooding. Scientists have known about this for decades, but somehow it still feels like news."</div>
</div>
</div>
<p><strong>Fix:</strong> Mix short sentences with long ones. Throw in a fragment. Start with "And" or "But." Real people write messy.</p>`
          },
          {
            title: '2. No Contractions',
            content: `<p>AI almost never uses contractions. It writes "it is" instead of "it's", "do not" instead of "don't", "cannot" instead of "can't." Humans use contractions constantly in everything except the most formal academic writing.</p>
<div class="tip-box"><strong>Quick test:</strong> If you read your text and it sounds like a Wikipedia article, it's probably too formal. Add contractions.</div>`
          },
          {
            title: '3. AI Buzzwords',
            content: `<p>These phrases are almost exclusively used by AI. If you see them, flag them immediately:</p>
<ul>
<li>"It is important to note that..."</li>
<li>"Furthermore" / "Moreover" / "Additionally"</li>
<li>"In today's digital age..."</li>
<li>"delve" / "tapestry" / "landscape"</li>
<li>"plays a crucial role"</li>
<li>"cannot be overstated"</li>
<li>"multifaceted" / "nuanced" / "holistic"</li>
<li>"In conclusion..."</li>
<li>"This underscores the importance of..."</li>
</ul>
<p><strong>Fix:</strong> Replace every one of these with how you'd actually say it in conversation. "Furthermore" → "Also" or "On top of that." "It is important to note" → just say the thing directly.</p>`
          },
          {
            title: '4. No Personal Voice',
            content: `<p>AI writes in third person and avoids opinions. It says "one might argue" instead of "I think." It never says "honestly" or "personally" or "in my experience." Real essays — especially for school — benefit from personal voice.</p>
<p><strong>Fix:</strong> Add "I think," "honestly," "what surprised me was," — sprinkle in your actual perspective.</p>`
          },
          {
            title: '5. Perfect Structure, No Surprises',
            content: `<p>AI loves: intro paragraph → 3 body paragraphs → conclusion. Each paragraph roughly the same length. Each starting with a topic sentence. It's textbook-perfect and that's exactly the problem — no human writes that perfectly.</p>
<p><strong>Fix:</strong> Vary your paragraph lengths. Have one that's just two sentences. Let another run longer. Break the "5 paragraph essay" mould occasionally.</p>`
          }
        ]
      },
      {
        id: '3-2',
        title: 'Humanise This — Easy',
        type: 'text-analysis',
        description: 'Take this AI-generated paragraph and rewrite it until it passes as human text.',
        instructions: 'The paragraph below was written by AI. Your job: rewrite it so it scores below 40% on the AI detector. Use contractions, vary sentence lengths, add personality, and kill the buzzwords.',
        sourceText: 'Artificial intelligence has revolutionised numerous aspects of modern society. It is important to note that AI technologies have transformed how we communicate, work, and learn. Furthermore, the integration of AI into educational settings has enabled personalised learning experiences that were previously impossible. Students can now leverage AI-powered tools to enhance their understanding of complex subjects. However, it is crucial to recognise that AI should complement human intelligence rather than replace it. In conclusion, the responsible adoption of AI in education holds immense potential for creating more effective and engaging learning environments.',
        topic: null,
        minWords: 60,
        maxAiScore: 40,
        xp: 150,
        scoring: { oneStar: 40, twoStars: 30, threeStars: 20 },
      },
      {
        id: '3-3',
        title: 'Humanise This — Hard',
        type: 'text-analysis',
        description: 'Write an essay on the given topic. You CAN use AI to help, but the final version must pass as human.',
        instructions: 'Write a ~200 word essay about: "Should students be allowed to use AI for homework?" You can use ChatGPT/Claude to draft it, but you MUST rework it until the AI detector score drops below 25%. This is the real skill — using AI as a starting point, then making it yours.',
        sourceText: null,
        topic: 'Should students be allowed to use AI for homework?',
        minWords: 150,
        maxAiScore: 25,
        xp: 200,
        scoring: { oneStar: 25, twoStars: 18, threeStars: 12 },
      }
    ]
  },

  // =============================================
  // LEVEL 4 — Visual AI
  // =============================================
  {
    id: 4,
    title: 'Visual AI',
    subtitle: 'Master the art of image prompting',
    icon: '🎨',
    color: '#ec4899',
    challenges: [
      {
        id: '4-1',
        title: 'The Image Prompt Formula',
        type: 'tutorial',
        description: 'Learn to write image prompts like a pro — structure, keywords, and techniques from the experts.',
        xp: 80,
        sections: [
          {
            title: 'Think Like a Director',
            content: `<p>When you prompt an image AI, think of yourself as a movie director giving instructions to a camera crew. You need to describe what you <strong>see</strong>, not what you <strong>feel</strong>.</p>
<p>"A sad picture" tells the AI nothing. "A lone figure sitting on a rain-soaked park bench at dusk, warm streetlight reflecting in puddles, cinematic lighting" — that's direction.</p>`
          },
          {
            title: 'The Building Blocks Formula',
            content: `<div class="tip-box"><strong>[Subject] + [Action/Context] + [Style] + [Lighting] + [Composition] + [Colors]</strong></div>
<p>You don't need ALL of these every time, but the more you include, the more control you have:</p>
<ul>
<li><strong>Subject</strong> — What's in the picture? Be specific. "A fluffy golden retriever puppy" not "a dog"</li>
<li><strong>Action/Context</strong> — What's happening or where? "sitting on a red park bench in autumn"</li>
<li><strong>Style/Medium</strong> — How should it look? photorealistic, oil painting, watercolor, anime, pixel art, Studio Ghibli style</li>
<li><strong>Lighting</strong> — This changes EVERYTHING. golden hour, dramatic backlighting, neon glow, soft studio light, moody</li>
<li><strong>Composition</strong> — Camera angle: wide shot, close-up portrait, bird's-eye view, macro, bokeh (blurry background)</li>
<li><strong>Color Palette</strong> — warm tones, cool blues, pastel, vibrant, monochrome, high contrast</li>
</ul>`
          },
          {
            title: 'Bad vs. Good Image Prompts',
            content: `<div class="example-compare">
<div class="example-box bad">
<div class="example-label">❌ Bad Prompt</div>
<div class="example-text">"A picture of space"</div>
</div>
<div class="example-box good">
<div class="example-label">✅ Good Prompt</div>
<div class="example-text">"A photorealistic wide-angle shot of an astronaut floating above Earth, the curve of the planet glowing blue below, stars scattered across deep black sky, cinematic lighting, NASA photography style, ultra-detailed"</div>
</div>
</div>
<div class="example-compare">
<div class="example-box bad">
<div class="example-label">❌ Bad Prompt</div>
<div class="example-text">"Make a cool Instagram picture"</div>
</div>
<div class="example-box good">
<div class="example-label">✅ Good Prompt</div>
<div class="example-text">"A flat-lay photograph of a cozy study setup: open notebook, colorful highlighters, a cup of hot cocoa with marshmallows, fairy lights in the background, warm soft lighting, pastel aesthetic, top-down view, Instagram lifestyle photography style"</div>
</div>
</div>`
          },
          {
            title: 'Power Keywords Cheat Sheet',
            content: `<p><strong>Lighting:</strong> cinematic, golden hour, rim lighting, softbox, neon glow, dramatic shadows, backlit, volumetric lighting</p>
<p><strong>Camera:</strong> 50mm lens, macro, wide-angle, depth of field, bokeh, DSLR, bird's-eye view, close-up portrait</p>
<p><strong>Style:</strong> oil painting, watercolor, 3D render, pixel art, anime, Studio Ghibli, Art Nouveau, minimalist, cyberpunk, impressionist</p>
<p><strong>Mood:</strong> dreamy, ethereal, dark and moody, vibrant, serene, whimsical, nostalgic, futuristic</p>
<p><strong>Quality:</strong> 8K, ultra-detailed, sharp focus, highly detailed, professional photography</p>
<div class="tip-box success"><strong>Pro Tip:</strong> Say what you WANT, not what you don't want. "No cars" might actually make cars appear. Say "empty street" instead.</div>`
          }
        ]
      },
      {
        id: '4-2',
        title: 'Prompt Architect',
        type: 'self-assessment',
        description: 'Build three image prompts from scratch, generate the images, and evaluate them against a rubric.',
        instructions: 'For each brief below, write a detailed image prompt using the formula you learned. Generate the image using any AI image tool (ChatGPT/DALL-E, Ideogram, or another). Then check off each rubric item honestly.',
        toolsNeeded: ['ChatGPT (DALL-E)', 'Ideogram', 'Any image AI'],
        xp: 150,
        scoring: { oneStar: 6, twoStars: 8, threeStars: 10 },
        tasks: [
          {
            brief: 'Create a poster-style image for a school science fair about space exploration.',
            rubric: [
              { criterion: 'Prompt includes a specific subject', description: 'Not just "space" — specific objects like astronauts, planets, rockets, etc.' },
              { criterion: 'Prompt specifies a style/medium', description: 'Photorealistic, digital art, vintage poster, etc.' },
              { criterion: 'Prompt includes lighting or mood', description: 'Cinematic, dramatic, ethereal, etc.' },
              { criterion: 'Generated image matches the brief', description: 'It actually looks like a science fair poster, not just a random space image' },
            ]
          },
          {
            brief: 'Create a cozy, aesthetic study setup photo for Instagram.',
            rubric: [
              { criterion: 'Prompt lists specific objects', description: 'Books, notebooks, coffee, fairy lights, etc. — not just "study stuff"' },
              { criterion: 'Prompt specifies composition', description: 'Top-down, close-up, etc. — you controlled the camera angle' },
              { criterion: 'Prompt includes color palette', description: 'Warm tones, pastels, etc.' },
              { criterion: 'The image looks Instagram-worthy', description: 'Would you actually post this? Be honest.' },
            ]
          },
          {
            brief: 'Create a character portrait in an anime/illustration style — any character you imagine.',
            rubric: [
              { criterion: 'Prompt describes the character in detail', description: 'Age, hair, clothing, expression, etc.' },
              { criterion: 'Prompt specifies an art style', description: 'Anime, manga, Studio Ghibli, digital illustration, etc.' },
              { criterion: 'The generated character looks intentional', description: 'It looks like you designed them, not like random AI output' },
            ]
          }
        ],
        hints: [
          'Use the formula: Subject + Context + Style + Lighting + Composition + Colors',
          'Refer back to the keyword cheat sheet in the tutorial',
          'If the first generation isn\'t right, refine your prompt — don\'t start over'
        ]
      }
    ]
  },

  // =============================================
  // LEVEL 5 — Research Lab
  // =============================================
  {
    id: 5,
    title: 'Research Lab',
    subtitle: 'AI-powered research with real sources',
    icon: '🔬',
    color: '#10b981',
    challenges: [
      {
        id: '5-1',
        title: 'Why Perplexity Wins at Research',
        type: 'tutorial',
        description: 'Understand why Perplexity is fundamentally different from ChatGPT for research — and when to use which.',
        xp: 80,
        sections: [
          {
            title: 'The Core Difference',
            content: `<p>When you ask ChatGPT a factual question, it generates an answer from its training data — text it read months or years ago. It does NOT look anything up. It predicts what a good answer would <em>look like</em>.</p>
<p>When you ask Perplexity the same question, it actually <strong>searches the internet in real time</strong>, reads the pages it finds, and then summarises them — with links to every source.</p>
<p>That's not a small difference. That's the difference between "this sounds right" and "here's where I got this from — check for yourself."</p>`
          },
          {
            title: 'When to Use What',
            content: `<ul>
<li><strong>Use ChatGPT/Claude</strong> when you need: creative writing, brainstorming, explaining concepts, coding help, rewriting text, having a conversation. These are tasks where "plausible" is good enough.</li>
<li><strong>Use Perplexity</strong> when you need: current facts, statistics, recent events, sourced information, anything you'd need to cite in a school project. These are tasks where "accurate and verifiable" matters.</li>
</ul>
<div class="tip-box warning"><strong>Real example:</strong> Ask ChatGPT "What's the current population of Tokyo?" and it'll give you a confident number — from its training data, which might be 2 years old. Ask Perplexity the same question and it'll search for the latest data and tell you exactly where it got the number from.</div>`
          },
          {
            title: 'Perplexity Power Features',
            content: `<ul>
<li><strong>Citations</strong> — Every claim links to its source. Click to verify.</li>
<li><strong>Follow-up questions</strong> — It suggests related questions to dig deeper.</li>
<li><strong>Focus modes</strong> — Search all sources, or limit to academic papers, Reddit discussions, YouTube, etc.</li>
<li><strong>Collections</strong> — Save and organise your research.</li>
</ul>
<div class="tip-box success"><strong>Pro Tip:</strong> Use Perplexity's "Academic" focus mode for school research projects. It prioritises peer-reviewed papers and academic sources — instant credibility upgrade for your bibliography.</div>`
          }
        ]
      },
      {
        id: '5-2',
        title: 'Source Hunt',
        type: 'self-assessment',
        description: 'Research real questions using Perplexity and compile sourced answers.',
        instructions: 'Open Perplexity (perplexity.ai) and research EACH of the questions below. For each one, write a 2-3 sentence answer WITH at least 2 source URLs. Paste your answers in the text box, then check off the rubric items.',
        toolsNeeded: ['Perplexity'],
        xp: 150,
        scoring: { oneStar: 4, twoStars: 5, threeStars: 6 },
        tasks: [
          {
            brief: 'Answer ALL of these questions using Perplexity. Paste your sourced answers below.',
            rubric: [
              { criterion: 'Q1: "What is the most widely spoken language in the world by total speakers?" — answered with source', description: 'Include the answer AND at least one URL source from Perplexity' },
              { criterion: 'Q2: "How much of the ocean has been explored?" — answered with source', description: 'Include a sourced statistic, not a guess' },
              { criterion: 'Q3: "What was the latest major AI announcement this month?" — answered with source', description: 'This tests current information — ChatGPT can\'t do this, but Perplexity can' },
              { criterion: 'Each answer includes at least 2 source URLs', description: 'Not just the answer — the actual links where Perplexity got it from' },
              { criterion: 'Answers are in your own words, not copy-pasted', description: 'Summarise what Perplexity found, don\'t just paste its output' },
              { criterion: 'You used Perplexity (not ChatGPT) for all answers', description: 'The whole point is using the right tool for the job' },
            ]
          }
        ],
        hints: [
          'Go to perplexity.ai and type each question',
          'Click on the source numbers [1], [2] etc. to see where the info came from',
          'For current events, try the "Last 24 hours" or "Last week" time filter',
          'Try the Academic focus mode for the ocean exploration question'
        ]
      },
      {
        id: '5-3',
        title: 'Fact-Check Faceoff',
        type: 'quiz',
        description: 'AI-generated text is riddled with plausible-sounding false claims. Use your research skills to identify which "facts" are actually wrong.',
        instructions: 'Each question shows an AI-generated "fact." Your job: determine if it\'s true or false. Use Perplexity to verify if you\'re unsure!',
        passingScore: 5,
        xp: 130,
        scoring: { oneStar: 5, twoStars: 6, threeStars: 7 },
        questions: [
          {
            question: 'AI says: "The Eiffel Tower grows about 6 inches taller in summer due to thermal expansion of the iron."',
            options: ['True — thermal expansion is real and affects metal structures', 'False — the Eiffel Tower is a fixed height year-round', 'Partially true — it grows but only about 1 inch', 'False — it actually shrinks in summer'],
            correctIndex: 0,
            explanation: 'This one is actually TRUE! Metal expands when heated. The Eiffel Tower can grow about 6 inches (15 cm) in hot weather due to thermal expansion of its iron structure.'
          },
          {
            question: 'AI says: "Bananas are radioactive because they contain potassium-40, and eating 10 million bananas at once would cause radiation poisoning."',
            options: ['Completely false — bananas aren\'t radioactive', 'True — bananas are slightly radioactive, but the body regulates potassium', 'The first part is true, but 10 million bananas is an exaggeration', 'Bananas contain uranium, not potassium-40'],
            correctIndex: 1,
            explanation: 'Bananas ARE slightly radioactive due to potassium-40. However, your body regulates potassium levels — it excretes excess potassium as fast as you absorb it, so you can\'t actually get radiation poisoning from bananas regardless of quantity.'
          },
          {
            question: 'AI says: "Napoleon Bonaparte was extremely short, standing only 5\'2\" tall."',
            options: ['True — this is well-documented', 'False — he was average height for his era (about 5\'7\")', 'True — but 5\'2\" was average height back then', 'Partially true — he was 5\'4\"'],
            correctIndex: 1,
            explanation: 'Napoleon was approximately 5\'7\" (170 cm) — average or slightly above average for a Frenchman of his era. The "short Napoleon" myth came from British propaganda and confusion between French and English measurement systems.'
          },
          {
            question: 'AI says: "Octopuses have three hearts and blue blood."',
            options: ['Completely fabricated', 'True — this is accurate', 'Only the three hearts part is true', 'Only the blue blood part is true'],
            correctIndex: 1,
            explanation: 'This is entirely TRUE! Octopuses have three hearts (two pump blood to the gills, one pumps it to the body) and their blood is blue because it uses copper-based hemocyanin instead of iron-based hemoglobin.'
          },
          {
            question: 'AI says: "The Amazon Rainforest produces 20% of the world\'s oxygen, which is why it\'s called \'the lungs of the Earth.\'"',
            options: ['True — this is an established scientific fact', 'Misleading — it produces ~6% and consumes almost as much as it produces', 'False — oceans produce all the world\'s oxygen', 'True — it actually produces even more than 20%'],
            correctIndex: 1,
            explanation: 'This is misleading. While the Amazon produces a lot of oxygen through photosynthesis, it also consumes nearly the same amount through decomposition and respiration. Ocean phytoplankton produces the majority of Earth\'s oxygen. The "20%" figure is widely repeated but not supported by science.'
          },
          {
            question: 'AI says: "Glass is technically a liquid that flows very slowly, which is why old cathedral windows are thicker at the bottom."',
            options: ['True — glass is a supercooled liquid', 'False — glass is an amorphous solid, and old windows are uneven due to manufacturing', 'Partially true — glass flows but it takes millions of years', 'True — you can measure the flow rate'],
            correctIndex: 1,
            explanation: 'This is a persistent MYTH. Glass is an amorphous solid, not a liquid. Old cathedral windows are uneven because of how glass was manufactured in medieval times (crown glass method produced sheets of uneven thickness), NOT because glass "flowed" over centuries.'
          },
          {
            question: 'AI says: "Dogs can only see in black and white."',
            options: ['True — dogs have no colour vision', 'False — dogs see in a limited colour range (blues and yellows)', 'True — all animals except primates are colour-blind', 'Partially true — they see in grayscale with slight colour hints'],
            correctIndex: 1,
            explanation: 'Dogs do NOT see in black and white! They have dichromatic vision (two types of colour receptors), meaning they can see blues and yellows but have difficulty distinguishing reds and greens. It\'s a limited colour palette, not grayscale.'
          }
        ]
      }
    ]
  },

  // =============================================
  // LEVEL 6 — Content Creator
  // =============================================
  {
    id: 6,
    title: 'Content Creator',
    subtitle: 'Build real content with AI tools',
    icon: '🎬',
    color: '#f59e0b',
    challenges: [
      {
        id: '6-1',
        title: 'The PPT Workflow',
        type: 'tutorial',
        description: 'Learn the exact step-by-step workflow for creating a professional presentation using AI tools.',
        xp: 80,
        sections: [
          {
            title: 'The 4-Step AI Presentation Workflow',
            content: `<p>Making a PPT from scratch is painful. Here's the workflow that makes it fast AND good:</p>
<div class="tip-box"><strong>Step 1: Content → Step 2: Structure → Step 3: Visuals → Step 4: Polish</strong></div>`
          },
          {
            title: 'Step 1: Generate Content (ChatGPT/Claude)',
            content: `<p>Use this exact prompt template:</p>
<div class="example-box good">
<div class="example-label">✅ Content Prompt</div>
<div class="example-text">"I need to create a presentation about [TOPIC] for [AUDIENCE]. It should be [NUMBER] slides long. For each slide, give me: 1) A slide title 2) 3-4 bullet points (keep each under 10 words) 3) A speaker note explaining the key message. The tone should be [professional/casual/engaging]."</div>
</div>
<p><strong>Why this works:</strong> You're not asking the AI to make the PPT — you're asking it to do the hard part (structuring content into slide-sized chunks). The bullet point word limit forces it to be concise.</p>`
          },
          {
            title: 'Step 2: Build the Structure (Gamma / Canva)',
            content: `<p><strong>Option A: Gamma (gamma.app)</strong> — Paste your content and Gamma auto-generates a beautiful presentation. It's the fastest option.</p>
<p><strong>Option B: Canva</strong> — Use a Canva presentation template and drop your content into it. More customisable but more manual work.</p>
<p><strong>Option C: Google Slides / PowerPoint</strong> — If you prefer traditional tools, just use the AI-generated content as your outline.</p>`
          },
          {
            title: 'Step 3: Visuals (Image AI)',
            content: `<p>For each slide that needs an image:</p>
<ul>
<li>Write an image prompt using the formula from Level 4</li>
<li>Generate it with DALL-E, Ideogram, or Canva's built-in AI</li>
<li>Use consistent style keywords across all slides so the presentation looks cohesive</li>
</ul>
<div class="tip-box success"><strong>Pro Tip:</strong> Pick ONE style for all images in a presentation. If slide 1 has a photorealistic image and slide 2 has pixel art, it looks amateur. Consistency = professional.</div>`
          },
          {
            title: 'Step 4: Polish',
            content: `<ul>
<li>Check every slide follows the "6x6 rule" — max 6 bullet points, max 6 words each</li>
<li>Remove any AI buzzwords from your text</li>
<li>Make sure fonts, colours, and image styles are consistent</li>
<li>Add slide transitions (subtle ones — no spinning cubes)</li>
<li>Read through speaker notes to make sure they sound like YOU, not AI</li>
</ul>`
          }
        ]
      },
      {
        id: '6-2',
        title: 'Build a Presentation',
        type: 'self-assessment',
        description: 'Create a complete presentation using the AI workflow — from content generation to final polish.',
        instructions: 'Pick any topic you\'re interested in (school subject, hobby, anything). Follow the 4-step workflow to create a 6-8 slide presentation using AI tools. Check off each step as you complete it.',
        toolsNeeded: ['ChatGPT or Claude', 'Gamma or Canva', 'Any image AI'],
        xp: 200,
        scoring: { oneStar: 5, twoStars: 7, threeStars: 9 },
        tasks: [
          {
            brief: 'Create a 6-8 slide presentation on a topic of your choice using the 4-step AI workflow.',
            rubric: [
              { criterion: 'Step 1: Used AI to generate slide content', description: 'Used ChatGPT/Claude with a specific prompt to get titles, bullets, and speaker notes' },
              { criterion: 'Step 1: Content prompt included role, audience, and format', description: 'Your prompt to the AI was detailed, not just "make me a PPT about X"' },
              { criterion: 'Step 2: Built slides using Gamma, Canva, or Slides', description: 'Actually created the presentation in a tool, not just text in a document' },
              { criterion: 'Step 3: At least 2 slides have AI-generated images', description: 'Used image AI to create custom visuals, not just stock photos' },
              { criterion: 'Step 3: All images use a consistent style', description: 'Same artistic style across slides — not a mishmash of photorealistic, cartoon, and watercolor' },
              { criterion: 'Step 4: Bullets follow the 6x6 rule', description: 'Max 6 points per slide, each under ~6 words. Concise, not paragraphs' },
              { criterion: 'Step 4: No AI buzzwords in the text', description: 'No "furthermore," "it is important to note," "in conclusion" — sounds human' },
              { criterion: 'Step 4: Fonts and colours are consistent throughout', description: 'Professional, polished look — not a different style on every slide' },
              { criterion: 'You can explain every slide in your own words', description: 'You actually understand the content, not just pasted AI output' },
            ]
          }
        ],
        hints: [
          'Start with ChatGPT: "I need a [number]-slide presentation about [topic] for [audience]. For each slide give me: title, 3-4 bullet points (under 10 words each), and a speaker note."',
          'For Gamma: just paste your outline and let it generate the design',
          'For images: use one consistent style keyword like "flat illustration" or "minimalist icon" across all prompts',
          'Read the final PPT out loud — if any slide sounds like AI wrote it, rewrite those bullets in your own words'
        ]
      },
      {
        id: '6-3',
        title: 'Multi-Tool Campaign',
        type: 'self-assessment',
        description: 'Create a mini brand campaign using MULTIPLE AI tools together — this is where everything clicks.',
        instructions: 'Create a mini "brand" for anything: a fictional café, your study group, a fan page, a fictional product. Use at least 3 different AI tools to create: a name/tagline, a logo or key visual, and 2 social media posts.',
        toolsNeeded: ['ChatGPT or Claude', 'Canva AI', 'Any image AI', 'CapCut (optional)'],
        xp: 200,
        scoring: { oneStar: 4, twoStars: 6, threeStars: 7 },
        tasks: [
          {
            brief: 'Build a complete mini brand using at least 3 AI tools.',
            rubric: [
              { criterion: 'Created a brand name and tagline using AI', description: 'Used ChatGPT/Claude to brainstorm and refine a name + tagline' },
              { criterion: 'Generated a logo or key visual', description: 'Used image AI to create a logo, banner, or brand image' },
              { criterion: 'Created at least 2 social media post designs', description: 'Used Canva AI to design Instagram/social posts for your brand' },
              { criterion: 'Used at least 3 different AI tools', description: 'Combined multiple tools — not just one tool for everything' },
              { criterion: 'All pieces look like they belong together', description: 'Consistent colours, style, and vibe across everything — it looks like a real brand' },
              { criterion: 'Wrote captions/copy for the posts using AI', description: 'AI-generated text refined for social media — not generic' },
              { criterion: 'You could explain your brand to someone', description: 'You know what it is, who it\'s for, and why the choices you made work' },
            ]
          }
        ],
        hints: [
          'Start with ChatGPT: "I want to create a brand for [concept]. Give me 5 name ideas with taglines, and suggest a colour palette and vibe."',
          'Pick the name/vibe you like, then go to image AI for the logo: "A minimalist logo for [brand name], [style], [colours]"',
          'Use Canva AI: pick a social media template, drop in your logo and image, use Magic Write for captions',
          'Keep the same 2-3 colours throughout EVERYTHING — that\'s what makes it look professional'
        ]
      }
    ]
  },

  // =============================================
  // LEVEL 7 — AI Detective
  // =============================================
  {
    id: 7,
    title: 'AI Detective',
    subtitle: 'Spot AI content & understand AI ethics',
    icon: '🔍',
    color: '#ef4444',
    challenges: [
      {
        id: '7-1',
        title: 'Real or AI?',
        type: 'quiz',
        description: 'Can you tell the difference between human-written and AI-generated text? Test your detection skills.',
        instructions: 'For each text sample, decide: was it written by a human or by AI? Look for the patterns you learned in the Essay Alchemy level.',
        passingScore: 6,
        xp: 130,
        scoring: { oneStar: 6, twoStars: 7, threeStars: 8 },
        questions: [
          {
            question: '"The impact of social media on mental health cannot be overstated. In today\'s digital age, platforms such as Instagram and TikTok have fundamentally transformed how young people perceive themselves. Furthermore, the constant exposure to curated content has led to increased rates of anxiety and depression among adolescents."',
            options: ['Written by a human', 'Written by AI'],
            correctIndex: 1,
            explanation: 'AI tells: "cannot be overstated," "In today\'s digital age," "Furthermore," "fundamentally transformed" — all classic AI phrases. Uniform sentence length. No personal voice or contractions.'
          },
          {
            question: '"I think social media is honestly kind of messing with our heads. Like, I scroll through Instagram and everyone looks perfect — perfect skin, perfect life, perfect everything. And I know it\'s fake but it still gets to me sometimes? Idk, it\'s complicated."',
            options: ['Written by a human', 'Written by AI'],
            correctIndex: 0,
            explanation: 'Human tells: contractions (I\'m, it\'s, idk), informal tone, question marks for uncertainty, personal pronouns (I, me), slang, varied sentence lengths, genuine vulnerability.'
          },
          {
            question: '"Sleep deprivation is a significant concern for students. Research indicates that insufficient sleep can impair cognitive function, reduce academic performance, and compromise immune system effectiveness. It is essential for students to prioritise adequate rest to maintain optimal health and academic outcomes."',
            options: ['Written by a human', 'Written by AI'],
            correctIndex: 1,
            explanation: 'AI tells: no contractions ("It is essential" not "It\'s essential"), generic phrasing, "It is essential," "optimal health and academic outcomes" — corporate-sounding. Perfectly structured. No personality.'
          },
          {
            question: '"Look, I barely got 4 hours of sleep last night and I can already tell today is going to be rough. My brain feels like it\'s running on dial-up. Every study says you need 8 hours but honestly who actually gets that during exam season? Not me."',
            options: ['Written by a human', 'Written by AI'],
            correctIndex: 0,
            explanation: 'Human tells: personal experience ("I barely got 4 hours"), metaphor (brain on dial-up), contractions, rhetorical question, self-deprecating humour. Varied sentence types.'
          },
          {
            question: '"Artificial intelligence has emerged as a transformative force across various industries. The integration of machine learning algorithms into healthcare, finance, and education sectors has yielded substantial improvements in efficiency and accuracy. As we navigate this technological paradigm shift, it is crucial to consider the ethical implications."',
            options: ['Written by a human', 'Written by AI'],
            correctIndex: 1,
            explanation: 'Classic AI: "transformative force," "various industries," "yielded substantial improvements," "navigate this technological paradigm shift," "it is crucial to consider." Zero personality. Perfect 3-sentence paragraph.'
          },
          {
            question: '"My grandmother makes the best biryani in the world and I will die on that hill. She\'s been making it the same way since before my mom was born — no measurements, no recipe, just vibes and decades of practice. I\'ve tried to write down the recipe like five times and it never turns out the same."',
            options: ['Written by a human', 'Written by AI'],
            correctIndex: 0,
            explanation: 'Unmistakably human: "I will die on that hill" (personality), specific family detail, "just vibes," contractions, humor, genuine frustration about the recipe. AI wouldn\'t write this.'
          },
          {
            question: '"The culinary traditions of South Asian cuisine represent a rich tapestry of flavours, techniques, and cultural significance. The preparation of dishes such as biryani involves meticulous attention to spice combinations and cooking methods that have been refined over generations. These time-honoured practices serve as a testament to the region\'s culinary heritage."',
            options: ['Written by a human', 'Written by AI'],
            correctIndex: 1,
            explanation: 'Maximum AI: "rich tapestry," "meticulous attention," "refined over generations," "time-honoured practices," "serve as a testament," "culinary heritage." It reads like a Wikipedia article about food, not someone who actually cooks.'
          },
          {
            question: '"Climate change is real and it\'s happening faster than we thought. The latest IPCC report came out and honestly the numbers are scary. But here\'s what bugs me — we\'ve had the data for years and the people in charge keep kicking the can down the road. At some point someone has to actually DO something."',
            options: ['Written by a human', 'Written by AI'],
            correctIndex: 0,
            explanation: 'Human: contractions, opinion ("what bugs me"), frustration ("keep kicking the can"), emphasis with caps ("DO something"), conversational structure, emotional response to data.'
          }
        ]
      },
      {
        id: '7-2',
        title: 'Ethics & Awareness',
        type: 'quiz',
        description: 'AI raises real ethical questions about deepfakes, bias, privacy, and responsibility. Where do you stand?',
        instructions: 'For each scenario, choose the most thoughtful response. There are no trick questions — this is about understanding the real-world implications of AI.',
        passingScore: 5,
        xp: 130,
        scoring: { oneStar: 5, twoStars: 6, threeStars: 7 },
        questions: [
          {
            question: 'Your friend shows you a video of a celebrity saying something outrageous. It looks completely real. What should you assume?',
            options: ['It must be real — videos don\'t lie', 'It could be a deepfake — verify before sharing', 'All celebrity videos are fake', 'If it\'s on social media, it\'s been fact-checked'],
            correctIndex: 1,
            explanation: 'Deepfake technology can now create extremely convincing fake videos. The default stance should always be: verify before sharing, especially for anything dramatic or outrageous. Check if credible news sources are reporting it.'
          },
          {
            question: 'You use AI to write your entire school essay and submit it as your own work. Is this ethical?',
            options: ['Yes — AI is just a tool, like a calculator', 'No — you\'re submitting work that isn\'t yours and claiming it is', 'Yes — as long as the teacher doesn\'t know', 'It depends on the school\'s policy'],
            correctIndex: 3,
            explanation: 'This is nuanced. Many schools now have specific AI policies. Using AI to brainstorm, outline, or check grammar is usually fine. Submitting AI-generated text as your own without disclosure typically violates academic integrity policies. The key is: what does YOUR school say?'
          },
          {
            question: 'An AI hiring tool consistently rates resumes with traditionally male names higher than female names. What\'s happening?',
            options: ['The AI is sexist on purpose', 'The AI learned bias from its training data', 'The AI is working correctly — men are better workers', 'This can\'t happen with modern AI'],
            correctIndex: 1,
            explanation: 'AI learns patterns from data. If historical hiring data was biased (e.g., a company historically hired more men), the AI will learn and reproduce that bias. The AI isn\'t "sexist" — it\'s reflecting biased data. This is a real problem Amazon discovered with their AI hiring tool.'
          },
          {
            question: 'Someone uses AI to generate a realistic fake image of a classmate in an embarrassing situation and shares it. What is this?',
            options: ['Just a joke — it\'s not a real photo', 'Digital harassment / cyberbullying with potential legal consequences', 'Creative expression protected by free speech', 'Only a problem if the classmate sees it'],
            correctIndex: 1,
            explanation: 'Creating and sharing fake images of real people without consent — especially embarrassing or harmful ones — can constitute cyberbullying and is illegal in many places. "It\'s just AI" is not a defense. The impact on the victim is real regardless of how the image was made.'
          },
          {
            question: 'You notice an AI chatbot consistently gives better, more detailed answers when asked about Western history compared to Asian or African history. Why might this be?',
            options: ['Western history is more important', 'There\'s more English-language training data about Western history', 'AI only knows about the West', 'The AI is programmed to prefer Western topics'],
            correctIndex: 1,
            explanation: 'AI models are trained primarily on English-language internet text, which overrepresents Western perspectives, history, and culture. This means AI tends to be more detailed and accurate about topics well-covered in English. It\'s a data representation problem, not intentional bias.'
          },
          {
            question: 'A company trains an AI on millions of artists\' work without their permission, then sells the AI\'s output. Is this fair?',
            options: ['Yes — AI is learning, just like human artists learn from others', 'No — artists\' work was used without consent or compensation', 'Yes — you can\'t copyright a style', 'It\'s complicated — this is an unresolved legal and ethical debate'],
            correctIndex: 3,
            explanation: 'This is genuinely one of the most heated debates in AI right now. Courts in multiple countries are still deciding. Some argue it\'s fair use (like how humans learn from existing art), others argue it\'s mass copyright infringement. There\'s no settled answer yet.'
          },
          {
            question: 'Your school wants to use AI to monitor student behavior and flag "concerning" patterns. What\'s the main concern?',
            options: ['AI monitoring is always accurate', 'Privacy — constant surveillance affects student wellbeing and trust', 'There are no concerns if it keeps students safe', 'Students should have nothing to hide'],
            correctIndex: 1,
            explanation: 'AI surveillance in schools raises serious privacy and trust concerns. Students behave differently when they know they\'re being watched. False positives can unfairly target students. And "concerning patterns" can be subjective — who defines what\'s concerning?'
          }
        ]
      }
    ]
  },

  // =============================================
  // LEVEL 8 — Boss Level (Final Project)
  // =============================================
  {
    id: 8,
    title: 'Boss Level',
    subtitle: 'Your final project — use everything you\'ve learned',
    icon: '🏆',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)',
    challenges: [
      {
        id: '8-1',
        title: 'Choose Your Project',
        type: 'self-assessment',
        description: 'Pick a final project that uses everything you\'ve learned. This is YOUR creation.',
        instructions: 'Choose ONE of the project templates below (or propose your own). Check off the planning items when you\'ve decided.',
        toolsNeeded: ['All the tools you\'ve learned!'],
        xp: 100,
        scoring: { oneStar: 3, twoStars: 4, threeStars: 5 },
        tasks: [
          {
            brief: 'Choose your project and plan it out. Here are the templates:\n\n🎬 **K-Drama / Movie Pitch** — Create a complete fictional show pitch: title, logline, 5+ character descriptions, season 1 plot outline, AI-generated character portraits, a poster, and an OST (soundtrack) concept.\n\n📱 **Personal Brand** — Build YOUR personal brand: logo, colour scheme, social media profile designs, 4+ content posts, a bio written with AI, and a content calendar.\n\n📚 **Study System** — Build a complete AI-powered study system for your hardest subject: NotebookLM setup, custom study prompts, a revision schedule, AI-generated flashcard content, and a presentation explaining your system.\n\n🎮 **Fan Magazine** — Create a digital mini-magazine (4-6 pages) about something you love: AI-generated articles, images, layout in Canva, a cover design, and proper sourced research.',
            rubric: [
              { criterion: 'Chose a project template (or proposed your own)', description: 'Picked one of the four options or came up with your own idea' },
              { criterion: 'Listed which AI tools you\'ll use for each part', description: 'E.g., "ChatGPT for character descriptions, DALL-E for portraits, Canva for poster"' },
              { criterion: 'Created a rough timeline', description: 'How many sessions will each part take? What\'s first?' },
              { criterion: 'Know what the final deliverable looks like', description: 'Can describe what you\'ll present at the end' },
              { criterion: 'Excited about it (be honest!)', description: 'If you\'re not excited, pick a different template' },
            ]
          }
        ],
        hints: [
          '🎬 K-Drama Pitch Plan: Session 1 — title + characters (ChatGPT). Session 2 — character portraits (image AI). Session 3 — plot outline + OST concept (ChatGPT + research). Session 4 — poster design (Canva + image AI). Session 5 — presentation assembly (Gamma/Canva).',
          '📱 Personal Brand Plan: Session 1 — name + identity brainstorm (ChatGPT). Session 2 — logo + colour palette (image AI + Canva). Session 3 — content posts (Canva AI). Session 4 — bio + content calendar (ChatGPT). Session 5 — assemble everything into a portfolio.',
          '📚 Study System Plan: Session 1 — choose subject + upload to NotebookLM. Session 2 — create custom study prompts (ChatGPT). Session 3 — generate flashcards + schedule. Session 4 — build a presentation about your system (Gamma). Session 5 — test it on real studying.',
          '🎮 Fan Magazine Plan: Session 1 — plan the magazine (topics, layout). Session 2 — write articles (ChatGPT + Perplexity for facts). Session 3 — generate images (image AI). Session 4 — layout in Canva. Session 5 — polish + cover design.'
        ]
      },
      {
        id: '8-2',
        title: 'Build It',
        type: 'self-assessment',
        description: 'Execute your project plan across multiple sessions. Track your progress here.',
        instructions: 'Work through your project step by step. Check off each milestone as you complete it. This challenge stays open across multiple classes.',
        toolsNeeded: ['All tools from your plan'],
        xp: 300,
        scoring: { oneStar: 5, twoStars: 7, threeStars: 9 },
        tasks: [
          {
            brief: 'Build your project. Check off milestones as you complete them.',
            rubric: [
              { criterion: 'Generated all text content using AI', description: 'Descriptions, scripts, articles, captions — whatever your project needs' },
              { criterion: 'Humanised all AI text', description: 'Nothing reads like raw AI output — you\'ve reworked it' },
              { criterion: 'Created at least 3 AI-generated images', description: 'Using detailed prompts with the formula you learned' },
              { criterion: 'Used at least 3 different AI tools', description: 'Demonstrated breadth of tool knowledge' },
              { criterion: 'Researched any facts with Perplexity', description: 'Any claims or stats are sourced, not hallucinated' },
              { criterion: 'Created a visual presentation (PPT or similar)', description: 'Following the PPT workflow from Level 6' },
              { criterion: 'All visual elements have consistent style', description: 'Same colour scheme, art style, fonts throughout' },
              { criterion: 'Prompts were detailed and specific throughout', description: 'You applied prompt engineering skills from Level 2' },
              { criterion: 'You can explain every design choice', description: 'Why this name? Why this style? Why these tools? You made intentional choices.' },
            ]
          }
        ],
        hints: [
          'Don\'t try to do everything in one session — this is meant to span 3-5 classes',
          'If you get stuck on any part, go back to the relevant Level for a refresher',
          'Keep ALL your prompts in a document — you\'ll need them for the presentation',
          'Ask your teacher for feedback at each milestone, not just at the end'
        ]
      },
      {
        id: '8-3',
        title: 'Present It',
        type: 'self-assessment',
        description: 'The grand finale. Present your project and show what you\'ve learned.',
        instructions: 'Prepare a presentation of your final project. You\'ll present this to your teacher (and maybe your parents!). It should showcase not just the project itself, but the process and tools you used.',
        toolsNeeded: ['Your completed project', 'Gamma or Canva for the presentation'],
        xp: 200,
        scoring: { oneStar: 3, twoStars: 5, threeStars: 6 },
        tasks: [
          {
            brief: 'Prepare and deliver your final presentation.',
            rubric: [
              { criterion: 'Presentation includes: what you made', description: 'Show the actual project — the visuals, the text, everything' },
              { criterion: 'Presentation includes: which tools you used', description: 'List every AI tool and what you used each one for' },
              { criterion: 'Presentation includes: your best prompts', description: 'Show 2-3 of your best prompts and explain why they worked' },
              { criterion: 'Presentation includes: what you learned', description: 'What surprised you? What was hardest? What skill will you keep using?' },
              { criterion: 'You can answer questions about your process', description: 'Teacher asks "why did you use X tool?" — you have a real answer' },
              { criterion: 'The presentation itself looks polished', description: 'Applied everything from Level 6 — consistent design, good structure, no AI buzzwords' },
            ]
          }
        ],
        hints: [
          'Structure: 1) Show the project, 2) Show the tools + process, 3) Show your best prompts, 4) Reflect on what you learned',
          'Include before/after examples — show a raw AI output vs. your final humanised version',
          'Practice explaining your project in 5 minutes. If you can\'t, trim it',
          'End with: "The #1 thing I learned is..." — make it personal and honest'
        ]
      }
    ]
  }
];
