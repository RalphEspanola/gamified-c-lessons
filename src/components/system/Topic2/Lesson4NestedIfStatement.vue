<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 4: Nested If Statement'
const lessonDescription = 'Making complex decisions with nested if statements'
const topicId = 2 // Topic
const lessonId = 4 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine you're studying programming:
- If you have time to study, you open your laptop.
- If you open your laptop, you start coding in C language.

That's how a nested if works — one decision inside another.

In C, we use nested if statements when one condition depends on another — just like you can't start coding unless you've opened your laptop and have time to study.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `A nested if statement means placing one if statement inside another.

It helps your program make more specific decisions by checking multiple related conditions.

Syntax:`,
    code: `if (condition1) {
    if (condition2) {
        // runs only if both are true
    }
}`,
    explanation: `The inner if runs only if the outer if is true.`,
  },
  {
    id: 3,
    title: 'Concept Explanation (Example)',
    content: `Example:`,
    code: `if (score >= 75) {
    if (score == 100) {
        printf("Perfect Score!");
    } else {
        printf("You passed!");
    }
}`,
    explanation: `The inner if checks for a perfect score only after confirming the student passed.`,
  },
  {
    id: 4,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'The code inside the inner if will execute only if the outer if condition is:',
      options: ['true', 'false', 'either true or false', 'undefined'],
      answer: 'true',
    },
  },
  {
    id: 5,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'In a nested if, if the outer condition is false, what happens to the inner if?',
      options: ['it is skipped', 'it is executed', 'it causes an error', 'it runs twice'],
      answer: 'it is skipped',
    },
  },
  {
    id: 6,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'In the example below, what message will display if score = 100?',
      options: ['perfect score!', 'you passed!', 'you failed!', 'no message'],
      answer: 'perfect score!',
    },
  },
  {
    id: 7,
    title: 'Guided Example',
    content: `Example Code:`,
    code: `#include <stdio.h>
int main() {
    int grade = 85;
    char section = 'A';

    if (grade >= 75) {
        if (section == 'A') {
            printf("You passed and belong to Section A!");
        } else {
            printf("You passed, but not in Section A.");
        }
    } else {
        printf("You failed.");
    }

    return 0;
}`,
    explanation: `Explanation line by line:

- The outer if checks if the student passed (grade >= 75).
- The inner if checks if the student belongs to Section A.
- The program prints different messages based on both results.`,
  },
  {
    id: 8,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question: 'Fill in the blank to test if a student passed and is in Section B:',
        interactive: true,
        blanks: [{ id: 1, answer: '==' }],
        template:
          'if (grade >= 75) { if (section [1] \'B\') { printf("You passed in Section B!"); } }',
        options: ['==', '=', '!=', '>='],
      },
      {
        question: 'If grade = 60, which message will execute?',
        interactive: true,
        blanks: [{ id: 1, answer: 'you failed.' }],
        template: '[1]',
        options: [
          'you passed and belong to section a!',
          'you passed, but not in section a.',
          'you failed.',
        ],
      },
      {
        question:
          'What is wrong with this code? if (grade >= 75) if (section == \'A\') printf("You passed!"); else printf("You failed!");',
        interactive: true,
        blanks: [{ id: 1, answer: 'missing { } around nested statements' }],
        template: '[1]',
        options: ['missing { } around nested statements', 'incorrect operator', 'wrong condition'],
      },
    ],
  },
  {
    id: 9,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the program that checks if a student passed and whether they got a perfect score:`,
    codingTask: {
      blanks: [
        { id: 1, answer: '>=' },
        { id: 2, answer: '==' },
        { id: 3, answer: 'else' },
      ],
      options: ['==', 'else', '>=', '<=', 'if', '>'],
      template: `#include <stdio.h>
int main() {
    int score = 95;

    if (score [1] 75) {
        if (score [2] 100) {
            printf("Perfect Score!");
        } [3] {
            printf("You Passed!");
        }
    } else {
        printf("You Failed!");
    }

    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int score = 95;

    if (score >= 75) {
        if (score == 100) {
            printf("Perfect Score!");
        } else {
            printf("You Passed!");
        }
    } else {
        printf("You Failed!");
    }

    return 0;
}`,
    },
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

- A nested if allows one decision inside another.
- The inner if executes only if the outer if is true.
- Use it for multiple related conditions (e.g., grade and section).
- Always use braces { } to avoid confusion.
- Proper indentation makes nested code easier to read and debug.`,
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
