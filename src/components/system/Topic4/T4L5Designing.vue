<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 5: Designing Functions'
const lessonDescription = 'Learning how to design well-structured functions in C'
const topicId = 4 // Topic
const lessonId = 5 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine getting ready for school 🎒.
You don't do everything randomly — you follow steps:
1️⃣ Wake up
2️⃣ Get dressed
3️⃣ Eat breakfast
4️⃣ Go to school

Each step has its own purpose, but together they form your morning routine.

That's what designing functions is like in programming 💡 —
you plan each small task (function) to do one clear job,
and when you combine them, they make the whole program run smoothly.`,
  },
  {
    id: 2,
    title: 'Concept Explanation (What Is Function Design?)',
    content: `Function design is the process of creating well-structured functions that make a program modular, reusable, and easy to debug.

When designing a function, ask yourself three key questions:
1️⃣ What will the function do? (Purpose)
2️⃣ What data does it need? (Parameters)
3️⃣ What will it give back? (Return value, if any)

💬 These three questions help you write functions that are clear, efficient, and easy to maintain.`,
  },
  {
    id: 3,
    title: 'Concept Explanation (Parts of a Good Function Design)',
    content: `A well-designed function has several key components:`,
    explanation: `<table>
  <thead>
    <tr>
      <th>Part</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Function Name</td>
      <td>Should describe what it does.</td>
      <td>calculateAverage()</td>
    </tr>
    <tr>
      <td>Parameters</td>
      <td>Inputs the function needs to work.</td>
      <td>(int a, int b, int c)</td>
    </tr>
    <tr>
      <td>Return Type</td>
      <td>What the function gives back (int, float, void, etc.).</td>
      <td>float</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>The statements that perform the task.</td>
      <td>{ return (a+b+c)/3; }</td>
    </tr>
  </tbody>
</table>

💡 Good design rule: Each function should do one clear task only.`,
  },
  {
    id: 4,
    title: 'Guided Example',
    code: `#include <stdio.h>

float computeAverage(int a, int b, int c) {
    float average = (a + b + c) / 3.0;
    return average;
}

int main() {
    float result = computeAverage(90, 85, 88);
    printf("Average Score: %.2f", result);
    return 0;
}`,
    explanation: `💬 Explanation:
• Purpose: Compute the average of three grades.
• Parameters: int a, int b, int c — input values.
• Return type: float — sends back the computed result.
• Design logic: Each function performs a specific task for clarity and reuse.`,
  },
  {
    id: 5,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'What is the main goal of designing functions?',
      options: [
        'To break down a program into smaller, manageable tasks',
        'To make code longer',
        'To repeat code faster',
      ],
      answer: 'To break down a program into smaller, manageable tasks',
    },
  },
  {
    id: 6,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'Which of the following is a well-designed function name?',
      options: ['doIt()', 'calculateTotal()', 'x()'],
      answer: 'calculateTotal()',
    },
    explanation: `💬 The name clearly states what the function does.`,
  },
  {
    id: 7,
    title: 'Quick Practice (Fill in the Blanks)',
    content: `Fill in the blanks to design a function that finds the square of a number.`,
    code: `#include <stdio.h>

int [_____] (int n) {
    return n * n;
}

int main() {
    printf("Square: %d", [_____](4));
    return 0;
}`,
    multipleQuiz: [
      {
        question: 'Fill in the blanks:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'findSquare' },
          { id: 2, answer: 'findSquare' },
        ],
        template: 'int [1](int n) { ... } ... printf("Square: %d", [2](4));',
        options: ['findSquare', 'compute', 'addNumbers', 'findSquare'],
      },
    ],
  },
  {
    id: 8,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'Which question is not part of designing a function?',
      options: [
        'What will the function do?',
        'What color should the code be?',
        'What data does it need?',
      ],
      answer: 'What color should the code be?',
    },
  },
  {
    id: 9,
    title: 'Deeper Practice / Coding Task',
    content: `Design a function that checks if a number is even or odd and prints the result.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'void' },
        { id: 2, answer: 'int' },
        { id: 3, answer: 'void' },
        { id: 4, answer: 'int' },
      ],
      options: ['int', 'void', 'int', 'void'],
      template: `#include <stdio.h>

[1] checkNumber([2] num);

int main() {
    checkNumber(7);
    return 0;
}

[3] checkNumber([4] num) {
    if (num % 2 == 0)
        printf("Even Number");
    else
        printf("Odd Number");
}`,
      correctCode: `#include <stdio.h>

void checkNumber(int num);

int main() {
    checkNumber(7);
    return 0;
}

void checkNumber(int num) {
    if (num % 2 == 0)
        printf("Even Number");
    else
        printf("Odd Number");
}`,
    },
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: `🧠 What You Learned:

• Designing functions helps you plan before coding.
• A good function has:
  • A clear purpose
  • Input parameters (if needed)
  • A return type (or void if none)
• Functions should be:
  • Simple (do one thing well)
  • Reusable (used in different parts of the program)
  • Readable (use meaningful names)
• Well-designed functions make code easier to debug and maintain.`,
  },
]
const { completeLesson } = useLearningProgress()
function handleLessonComplete() {
  completeLesson(topicId, lessonId)
}
</script>

<template>
  <LessonSlides
    :lesson-title="lessonTitle"
    :lesson-description="lessonDescription"
    :slides="slides"
    back-route="/"
    complete-route="/"
    @lesson-complete="handleLessonComplete"
  />
</template>
