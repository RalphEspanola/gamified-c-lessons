<script setup>
import LessonSlides from '../../LessonSlides/LessonSlides.vue'

const lessonTitle = 'Topic 1 Quiz: C Fundamentals'
const lessonDescription = 'Test your understanding of C programming basics'

// Quiz belongs to Topic 1
const topicId = 1

// ❌ DO NOT import useLearningProgress or call completeQuiz manually
// ✅ LessonSlides component handles ALL completion logic automatically

// Optional: Add custom logic when quiz completes
function handleQuizComplete() {
  console.log('✅ Topic 1 Quiz completed! Topic 2 should now be unlocked.')
}

const slides = [
  {
    id: 1,
    title: 'Q1. Elements of a C Program',
    quiz: {
      question: 'Which function is always required in a C program?',
      options: ['start()', 'main()', 'printf()', 'run()'],
      answer: 'main()',
    },
  },
  {
    id: 2,
    title: 'Q2. Variables and Data Types',
    multipleQuiz: [
      {
        question:
          'Fill in the blank to declare a float variable named score:\n______ score = 95.5;',
        interactive: true,
        blanks: [{ id: 1, answer: 'float' }],
        template: '[1] score = 95.5;',
        options: ['int', 'float', 'char', 'double'],
      },
    ],
  },
  {
    id: 3,
    title: 'Q3. Input and Output',
    quiz: {
      question: 'Which function is used to get input from the user?',
      options: ['print()', 'scanf()', 'cout', 'input()'],
      answer: 'scanf()',
    },
  },
  {
    id: 4,
    title: 'Q4. Input and Output',
    quiz: {
      question: 'In scanf(), the & symbol is required before variables.',
      options: ['True', 'False'],
      answer: 'True',
    },
  },
  {
    id: 5,
    title: 'Q5. Arithmetic Expressions',
    quiz: {
      question: 'What is the result of this code?\nint x = 12, y = 5;\nprintf("%d", x / y);',
      options: ['2', '2.4', '3', '5'],
      answer: '2',
    },
  },
  {
    id: 6,
    title: 'Q6. Arithmetic Expressions',
    multipleQuiz: [
      {
        question:
          'Fill in the blank to print the product of two variables a and b:\nprintf("%d", a ___ b);',
        interactive: true,
        blanks: [{ id: 1, answer: '*' }],
        template: 'printf("%d", a [1] b);',
        options: ['+', '-', '*', '/', '%'],
      },
    ],
  },
  {
    id: 7,
    title: 'Q7. String Formatter',
    quiz: {
      question: 'Which format specifier is used for a string?',
      options: ['%d', '%s', '%c', '%f'],
      answer: '%s',
    },
  },
  {
    id: 8,
    title: 'Q8. String Formatter',
    quiz: {
      question: 'The format specifier %.2f prints a float with 2 decimal places.',
      options: ['True', 'False'],
      answer: 'True',
    },
  },
  {
    id: 9,
    title: 'Q9. Common Errors',
    quiz: {
      question: 'If a program runs but produces the wrong answer, what type of error is it?',
      options: ['Syntax Error', 'Logical Error', 'Runtime Error', 'Compiler Error'],
      answer: 'Logical Error',
    },
  },
  {
    id: 10,
    title: 'Q10. Debugging',
    content: `Find and fix the error in this code:`,
    code: `#include <stdio.h>
int main() {
    int age = 20
    printf("Age: %d", age);
    return 0;
}`,
    quiz: {
      question: 'What causes the error?',
      options: ['Missing semicolon', 'wrong variable', 'wrong format specifiers'],
      answer: 'Missing semicolon',
    },
  },
]
</script>

<template>
  <LessonSlides
    mode="quiz"
    :lesson-title="lessonTitle"
    :lesson-description="lessonDescription"
    :slides="slides"
    :topic-id="topicId"
    back-route="/"
    complete-route="/"
    @quiz-complete="handleQuizComplete"
  />
</template>
