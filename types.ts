
export type Choice = { id: string; label: string; };
export type Question = {
  id: string;
  prompt: string;
  choices: Choice[];
  answerId: string;
  explanation?: string;
};
