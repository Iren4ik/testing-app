export interface Question {
  id: number;
  type: string;
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
}

export const questions: Question[] = [
  {
    id: 1,
    type: 'single-choice',
    question: 'Что должен знать фронтенд-разработчик? Назовите три ключевых технологии.',
    options: ['HTML, CSS и JavaScript', 'Kotlin, PHP и JavaScript', 'PHP, HTML и CSS'],
    correctAnswer: 'HTML, CSS и JavaScript'
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: 'Выберите языки программирования, используемые для веб-разработки.',
    options: ['JavaScript', 'Python', 'Ruby', 'Java'],
    correctAnswer: ['JavaScript', 'Python']
  },
  {
    id: 3,
    type: 'short-answer',
    question: 'Какой язык программирования используется для стилизации веб-страниц?',
    correctAnswer: 'CSS'
  },
  {
    id: 4,
    type: 'long-answer',
    question: 'Объясните, почему важен серверный рендеринг для SEO.',
    correctAnswer: '' // Длинный ответ, проверяется вручную
  },
  {
    id: 5,
    type: 'single-choice',
    question: 'Какой метод используется для добавления элементов в конец массива в JavaScript?',
    options: ['push', 'pop', 'shift', 'unshift'],
    correctAnswer: 'push'
  }
];
