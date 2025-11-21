<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 2: An Overview of User-Defined Functions'
const lessonDescription = 'Understanding user-defined functions in C programming'
const topicId = 4 // Topic
const lessonId = 2 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine you're coding a game 🎮, and you need to calculate the player's score several times.

Instead of writing the same formula again and again, you can create your own function — a reusable "mini program" you can call anytime.

That's a user-defined function — one that you write yourself to perform a specific task.

💡 It's like making your own custom tool inside your program!`,
  },
  {
    id: 2,
    title: 'Concept Explanation (Built-in vs User-Defined)',
    content: `In C programming, there are two kinds of functions:`,
    explanation: `<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Built-in Functions</td>
      <td>Already provided by C libraries.</td>
      <td>printf(), scanf(), sqrt()</td>
    </tr>
    <tr>
      <td>User-Defined Functions</td>
      <td>Created by the programmer to perform custom tasks.</td>
      <td>addNumbers(), displayInfo()</td>
    </tr>
  </tbody>
</table>

🧠 Built-in functions are ready-made, while user-defined functions let you write your own logic for specific needs.`,
  },
  {
    id: 3,
    title: 'Concept Explanation (Function Structure)',
    content: [
      {
        type: 'text',
        value: `A user-defined function in C usually has three main parts:

1️⃣ Function Declaration (Prototype) – tells the compiler about the function.`,
      },
      { type: 'code', value: `int add(int a, int b);` },
      { type: 'text', value: `2️⃣ Function Definition – where the function's code is written.` },
      {
        type: 'code',
        value: `int add(int a, int b) {
    return a + b;
}`,
      },
      { type: 'text', value: `3️⃣ Function Call – where the function is used inside main().` },
      { type: 'code', value: `printf("%d", add(5, 3));` },
      { type: 'text', value: `💡 These parts help organize your code and make it reusable.` },
    ],
  },
  {
    id: 4,
    title: 'Guided Example',
    code: `#include <stdio.h>

// Function Declaration
int add(int x, int y);

int main() {
    int sum = add(10, 5);   // Function Call
    printf("Sum: %d", sum);
    return 0;
}

// Function Definition
int add(int x, int y) {
    return x + y;
}`,
    explanation: `💬 Explanation:
• int add(int x, int y); → Declares the function so the compiler knows it exists.
• add(10, 5) → Calls the function with two arguments.
• return x + y; → Sends the result back to main().`,
  },
  {
    id: 5,
    title: 'Check for Understanding (1)',
    multipleQuiz: [
      {
        question: 'What is a user-defined function?\nA function that is [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'created by the programmer' }],
        template: 'Answer: [1]',
        options: ['created by the programmer', 'predefined by C', 'used for input only'],
      },
    ],
  },
  {
    id: 6,
    title: 'Check for Understanding (2)',
    quiz: {
      question:
        "Which part of a function tells the compiler what the function looks like before it's used?",
      options: ['Function Declaration', 'Function Definition', 'Function Call'],
      answer: 'Function Declaration',
    },
  },
  {
    id: 7,
    title: 'Quick Practice (Fill in the Blanks)',
    content: `Complete the blanks to make a program that returns the product of two numbers.`,
    code: `#include <stdio.h>

int [____](int a, int b);   // Function Declaration

int main() {
    int result = multiply(4, 2);
    printf("Product: %d", result);
    return 0;
}

int multiply(int a, int b) {   // Function Definition
    return [____];
}`,
    multipleQuiz: [
      {
        question: 'Fill in the blanks:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'multiply' },
          { id: 2, answer: 'a * b' },
        ],
        template: 'int [1](int a, int b); ... return [2];',
        options: ['multiply', 'a * b', 'sum'],
      },
    ],
  },
  {
    id: 8,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'What are the three main parts of a user-defined function in C?',
      options: [
        'Declaration, Definition, and Call',
        'Header, Body, End',
        'Input, Output, Condition',
      ],
      answer: 'Declaration, Definition, and Call',
    },
  },
  {
    id: 9,
    title: 'Deeper Practice / Coding Task',
    content: `Goal: Write a function that displays a welcome message and returns nothing.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'void' },
        { id: 2, answer: 'void' },
      ],
      options: ['void', 'int', 'char'],
      template: `#include <stdio.h>

[1] welcome();   // Function Declaration

int main() {
    welcome();        // Function Call
    return 0;
}

[2] welcome() {  // Function Definition
    printf("Welcome to User-Defined Functions!");
}`,
      correctCode: `#include <stdio.h>

void welcome();   // Function Declaration

int main() {
    welcome();        // Function Call
    return 0;
}

void welcome() {  // Function Definition
    printf("Welcome to User-Defined Functions!");
}`,
    },
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: `🧠 What You Learned:

• A user-defined function is one that you create yourself.
• It can take inputs (parameters) and return outputs (values).
• Every function has three main parts:
  • Declaration – tells the compiler it exists.
  • Definition – contains the actual code.
  • Call – runs the function.
• User-defined functions make programs organized, reusable, and modular.`,
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
