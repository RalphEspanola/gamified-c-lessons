<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 5: Decision Steps in Algorithms'
const lessonDescription = 'Understanding decision-making in algorithms and C programs'
const topicId = 2 // Topic
const lessonId = 5 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `When learning programming, you constantly make choices:
👉 If the code runs, celebrate!
👉 Else, check your syntax!

That's how decision steps work — they help your program make choices, just like you do when solving coding problems.

A decision step allows your program to decide what happens next depending on whether a condition is true or false.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `In an algorithm, a decision step is a point where the program decides what to do next. It checks a condition and takes an action based on the result.

Types of Decision Steps:
1. IF–THEN → one condition
2. IF–THEN–ELSE → two possible paths
3. Nested IF → one decision inside another

✅ Example (Algorithm form):`,
    code: `Step 1: Start
Step 2: Input score
Step 3: If score >= 75 then
           Print "Passed"
        Else
           Print "Failed"
Step 4: End`,
    explanation: `This shows how an algorithm "decides" what output to produce based on a condition.`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'What is the main purpose of a decision step in an algorithm?',
      options: ['Repeat instructions', 'Choose between actions', 'Store data', 'Display graphics'],
      answer: 'Choose between actions',
    },
  },
  {
    id: 4,
    title: 'Guided Example',
    content: `Here's a C program that uses a decision step:`,
    code: `#include <stdio.h>
int main() {
    int score;
    printf("Enter your score: ");
    scanf("%d", &score);
    if (score >= 75) {
        printf("You passed!");
    } else {
        printf("You failed!");
    }
    return 0;
}`,
    explanation: `💡 The if and else statements are the C version of a decision step in an algorithm.`,
  },
  {
    id: 5,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question: 'The code inside an if statement runs [______] the condition is true.',
        interactive: true,
        blanks: [{ id: 1, answer: 'only if' }],
        template: 'Answer: [1]',
        options: ['only if', 'even if not'],
      },
    ],
  },
  {
    id: 6,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'When the if condition is false, which block will run?',
      options: ['if block', 'else block'],
      answer: 'else block',
    },
  },
  {
    id: 7,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question:
          'Fill in the blanks to complete the program below:\nif (age ___ 18) {\n    printf("You are an adult.");\n} else {\n    printf("You are a minor.");\n}',
        interactive: true,
        blanks: [{ id: 1, answer: '>=' }],
        template: 'if (age [1] 18)',
        options: ['>=', '<=', '==', '!='],
      },
    ],
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Drag and drop the correct choices to complete the program that checks if a student qualifies for a scholarship. A student qualifies if their grade is 90 or higher.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'scanf' },
        { id: 2, answer: 'grade' },
        { id: 3, answer: '>=' },
        { id: 4, answer: 'printf' },
        { id: 5, answer: 'else' },
        { id: 6, answer: 'printf' },
      ],
      options: ['scanf', '==', 'grade', '>=', 'else', 'if', 'printf', '<='],
      template: `#include <stdio.h>
int main() {
    int grade;
    printf("Enter your grade: ");
    [1]("%d", &[2]);
    if (grade [3] 90) {
        [4]("Congratulations! You are qualified for a scholarship.");
    } [5] {
        [6]("Sorry, you did not qualify.");
    }
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int grade;
    printf("Enter your grade: ");
    scanf("%d", &grade);
    if (grade >= 90) {
        printf("Congratulations! You are qualified for a scholarship.");
    } else {
        printf("Sorry, you did not qualify.");
    }
    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• A decision step allows a program to choose actions based on a condition.
• If–Then–Else statements represent these decision points.
• In C, decisions are made using if and else.
• The if block runs when the condition is true, the else block when it's false.
• Decision steps make your program smart and interactive — not just linear.`,
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
