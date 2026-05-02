export type PocOutline = {
  mode: "live" | "mock";
  learningObjectives: string[];
  sections: Array<{
    title: string;
    summary: string;
    interactionIdea?: string;
  }>;
  quizIdeas: string[];
  note?: string;
};
