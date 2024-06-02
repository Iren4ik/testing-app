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
  },
  {
    id: 6,
    type: 'single-choice',
    question: 'Какой из следующих языков является строго типизированным?',
    options: ['JavaScript', 'TypeScript', 'Python', 'Ruby'],
    correctAnswer: 'TypeScript'
  },
  {
    id: 7,
    type: 'multiple-choice',
    question: 'Какие из следующих технологий относятся к фронтенд-разработке?',
    options: ['React', 'Node.js', 'Angular', 'Express'],
    correctAnswer: ['React', 'Angular']
  },
  {
    id: 8,
    type: 'short-answer',
    question: 'Как называется язык разметки, используемый для создания веб-страниц?',
    correctAnswer: 'HTML'
  },
  {
    id: 9,
    type: 'long-answer',
    question: 'Опишите, какие преимущества даёт использование CSS-предпроцессоров, таких как SASS или LESS.',
    correctAnswer: '' // Длинный ответ, проверяется вручную
  },
  {
    id: 10,
    type: 'single-choice',
    question: 'Какой атрибут HTML используется для указания URL-адреса изображения?',
    options: ['src', 'href', 'alt', 'title'],
    correctAnswer: 'src'
  },
  {
    id: 11,
    type: 'single-choice',
    question: 'Какой из следующих фреймворков используется для создания мобильных приложений с использованием JavaScript?',
    options: ['React Native', 'Django', 'Laravel', 'Spring'],
    correctAnswer: 'React Native'
  },
  {
    id: 12,
    type: 'multiple-choice',
    question: 'Выберите библиотеки JavaScript, которые используются для управления состоянием приложений.',
    options: ['Redux', 'MobX', 'Vuex', 'jQuery'],
    correctAnswer: ['Redux', 'MobX', 'Vuex']
  },
  {
    id: 13,
    type: 'short-answer',
    question: 'Какой язык программирования используется для написания серверного кода на платформе Node.js?',
    correctAnswer: 'JavaScript'
  },
  {
    id: 14,
    type: 'long-answer',
    question: 'Объясните, почему важно использовать семантические теги в HTML.',
    correctAnswer: '' // Длинный ответ, проверяется вручную
  },
  {
    id: 15,
    type: 'single-choice',
    question: 'Какой метод массива JavaScript используется для создания нового массива с результатами вызова указанной функции для каждого элемента массива?',
    options: ['map', 'forEach', 'filter', 'reduce'],
    correctAnswer: 'map'
  }
];