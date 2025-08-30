
# Quiz App (React + TypeScript + Vite)

A polished, accessible quiz application built with **React 18**, **TypeScript**, and **Vite**.  
Features random questions, instant feedback, keyboard shortcuts, a timer, and persistent best score.

## ✨ Features
- React + TypeScript with strict typing
- 10 random questions per run (editable)
- Instant right/wrong feedback & explanations
- Keyboard shortcuts: `1..4` to select, `←`/`→` to navigate
- Timer and best-score saved in `localStorage`
- Clean, modern UI with responsive grid answers
- Easy to extend: add more questions in `src/data/questions.ts`

## 🚀 Quick Start

```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev
# open http://localhost:5173

# 3) Build for production
npm run build
npm run preview
```

## 🗂 Project Structure
```txt
quiz-app-ts/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ styles.css
   ├─ types.ts
   ├─ data/
   │  └─ questions.ts
   └─ components/
      └─ QuestionCard.tsx
```

## 🧠 Add/Change Questions
Edit `src/data/questions.ts`. Each question looks like:
```ts
{
  id: "unique-id",
  prompt: "Question text",
  choices: [
    { id: "a", label: "Option A" },
    { id: "b", label: "Option B" },
    { id: "c", label: "Option C" },
    { id: "d", label: "Option D" },
  ],
  answerId: "b",
  explanation: "Optional explanation",
}
```

## 📦 Tech
- React 18, Vite 5, TypeScript 5
- No CSS framework; custom, accessible styles

---

**Resume blurb suggestion:**  
*Built a TypeScript + React quiz app with strict typing, accessibility (ARIA), keyboard navigation, and localStorage-based persistence. Implemented state management with hooks and modular components; bundled with Vite.*
