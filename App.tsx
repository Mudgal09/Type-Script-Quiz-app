
import React, { useEffect, useMemo, useState } from "react";
// import QuestionCard from "@/components/QuestionCard";
// import { QUESTIONS, shuffle } from "@/data/questions";
import QuestionCard from "./components/QuestionCard";
import { QUESTIONS, shuffle } from "./data/questions";

import type { Question } from "@/types";

type View = "menu" | "quiz" | "result";

const STORAGE_KEY = "quiz-ts-best-score";

export default function App() {
  const [view, setView] = useState<View>("menu");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);

  const current = questions[index];
  const total = questions.length;

  const score = useMemo(() => {
    return Object.entries(answers).reduce((acc, [qid, choice]) => {
      const q = questions.find(x => x.id === qid);
      return acc + (q && q.answerId === choice ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  const best = useMemo(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? Number(raw) : 0;
  }, []);

  useEffect(() => {
    let id: number | undefined;
    if (running) {
      id = window.setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => { if (id) window.clearInterval(id); };
  }, [running]);

  useEffect(() => {
    if (view !== "result") return;
    const prev = localStorage.getItem(STORAGE_KEY);
    if (score > (prev ? Number(prev) : 0)) {
      localStorage.setItem(STORAGE_KEY, String(score));
    }
  }, [score, view]);

  function startQuiz() {
    const shuffled = shuffle(QUESTIONS).slice(0, 10); // up to 10 questions
    setQuestions(shuffled);
    setIndex(0);
    setAnswers({});
    setShowAnswer(false);
    setTimer(0);
    setRunning(true);
    setView("quiz");
  }

  function selectAnswer(choiceId: string) {
    if (!current) return;
    setAnswers(a => ({ ...a, [current.id]: choiceId }));
    setShowAnswer(true);
  }

  function next() {
    if (index + 1 < total) {
      setIndex(i => i + 1);
      setShowAnswer(false);
    } else {
      setRunning(false);
      setView("result");
    }
  }

  function prev() {
    if (index > 0) {
      setIndex(i => i - 1);
      setShowAnswer(true);
    }
  }

  // keyboard shortcuts
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (view !== "quiz") return;
      if (["1","2","3","4"].includes(e.key) && current) {
        const idx = Number(e.key) - 1;
        const choice = current.choices[idx];
        if (choice) selectAnswer(choice.id);
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, view]);

  return (
    <div className="container">
      <header className="card" style={{ marginBottom: 16 }}>
        <h1>TypeScript Quiz</h1>
        <p className="subtitle">Modern, accessible quiz app built with React + TypeScript.</p>
        <div className="row">
          <span className="pill">Timer: {Math.floor(timer/60)}m {timer%60}s</span>
          <span className="pill">Best Score: {best}</span>
          {view === "quiz" && <span className="pill">Current Score: {score}</span>}
        </div>
      </header>

      {view === "menu" && (
        <div className="card">
          <p>Ten random questions, instant feedback, keyboard shortcuts, and a persistent best score.</p>
          <div className="row">
            <button className="btn primary" onClick={startQuiz}>Start Quiz</button>
            <a className="btn" href="https://github.com/Mudgal09/Amazon-UI-Clone" target="_blank" rel="noreferrer">See another project</a>
          </div>
        </div>
      )}

      {view === "quiz" && current && (
        <>
          <QuestionCard
            question={current}
            index={index}
            total={total}
            selectedId={answers[current.id] ?? null}
            onSelect={selectAnswer}
            showAnswer={showAnswer}
          />
          <div className="footer">
            <div className="row">
              <button className="btn" onClick={prev} disabled={index === 0}>Back</button>
              <button className="btn" onClick={next}>{index + 1 < total ? "Next" : "Finish"}</button>
            </div>
            <div className="row">
              <span className="kbd">1..4</span>
              <span className="kbd">← →</span>
            </div>
          </div>

          {showAnswer && current.explanation && (
            <div style={{ height: 12 }} />
          )}
          {showAnswer && current.explanation && (
            <div className="card">
              <strong>Explanation:</strong> {current.explanation}
            </div>
          )}
        </>
      )}

      {view === "result" && (
        <div className="card">
          <h2>Results</h2>
          <p>You scored <strong>{score}</strong> / {total}.</p>
          <div className="row">
            <button className="btn primary" onClick={startQuiz}>Try Again</button>
            <button className="btn" onClick={() => setView("menu")}>Back to Menu</button>
          </div>

          <div style={{ height: 16 }} />
          <details>
            <summary>Review answers</summary>
            <ul>
              {questions.map((q, i) => {
                const picked = answers[q.id];
                const ok = picked === q.answerId;
                return (
                  <li key={q.id} style={{ marginTop: 8 }}>
                    <strong>Q{i+1}.</strong> {q.prompt}
                    <div> Your answer: {q.choices.find(c => c.id === picked)?.label ?? "—"} {ok ? "✅" : "❌"} </div>
                    <div> Correct: {q.choices.find(c => c.id === q.answerId)?.label}</div>
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}
