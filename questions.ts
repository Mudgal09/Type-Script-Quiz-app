
import type { Question } from "@/types";

// You can freely edit/extend this list. IDs must be unique.
export const QUESTIONS: Question[] = [
  {
    id: "ts-types",
    prompt: "Which TypeScript type allows a variable to be one of several specified types?",
    choices: [
      { id: "a", label: "Intersection type" },
      { id: "b", label: "Union type" },
      { id: "c", label: "Mapped type" },
      { id: "d", label: "Literal type" },
    ],
    answerId: "b",
    explanation: "Union types (e.g., string | number) allow multiple possible types."
  },
  {
    id: "ts-enum",
    prompt: "What does the 'as const' assertion do for literal objects/arrays?",
    choices: [
      { id: "a", label: "Converts them to classes" },
      { id: "b", label: "Narrows all values to their literal types and makes them readonly" },
      { id: "c", label: "Turns them into enums" },
      { id: "d", label: "Disables type checking" }
    ],
    answerId: "b",
    explanation: "'as const' creates immutable, literal-typed structures."
  },
  {
    id: "ts-generic",
    prompt: "Which keyword introduces a generic parameter list in TypeScript?",
    choices: [
      { id: "a", label: "<T>" },
      { id: "b", label: "generic()" },
      { id: "c", label: "template<>" },
      { id: "d", label: "type<T>" }
    ],
    answerId: "a",
    explanation: "Generics use angle brackets, for example: function id<T>(x: T): T { return x; }"
  },
  {
    id: "ts-narrow",
    prompt: "Which is a Type Guard that narrows a union at runtime?",
    choices: [
      { id: "a", label: "value!" },
      { id: "b", label: "typeof value === 'string'" },
      { id: "c", label: "as string" },
      { id: "d", label: "<string>value" }
    ],
    answerId: "b",
    explanation: "Runtime checks like typeof/instanceof narrow unions."
  },
  {
    id: "web-fetch",
    prompt: "fetch() returns which of the following?",
    choices: [
      { id: "a", label: "A Response wrapped in a Promise" },
      { id: "b", label: "A JSON object" },
      { id: "c", label: "A string" },
      { id: "d", label: "A synchronous Response" }
    ],
    answerId: "a",
    explanation: "fetch returns Promise<Response>; you then call response.json() etc."
  }
];

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
