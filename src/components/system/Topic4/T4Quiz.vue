<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'

const lessonTitle = 'End-of-Topic Quiz: Topic 4 — Functions'
const lessonDescription = 'Test your understanding of functions in C programming'
const topicId = 4
const slides = [
  {
    id: 1,
    title: 'Question 1 – Top-Down Design',
    quiz: {
      question: 'What is the main idea behind top-down design?',
      options: [
        'Breaking a big problem into smaller parts',
        'Writing all code in one function',
        'Using loops instead of functions',
      ],
      answer: 'Breaking a big problem into smaller parts',
    },
  },
  {
    id: 2,
    title: 'Question 2 – Top-Down Design',
    quiz: {
      question:
        'In top-down design, functions help make programs easier to understand and maintain.',
      options: ['True', 'False'],
      answer: 'True',
    },
  },
  {
    id: 3,
    title: 'Question 3 – User-Defined Functions',
    multipleQuiz: [
      {
        question:
          'A function created by the programmer rather than the system library is called a [__________] function.',
        interactive: true,
        blanks: [{ id: 1, answer: 'user-defined' }],
        template: 'Answer: [1]',
        options: ['user-defined', 'built-in', 'system', 'library'],
      },
    ],
  },
  {
    id: 4,
    title: 'Question 4 – User-Defined Functions',
    quiz: {
      question: 'Which of the following correctly defines a user-defined function?',
      options: ['void greet() { printf("Hi!"); }', '#include <stdio.h>', 'int main()'],
      answer: 'void greet() { printf("Hi!"); }',
    },
  },
  {
    id: 5,
    title: 'Question 5 – Void Functions',
    quiz: {
      question: 'A void function must return a value at the end of its execution.',
      options: ['True', 'False'],
      answer: 'False',
    },
  },
  {
    id: 6,
    title: 'Question 6 – Void Functions',
    multipleQuiz: [
      {
        question:
          'In the function void sayHello() { printf("Hi!"); }, the word void means the function [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'returns no value' }],
        template: 'Answer: [1]',
        options: ['returns no value', 'returns an integer', 'takes no parameters', 'is incomplete'],
      },
    ],
  },
  {
    id: 7,
    title: 'Question 7 – Void Functions Syntax',
    content: `Fill in the missing keyword to define a void function:`,
    code: `[_____] greet() {
    printf("Hello, world!");
}`,
    multipleQuiz: [
      {
        question: 'Fill in the blank:',
        interactive: true,
        blanks: [{ id: 1, answer: 'void' }],
        template: '[1] greet() { ... }',
        options: ['void', 'int', 'char', 'float'],
      },
    ],
  },
  {
    id: 8,
    title: 'Question 8 – Parameters',
    quiz: {
      question: 'In the function void showAge(int age), the variable age is a:',
      options: ['Parameter', 'Argument', 'Constant'],
      answer: 'Parameter',
    },
  },
  {
    id: 9,
    title: 'Question 9 – Parameters vs Arguments',
    multipleQuiz: [
      {
        question: 'In displaySum(4, 6);, the values 4 and 6 are called [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'arguments' }],
        template: 'Answer: [1]',
        options: ['arguments', 'parameters', 'variables', 'constants'],
      },
    ],
  },
  {
    id: 10,
    title: 'Question 10 – Parameters',
    quiz: {
      question: 'Parameters are declared inside the function definition.',
      options: ['True', 'False'],
      answer: 'True',
    },
  },
  {
    id: 11,
    title: 'Question 11 – Designing Functions',
    quiz: {
      question: 'Which of the following is not an important question when designing a function?',
      options: [
        'What will the function do?',
        'What data does it need?',
        'What color is the text editor?',
      ],
      answer: 'What color is the text editor?',
    },
  },
  {
    id: 12,
    title: 'Question 12 – Function Design Principles',
    multipleQuiz: [
      {
        question:
          'Each function should do [__________] clear task to make the program easy to maintain.',
        interactive: true,
        blanks: [{ id: 1, answer: 'one' }],
        template: 'Answer: [1]',
        options: ['one', 'two', 'many', 'multiple'],
      },
    ],
  },
  {
    id: 13,
    title: 'Question 13 – Function Implementation',
    content: `Complete the function that returns the square of a number:`,
    code: `int findSquare(int n) {
    return n [___] n;
}`,
    multipleQuiz: [
      {
        question: 'Fill in the operator:',
        interactive: true,
        blanks: [{ id: 1, answer: '*' }],
        template: 'return n [1] n;',
        options: ['*', '+', '-', '/'],
      },
    ],
  },
  {
    id: 14,
    title: 'Question 14 – Function Design',
    quiz: {
      question: 'A well-designed function should have a descriptive name that tells what it does.',
      options: ['True', 'False'],
      answer: 'True',
    },
  },
  {
    id: 15,
    title: 'Question 15 – Integrated Review',
    content: `Fill in the missing parts of the program below:`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'void' },
        { id: 2, answer: 'char' },
      ],
      options: ['void', 'char', 'int'],
      template: `#include <stdio.h>

[1] greetUser([2] name[]) {
    printf("Hello, %s!", name);
}

int main() {
    greetUser("Conrad");
    return 0;
}`,
      correctCode: `#include <stdio.h>

void greetUser(char name[]) {
    printf("Hello, %s!", name);
}

int main() {
    greetUser("Conrad");
    return 0;
}`,
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
