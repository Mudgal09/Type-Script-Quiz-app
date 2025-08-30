
import React from "react";
import type { Question } from "@/types";

type Props = {
  question: Question;
  index: number;
  total: number;
  selectedId: string | null;
  onSelect: (choiceId: string) => void;
  showAnswer: boolean;
};

const srOnly = { position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", borderWidth: 0 } as const;

export default function QuestionCard({ question, index, total, selectedId, onSelect, showAnswer }: Props) {
  const percent = Math.round(((index + 1) / total) * 100);

  return (
    <div className="card" role="group" aria-labelledby={`q-${question.id}`}>
      <div className="progress" aria-hidden="true"><span style={{ width: `${percent}%` }} /></div>
      <div style={{ height: 8 }} />
      <p className="pill" aria-live="polite">Question {index + 1} / {total}</p>
      <h2 id={`q-${question.id}`} style={{ marginTop: 8, marginBottom: 14 }}>{question.prompt}</h2>

      <div className="grid answers" role="listbox" aria-label="Answer choices">
        {question.choices.map(ch => {
          const isSelected = selectedId === ch.id;
          const isCorrect = showAnswer && ch.id === question.answerId;
          const isWrong = showAnswer && isSelected && ch.id !== question.answerId;

          return (
            <button
              key={ch.id}
              className="btn"
              style={{
                justifySelf: "stretch",
                textAlign: "left",
                lineHeight: 1.4,
                outline: isSelected ? "2px solid var(--accent)" : "none",
                background: isCorrect ? "linear-gradient(90deg, #2ecc71, #27ae60)"
                         : isWrong ? "linear-gradient(90deg, #e74c3c, #c0392b)"
                         : undefined
              }}
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelect(ch.id)}
            >
              <span style={srOnly}>{isSelected ? "Selected:" : ""}</span>
              {ch.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
