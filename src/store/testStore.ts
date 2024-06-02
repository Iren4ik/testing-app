import create from 'zustand';
import { questions } from '../questions';

interface Answer {
  questionId: number;
  answer: string | string[];
}

interface TestState {
  currentQuestionId: number;
  answers: Answer[];
  timeRemaining: number;
  answerQuestion: (answer: Answer) => void;
  nextQuestion: () => void;
  setTimeRemaining: (time: number) => void;
}

export const useTestStore = create<TestState>((set) => ({
  currentQuestionId: questions[0].id, // Начинаем с первого вопроса
  answers: [],
  timeRemaining: 1800, // 30 минут на выполнение теста
  answerQuestion: (answer: Answer) =>
    set((state) => {
      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.questionId === answer.questionId,
      );

      if (existingAnswerIndex >= 0) {
        return {
          ...state,
          answers: [
            ...state.answers.slice(0, existingAnswerIndex),
            answer,
            ...state.answers.slice(existingAnswerIndex + 1),
          ],
        };
      } else {
        return {
          ...state,
          answers: [...state.answers, answer],
        };
      }
    }),
  nextQuestion: () =>
    set((state) => {
      const currentQuestionIndex = questions.findIndex(question => question.id === state.currentQuestionId);
      if (currentQuestionIndex < questions.length - 1) {
        return {
          ...state,
          currentQuestionId: questions[currentQuestionIndex + 1].id,
        };
      } else {
        return state; // Return the current state if there are no more questions
      }
    }),
    
  setTimeRemaining: (time) => set({ timeRemaining: time }),
}));

