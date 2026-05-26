<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { lesson2References } from '../Dashboard/Data/references/topic3/lesson2References'

const lessonTitle = 'Lesson 2: Phases of Loop Execution'
const lessonDescription = 'Understanding the three phases of loop execution in C'
const topicId = 3 // Topic
const lessonId = 2 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Think of doing your morning routine:
1️⃣ You wake up (start).
2️⃣ You check the time (condition).
3️⃣ If it's still early, you go back to sleep — if not, you get up.
4️⃣ You repeat the process until it's time to wake up for real!

That's how loops work in programming. Each loop follows certain phases — it starts, checks a condition, repeats if needed, and then stops when done.

💡 These are called the phases of loop execution.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `Every loop in C (like while, do–while, or for) follows three main phases in each repetition:

1️⃣ Initialization – Set up your starting point (e.g., int i = 1;)
2️⃣ Condition Checking – The loop runs only if the condition is true.
3️⃣ Update / Increment – Change the loop variable so the program knows when to stop.

Example:`,
    code: `int i = 1;              // Initialization
while (i <= 3) {        // Condition check
    printf("%d ", i);   // Body of the loop
    i++;                // Update
}`,
    explanation: `💡 The computer checks the condition before every repetition. When it becomes false, the loop ends.`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    multipleQuiz: [
      {
        question: 'Which phase happens first in any loop?',
        interactive: true,
        blanks: [{ id: 1, answer: 'Initialization' }],
        template: 'Answer: [1]',
        options: ['Initialization', 'Condition Checking', 'Update'],
      },
    ],
  },
  {
    id: 4,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question: 'The loop continues to execute as long as the [__________] is true.',
        interactive: true,
        blanks: [{ id: 1, answer: 'condition' }],
        template: 'Answer: [1]',
        options: ['initialization', 'condition', 'update'],
      },
    ],
  },
  {
    id: 5,
    title: 'Guided Example',
    content: `Let's look at an example showing all three phases together 👇`,
    code: `#include <stdio.h>
int main() {
    int num = 1;                 // Initialization
    while (num <= 3) {           // Condition
        printf("%d\\n", num);     // Body
        num++;                   // Update
    }
    return 0;
}`,
    explanation: `Step-by-step flow:
1️⃣ num starts at 1 (Initialization)
2️⃣ Condition num <= 3 → true, so the loop runs
3️⃣ Prints 1, then increases num to 2 (Update)
4️⃣ Goes back and checks the condition again
5️⃣ Stops when num becomes 4 (Condition = false)`,
  },
  {
    id: 6,
    title: 'Check for Understanding (3)',
    multipleQuiz: [
      {
        question:
          'What happens if you skip the update phase in a loop?\nThe loop will [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'run infinitely' }],
        template: 'Answer: [1]',
        options: ['run infinitely', 'stop immediately', 'print an error'],
      },
    ],
  },
  {
    id: 7,
    title: 'Quick Practice',
    content: `Fill in the blanks to identify the three phases in this code:`,
    code: `int x = 0;              // [__________]
while (x < 5) {         // [__________]
    printf("%d ", x);
    x++;                // [__________]
}`,
    multipleQuiz: [
      {
        question: 'Identify the three phases:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'Initialization' },
          { id: 2, answer: 'Condition Checking' },
          { id: 3, answer: 'Update' },
        ],
        template: 'int x = 0; // [1]\nwhile (x < 5) { // [2]\n    ...\n    x++; // [3]',
        options: ['Condition Checking', 'Initialization', 'Update'],
      },
    ],
  },
  {
    id: 8,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• Every loop follows three main phases:
  1️⃣ Initialization – sets up the starting value
  2️⃣ Condition Checking – decides if the loop continues
  3️⃣ Update – moves toward ending the loop

• Skipping the update causes infinite loops.
• Understanding these phases helps you control and predict how loops behave.`,
  },
  {
    id: 9,
    title: 'References',
    references: lesson2References,
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
