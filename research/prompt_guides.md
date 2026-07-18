# 🧠 Prompt Engineering: The Complete Guide

> A compiled research guide from three official sources, designed for a 14-year-old learning prompt engineering.
> Researched from: Anthropic (Claude), OpenAI (ChatGPT), and Image Generation best practices.

---

## Table of Contents

1. [Part 1: Anthropic's Guide (Claude)](#part-1-anthropics-prompt-engineering-guide-claude)
2. [Part 2: OpenAI's Guide (ChatGPT/GPT)](#part-2-openais-prompt-engineering-guide-chatgptgpt)
3. [Part 3: Image Prompting (DALL-E, Midjourney, Ideogram)](#part-3-image-prompting-best-practices)
4. [Quick Reference Cheat Sheet](#quick-reference-cheat-sheet)

---

## Part 1: Anthropic's Prompt Engineering Guide (Claude)

> **Source:** Anthropic's official documentation (docs.anthropic.com)
> **Key idea:** Treat your prompt like a detailed brief for a smart assistant — not a Google search.

### Key Techniques & Principles

- **Be Clear and Explicit** — Don't assume the AI will "figure out" what you mean. Say exactly what you want, including the format, length, and tone.
- **Clarity Over Brevity** — A longer, detailed prompt usually beats a short, vague one. Don't be afraid to write more!
- **Use XML Tags for Structure** — Claude is specially trained to understand XML tags like `<instructions>`, `<context>`, `<example>`, and `<input>`. These act like labeled sections in your prompt, keeping everything organized.
- **Assign a Role (Persona)** — Tell the AI *who* it should be. Example: "You are a friendly history tutor" or "You are a strict but fair essay grader."
- **Break Down Complex Tasks** — Instead of one giant request, split it into smaller steps. This guides the AI's thinking and gets better results.
- **Chain of Thought ("Think First")** — Ask the AI to think through the problem before answering.
- **Provide Reference Material** — Paste in the actual text, notes, or data you want the AI to work with.
- **Iterate and Refine** — Your first prompt is a draft, not a final version. Tweak and try again.

### Good vs. Bad Prompt Examples (Claude)

#### Example 1: Studying for a Test
| | Prompt |
|:---|:---|
| ❌ **Bad** | "Explain the French Revolution." |
| ✅ **Good** | "You are a friendly history tutor helping a 9th grader study for a test. Explain the main causes of the French Revolution in 5 bullet points. Use simple language and include one real-life analogy to make it relatable." |

#### Example 2: Getting Feedback on Writing
| | Prompt |
|:---|:---|
| ❌ **Bad** | "Is my essay good?" |
| ✅ **Good** | "Act as a constructive English teacher. Read my essay below. Give me 3 specific things I did well and 3 things I can improve. For each improvement, show me an example of how to rewrite that sentence better." |

---

## Part 2: OpenAI's Prompt Engineering Guide (ChatGPT/GPT)

> **Source:** OpenAI's official platform documentation
> **Key idea:** Be specific, use structure, and show — don't just tell.

### Key Techniques & Principles

- **Be Specific and Detailed** — Define the context, desired outcome, length, format, and tone.
- **Use Delimiters** — Use markers like `###`, `"""`, `---` to separate instructions from data.
- **Give Examples (Few-Shot)** — Show 1–3 examples of the pattern you want.
- **Chain-of-Thought** — Add "Think through this step-by-step" for math/logic.
- **Assign a Role** — "You are a patient math tutor" works better than just asking.
- **Prefer Positive Constraints** — "Use a 3-sentence summary" beats "Don't be wordy."
- **Put Instructions First** — Place main instructions before any data.

---

## Part 3: Image Prompting Best Practices

> **Key idea:** Think like a movie director — describe what you *see*, not what you *feel*.

### The Core Formula

**[Subject] + [Action/Context] + [Style/Medium] + [Lighting] + [Composition] + [Color Palette]**

### Building Blocks

| Block | Example Keywords |
|:---|:---|
| **Subject** | "a teenage girl reading a book," "a cozy coffee shop" |
| **Style/Medium** | photorealistic, oil painting, watercolor, anime, pixel art |
| **Lighting** | golden hour, cinematic, neon glow, soft natural light |
| **Composition** | wide shot, close-up, bird's-eye view, macro, bokeh |
| **Color Palette** | warm tones, pastel, monochrome, vibrant |
| **Quality** | 8K, ultra-detailed, sharp focus, professional photography |

### Good vs. Bad Examples

| | Prompt |
|:---|:---|
| ❌ **Bad** | "A picture of space" |
| ✅ **Good** | "A photorealistic wide-angle shot of an astronaut floating above Earth, stars across deep black sky, cinematic lighting, NASA photography style, 8K, ultra-detailed" |

---

## Quick Reference Cheat Sheet

### The Universal Formula
```
ROLE + TASK + CONTEXT + FORMAT + CONSTRAINTS
```

### 5 Golden Rules
1. 🎯 **Be Specific** — Vague prompts = vague answers
2. 📋 **Show, Don't Tell** — Give examples
3. 🧩 **Break It Down** — Big tasks → smaller steps
4. 🔄 **Iterate** — First prompt is a rough draft
5. ✅ **Say What You Want** — Not what you don't want
