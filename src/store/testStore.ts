import create from 'zustand';
import { questions } from '@/questions';

interface Answer {
  questionId: number;
  answer: string | string[];
}

interface TestState {
  currentQuestionId: number;
  answers: Answer[];
  timeRemaining: number;
  allAnswersSubmitted: boolean;
  timeExpired: boolean;
  isLastQuestion: boolean;
  answerQuestion: (answer: Answer) => void;
  nextQuestion: () => void;
  setTimeRemaining: (time: number) => void;
  setAllAnswersSubmitted: (submitted: boolean) => void;
  setTimeExpired: (expired: boolean) => void;
}

export const useTestStore = create<TestState>((set) => ({
  currentQuestionId: questions[0].id, // Начинаем с первого вопроса
  answers: [],
  timeRemaining: 30 * 60, // 30 минут на выполнение теста (в секундах)
  allAnswersSubmitted: false,
  timeExpired: false,
  isLastQuestion: false,
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
          isLastQuestion: currentQuestionIndex + 1 === questions.length - 1,
        };
      } else {
        return {
          ...state,
          allAnswersSubmitted: true,
        };
      }
    }),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  setAllAnswersSubmitted: (submitted) => set({ allAnswersSubmitted: submitted }),
  setTimeExpired: (expired) => set({ timeExpired: expired }),
}));