<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 3: Loops Using the While Statement'
const lessonDescription = 'Practical applications of while loops in C programming'
const topicId = 3 // Topic
const lessonId = 3 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Think of playing a mobile game 🎮. You keep playing while your health points are above 0. Once your health reaches 0 — the game ends!

That's how a while loop works in programming. It keeps doing something while a condition is true, and stops automatically when it's not.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `A while loop allows your program to repeat code based on a condition.

Syntax:`,
    code: `while (condition) {
    // statements to repeat
}`,
    explanation: `🧩 Key Points:
• The condition is checked before each repetition.
• If the condition is true, the code inside { } runs.
• When the condition becomes false, the loop stops.
• Be sure to update your loop variable — or you'll make an infinite loop! 😱`,
  },
  {
    id: 3,
    title: 'Example Program: Counting from 1 to 5',
    code: `#include <stdio.h>
int main() {
    int num = 1;
    while (num <= 5) {
        printf("%d ", num);
        num++;
    }
    return 0;
}`,
    explanation: `🧠 Explanation:
1️⃣ Starts at num = 1.
2️⃣ Checks if num <= 5.
3️⃣ Prints the number and increases it by 1.
4️⃣ When num becomes 6, the condition is false — the loop ends.

💻 Output:
1 2 3 4 5`,
  },
  {
    id: 4,
    title: 'Check for Understanding (1)',
    multipleQuiz: [
      {
        question:
          'What happens when the condition in a while loop is false from the start?\nThe statements inside { } are [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'skipped' }],
        template: 'Answer: [1]',
        options: ['skipped', 'executed once', 'repeated forever'],
      },
    ],
  },
  {
    id: 5,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question: 'Which part of the loop prevents it from running forever?',
        interactive: true,
        blanks: [{ id: 1, answer: 'the update statement' }],
        template: 'Answer: [1]',
        options: ['the update statement', 'the print statement', 'the declaration'],
      },
    ],
  },
  {
    id: 6,
    title: 'Guided Example (Sum of Even Numbers)',
    content: `Let's make a program that adds even numbers from 2 to 10 👇`,
    code: `#include <stdio.h>
int main() {
    int num = 2;
    int sum = 0;
    while (num <= 10) {
        sum = sum + num;
        num = num + 2;
    }
    printf("Sum = %d", sum);
    return 0;
}`,
    explanation: `🧠 Explanation:
• Starts with 2.
• Adds each even number to sum.
• Increments by 2 every loop.
• Stops when num exceeds 10.

💻 Output:
Sum = 30`,
  },
  {
    id: 7,
    title: 'Quick Practice',
    content: `Fill in the blanks to complete the while loop that prints numbers from 5 down to 1:`,
    code: `int n = 5;
while (n ___ 1) {
    printf("%d ", n);
    n--;
}`,
    multipleQuiz: [
      {
        question: 'Fill in the operator:',
        interactive: true,
        blanks: [{ id: 1, answer: '>=' }],
        template: 'while (n [1] 1)',
        options: ['>=', '<=', '=='],
      },
    ],
    explanation: `💡 This loop starts at 5 and prints until it reaches 1.`,
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Program Title: 🧮 Print Even Numbers from 2 to 10

Drag and drop the correct code parts to complete the program using a while loop.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'while' },
        { id: 2, answer: 'printf' },
      ],
      options: ['while', 'printf', 'scanf', 'if', 'for'],
      template: `#include <stdio.h>
int main() {
    int num = 2;
    [1] (num <= 10) {
        [2]("%d ", num);
        num = num + 2;
    }
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int num = 2;
    while (num <= 10) {
        printf("%d ", num);
        num = num + 2;
    }
    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Check for Understanding (3)',
    content: `What is the output of this loop?`,
    code: `int x = 2;
while (x < 8) {
    printf("%d ", x);
    x = x + 3;
}`,
    quiz: {
      question: 'What is the output?',
      options: ['2 3 4 5 6 7', '2 5', '2 5 8', '2 5 7'],
      answer: '2 5',
    },
    explanation: `💬 Explanation: Starts at 2 → prints 2 → adds 3 (now 5) → prints 5 → adds 3 (now 8) → loop stops because condition x < 8 is false.`,
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• The while loop repeats actions while a condition is true.
• Always include an update statement to avoid infinite loops.
• The condition is checked before the body runs.
• Use a while loop when the number of repetitions is unknown.
• Example uses: counting, summing values, validating input.`,
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
    :topic-id="topicId"
    :lesson-id="lessonId"
    back-route="/"
    complete-route="/"
    @lesson-complete="handleLessonComplete"
  />
</template>
