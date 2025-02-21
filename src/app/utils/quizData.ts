// utils/quizData.ts

export interface Question {
    question: string;
    options: string[];
    correctAnswer: string | number;
  }
  
  export const sampleQuiz: Question[] = [
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correctAnswer: "Mercury",
    },
    {
      question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correctAnswer: "Queue",
    },
    {
      question: "Which of the following is primarily used for structuring web pages?",
      options: ["Python", "java", "HTML", "C++"],
      correctAnswer: "HTML",
    },
    {
      question: "Which chemical symbol stands for Gold?",
      options: ["Au", "Gd", "Ag", "Pt"],
      correctAnswer: "Ag",
    },
    {
      question: "Which of these processes is not typically involved in refining petroleum?",
      options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
      correctAnswer: "Filtration",
    },
    {
      question: "What is the value of 12 + 28?",
      options: [""],
      correctAnswer: "40",
    },
    {
      question: "How many states are there in the United States?",
      options: [""],
      correctAnswer: "50",
    },
    {
      question: "In which year was the Declaration of Independence signed?",
      options: [""],
      correctAnswer: "1776",
    },
    {
      question: "What is the value of pi rounded to the nearest integer?",
      options: [""],
      correctAnswer: "3",
    },
    {
      question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
      options: [""],
      correctAnswer: "120",
    },
  ];
  