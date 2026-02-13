
import { Language, Translations, Level } from './types';

export const TRANSLATIONS: Record<Language, Translations> = {
  ca: {
    title: "cAIcul",
    subtitle: "Resolució de problemes amb assistència d'IA!",
    selectLevel: "Selecciona el teu curs",
    home: "Inici",
    newProblem: "Nou problema",
    statementTitle: "Enunciat del Problema",
    labelData: "Dades",
    placeholderData: "Quines dades són importants?",
    labelAnswer: "Resposta Final",
    placeholderAnswer: "Escriu la resposta aquí...",
    labelOps: "Operacions",
    placeholderOps: "Escriu els teus càlculs...",
    btnValidate: "Validar Resposta",
    validating: "Validant...",
    statsSolved: "Resolts",
    statsStreak: "Ratxa",
    feedbackCorrect: "Molt bé!",
    feedbackIncorrect: "Podem millorar",
    nextProblem: "Següent Problema →",
    tipTitle: "Consell del dia 💡",
    tipText: "Llegeix bé l'enunciat dues vegades abans de començar.",
    levels: {
      [Level.MITJA]: 'Cicle Mitjà Primària',
      [Level.SUPERIOR]: 'Cicle Superior Primària',
      [Level.ESO1]: '1r Cicle ESO',
      [Level.ESO2]: '2n Cicle ESO'
    }
  },
  es: {
    title: "cAIcul",
    subtitle: "¡Resolución de problemas con asistencia de IA!",
    selectLevel: "Selecciona tu curso",
    home: "Inicio",
    newProblem: "Nuevo problema",
    statementTitle: "Enunciado del Problema",
    labelData: "Datos",
    placeholderData: "¿Qué datos son importantes?",
    labelAnswer: "Respuesta Final",
    placeholderAnswer: "Escribe la respuesta aquí...",
    labelOps: "Operaciones",
    placeholderOps: "Escribe tus cálculos...",
    btnValidate: "Validar Respuesta",
    validating: "Validando...",
    statsSolved: "Resueltos",
    statsStreak: "Racha",
    feedbackCorrect: "¡Muy bien!",
    feedbackIncorrect: "Podemos mejorar",
    nextProblem: "Siguiente Problema →",
    tipTitle: "Consejo del día 💡",
    tipText: "Lee bien el enunciado dos veces antes de empezar.",
    levels: {
      [Level.MITJA]: 'Ciclo Medio Primaria',
      [Level.SUPERIOR]: 'Ciclo Superior Primaria',
      [Level.ESO1]: '1º Ciclo ESO',
      [Level.ESO2]: '2º Ciclo ESO'
    }
  },
  en: {
    title: "cAIcul",
    subtitle: "Problem solving with AI assistance!",
    selectLevel: "Select your grade",
    home: "Home",
    newProblem: "New problem",
    statementTitle: "Problem Statement",
    labelData: "Data",
    placeholderData: "Which data is important?",
    labelAnswer: "Final Answer",
    placeholderAnswer: "Write the answer here...",
    labelOps: "Operations",
    placeholderOps: "Write your calculations...",
    btnValidate: "Validate Answer",
    validating: "Validating...",
    statsSolved: "Solved",
    statsStreak: "Streak",
    feedbackCorrect: "Well done!",
    feedbackIncorrect: "Can be improved",
    nextProblem: "Next Problem →",
    tipTitle: "Tip of the day 💡",
    tipText: "Read the statement carefully twice before starting.",
    levels: {
      [Level.MITJA]: '3rd-4th grade',
      [Level.SUPERIOR]: '5th-6th grade',
      [Level.ESO1]: 'Middle School 1',
      [Level.ESO2]: 'Middle School 2'
    }
  }
};
