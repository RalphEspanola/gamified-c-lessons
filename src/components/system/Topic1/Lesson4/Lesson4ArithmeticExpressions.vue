<script setup>
import LessonSlides from '../../LessonSlides/LessonSlides.vue'

const lessonTitle = 'Lesson 4: Arithmetic Expressions'
const lessonDescription = 'Understanding arithmetic operators in C'
const topicId = 1 // Topic
const lessonId = 4 // Lesson

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Think of C as your pocket calculator. It can add, subtract, multiply, divide, and even find remainders using arithmetic operators. These operations are the foundation for solving real problems in programming.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `Arithmetic operators in C:

• + → addition
• - → subtraction
• * → multiplication
• / → division
• % → modulus (remainder of division)

Example:`,
    code: `int a = 10, b = 3;
printf("a + b = %d\\n", a + b); // 13
printf("a - b = %d\\n", a - b); // 7
printf("a * b = %d\\n", a * b); // 30
printf("a / b = %d\\n", a / b); // 3
printf("a %% b = %d\\n", a % b); // 1`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'Which operator is used to get the remainder of a division?',
      options: ['+ addition', '- subtraction', '* multiplication', '% modulus'],
      answer: '% modulus',
    },
  },
  {
    id: 4,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'What is the result of 15 / 4 in C (integer division)?',
      options: ['3', '3.75', '4', 'Error'],
      answer: '3',
    },
  },
  {
    id: 5,
    title: 'Guided Example',
    content: `Example Code:`,
    code: `#include <stdio.h>
int main() {
    int x = 7, y = 2;
    printf("x + y = %d\\n", x + y);
    printf("x - y = %d\\n", x - y);
    printf("x * y = %d\\n", x * y);
    printf("x / y = %d\\n", x / y);
    printf("x %% y = %d\\n", x % y);
    return 0;
}`,
    explanation: `Explanation line by line:

• x + y → adds two numbers.
• x - y → subtracts.
• x * y → multiplies.
• x / y → divides (but since both are int, it gives only the whole number).
• x % y → gives the remainder.`,
  },
  {
    id: 6,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question: 'Fill in the blank: printf("%d", 10 ___ 3); → prints 30',
        interactive: true,
        blanks: [{ id: 1, answer: '*' }],
        template: 'printf("%d", 10 [1] 3);',
        options: ['+', '-', '*', '/'],
      },
      {
        question: 'printf("%d", 15 + 5);',
        interactive: true,
        blanks: [{ id: 1, answer: '20' }],
        template: 'Result: [1]',
        options: ['20', '10', '5'],
      },
    ],
  },
  {
    id: 7,
    title: 'Deeper Practice / Coding Task',
    content: `Fill and complete the program (Prints: 8):`,
    codingTask: {
      blanks: [
        { id: 1, answer: '-' },
        { id: 2, answer: '%d' },
        { id: 3, answer: '-' },
      ],
      options: ['+', '-', '*', '/', '%d', '%f', '%c'],
      template: `int x = 10, y = 2;
printf("x [1] y = [2]\\n", x [3] y);`,
      correctCode: `int x = 10, y = 2;
printf("x - y = %d\\n", x - y);`,
    },
  },
  {
    id: 8,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• Arithmetic operators: +, -, *, /, %.
• % gives the remainder in integer division.
• Division between integers ignores the decimal part.
• Always match data types (int vs float) when doing calculations.`,
  },
]
</script>

<template>
  <LessonSlides
    :lesson-title="lessonTitle"
    :lesson-description="lessonDescription"
    :slides="slides"
    :topic-id="topicId"
    :lesson-id="lessonId"
    back-route="/"
    complete-route="/"
    @lesson-complete="handleLessonComplete"
  />
</template>
