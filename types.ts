
export enum Level {
  MITJA = 'MITJA',
  SUPERIOR = 'SUPERIOR',
  ESO1 = 'ESO1',
  ESO2 = 'ESO2'
}

export type Language = 'ca' | 'es' | 'en';
export type Theme = 'light' | 'dark';

export interface Problem {
  id: string;
  level: Level;
  enunciat: string;
  solucioIdeal: string;
}

export interface ValidationResult {
  isCorrect: boolean;
  feedbackText: string;
  points: {
    dades: string;
    operacions: string;
    resposta: string;
  };
}

export interface UserStats {
  correctCount: number;
  streak: number;
}

export interface Translations {
  title: string;
  subtitle: string;
  selectLevel: string;
  home: string;
  newProblem: string;
  statementTitle: string;
  labelData: string;
  placeholderData: string;
  labelAnswer: string;
  placeholderAnswer: string;
  labelOps: string;
  placeholderOps: string;
  btnValidate: string;
  validating: string;
  statsSolved: string;
  statsStreak: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  nextProblem: string;
  tipTitle: string;
  tipText: string;
  levels: Record<Level, string>;
}
