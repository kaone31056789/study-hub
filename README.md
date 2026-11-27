```
   _____ __            __         __  __      __
  / ___// /___  ______/ /_  __   / / / /_  __/ /_
  \__ \/ __/ / / / __  / / / /  / /_/ / / / / __ \
 ___/ / /_/ /_/ / /_/ / /_/ /  / __  / /_/ / /_/ /
/____/\__/\__,_/\__,_/\__, /  /_/ /_/\__,_/_.___/
                     /____/        学  one topic at a time
```

**Study Hub** is an ink-and-ASCII themed exam-prep app for end-semester exams. Every topic gets a plain-language explanation, a step-by-step walkthrough, a simulator, and the exact theory answer and diagram to write in the exam.

Live: **[study.kaone.in](https://study.kaone.in)** · Android: [latest release](https://github.com/kaone31056789/study-hub/releases/latest)

---

## What's inside

| | |
|---|---|
| **Learn** | Every topic as a 30-second idea, a walkthrough, an interactive simulator and the exam answer with its diagram. English, Bhai (Hinglish) and Gaali modes. |
| **Revise** | Key points per topic with a Test-me mode: points hide under a pixel field, tap to dissolve and check yourself. |
| **Cards** | Spaced-repetition flashcards (10 min → 1 → 3 → 7 → 15 days), an ASCII sketch of each answer, and a **Fix these** deck built from your quiz mistakes. |
| **Quiz & PYQ** | Random 10-question quizzes and last year's paper linked to its answers. |
| **Mock** | A full 60-mark paper on a timer. Type or photograph your answers; AI marks them against the key points, and your answer sits next to the model answer in handwriting. |
| **Formulas** | A notebook-style formula sheet with a Test-me blur. |
| **Focus** | A study timer with a brush-stroke ring, an ASCII campfire and the exam countdown. A small timer follows you to other pages. |
| **Rituals** | A daily 学 seal stamp and streak calendar, a sumi-e scroll that paints itself as you learn, and a shareable progress card. |
| **Sync** | Optional: move your progress between devices with a short code. No account. |

### Five skins, light and dark

Ink wash · Matcha · Sakura · Aizome · Kohaku. Each has its own painted scene and its own hand-drawn switch animation: a calligraphy brush repaint, a tea being whisked, a petal storm, indigo dye dripping, and amber resin full of fireflies.

## Tech

- React 19 + Vite, hash routing, `motion` for UI animation
- Canvas 2D / WebGL effects (ink drops, Type Garden, transitions), all paused or skipped with reduced motion
- [ASCII Magic](https://www.ascii-magic.com) art pieces, self-hosted in `public/ascii-magic`
- Capacitor for the Android app
- A small Node server (`server.js`) that serves the site, stores sync codes and proxies the AI (Ollama)

## Run it

```bash
npm install
npm run dev          # http://localhost:5173 (API calls proxy to the live site)
npm run build        # static build in dist/
npm start            # serve dist/ + the API with server.js
```

Server settings (environment variables):

| Variable | What it does |
|---|---|
| `PORT` | Port to listen on (default 3000) |
| `DATA_DIR` | Where sync codes are stored |
| `OLLAMA_API_KEY`, `OLLAMA_URL`, `OLLAMA_MODEL`, `OLLAMA_VISION_MODEL` | The AI model for Ask AI and mock marking |
| `ALLOWED_ORIGINS` | Origins allowed to call the API |
| `DAILY_AI_PER_IP`, `DAILY_AI_TOTAL` | Daily AI request limits |

A `Dockerfile` builds the site and runs the server with a `/data` volume.

### Android

```bash
npm run build:android                     # build + sync into android/
npm run release:android -- "What changed"  # build an APK and publish a GitHub release
```

Installed apps check GitHub releases and offer the update.

## Adding a subject

Each subject lives in `src/subjects/<id>/` (units, topics, cards, quiz questions, plan, past paper, optional formula sheet) and is registered in `src/subjects/index.js`.

## Privacy

Progress stays in your browser unless you turn on sync. No analytics, no tracking, no accounts. See the in-app [privacy policy](https://study.kaone.in/#/privacy) and [terms](https://study.kaone.in/#/terms).

## Credits

- ASCII art: [ASCII Magic](https://github.com/kailashsr38/ascii-magic-art), MIT
- UI components: [React Bits](https://reactbits.dev)
- Effects: [Sakuga VFX](https://github.com/finktheartist/sakuga-vfx), MIT; [canvas-ui](https://github.com/DavidHDev/canvas-ui)
- Fonts: Shippori Mincho, Zen Kaku Gothic New, JetBrains Mono, Kalam (Google Fonts)
