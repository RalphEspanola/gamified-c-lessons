<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 1: Control Structures'
const lessonDescription = 'Understanding program flow and control mechanisms'
const topicId = 2 // Topic
const lessonId = 1 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine you're giving instructions to a robot:
1. Go straight.
2. If there's an obstacle, turn right.
3. Repeat until you reach the goal.

That's how control structures work in C — they tell the program when and how to execute certain parts of code.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `Control structures determine the flow of execution in a program.

There are three main types in C:

1. Sequential Structure
- Executes statements one after another in order.`,
    code: `printf("Step 1\\n");
printf("Step 2\\n");
printf("Step 3\\n");`,
    explanation: `2. Selection Structure (Decision Making)
- Executes statements based on a condition.`,
    code2: `if (x > 0) {
    printf("Positive number");
}`,
    explanation2: `3. Repetition Structure (Loops)
- Repeats a block of code multiple times.`,
    code3: `while (count < 5) {
    printf("Counting...\\n");
    count++;
}`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'Which control structure executes statements in order, one after another?',
      options: [
        'sequential structure',
        'selection structure',
        'repetition structure',
        'conditional structure',
      ],
      answer: 'sequential structure',
    },
  },
  {
    id: 4,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'Which control structure allows a program to make decisions?',
      options: ['sequential', 'selection', 'repetition', 'recursive'],
      answer: 'selection',
    },
  },
  {
    id: 5,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'True or False: A while loop is an example of a selection control structure.',
      options: ['true', 'false'],
      answer: 'false',
    },
  },
  {
    id: 6,
    title: 'Guided Example',
    content: `Example Code:`,
    code: `#include <stdio.h>
int main() {
    int num = 5;
    printf("Sequential Step 1\\n");

    if (num > 0) {
        printf("Selection: Number is positive\\n");
    }

    int count = 0;
    while (count < num) {
        printf("Repetition: Count = %d\\n", count);
        count++;
    }

    return 0;
}`,
    explanation: `Explanation line by line:

- Prints steps sequentially.
- Uses if to check a condition (selection).
- Uses while to repeat (repetition).`,
  },
  {
    id: 7,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question:
          'Fill in the blank: A control structure that repeats statements is called a ______ structure.',
        interactive: true,
        blanks: [{ id: 1, answer: 'repetition' }],
        template: '[1]',
        options: ['repetition', 'sequential', 'selection', 'decision'],
      },
      {
        question: 'Match: Executes line by line',
        interactive: true,
        blanks: [{ id: 1, answer: 'sequential' }],
        template: '[1]',
        options: ['sequential', 'selection', 'repetition'],
      },
      {
        question: 'Match: Decides based on condition',
        interactive: true,
        blanks: [{ id: 1, answer: 'selection' }],
        template: '[1]',
        options: ['sequential', 'selection', 'repetition'],
      },
      {
        question: 'Match: Repeats actions',
        interactive: true,
        blanks: [{ id: 1, answer: 'repetition' }],
        template: '[1]',
        options: ['sequential', 'selection', 'repetition'],
      },
    ],
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the program by filling in the blanks:`,
    codingTask: {
      blanks: [
        { id: 1, answer: '>' },
        { id: 2, answer: '<' },
        { id: 3, answer: 'count' },
        { id: 4, answer: 'count++' },
      ],
      options: ['>', '<', 'count', 'count++', '==', 'num'],
      template: `#include <stdio.h>
int main() {
    int num = 3;
    printf("Start Program\\n");

    if (num [1] 0) {
        printf("Selection: Positive number\\n");
    }

    int count = 0;
    while (count [2] num) {
        printf("Repetition Count: %d\\n", [3]);
        [4];
    }

    printf("End Program");
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int num = 3;
    printf("Start Program\\n");

    if (num > 0) {
        printf("Selection: Positive number\\n");
    }

    int count = 0;
    while (count < num) {
        printf("Repetition Count: %d\\n", count);
        count++;
    }

    printf("End Program");
    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

- Control structures define how the program flows.
- Sequential: executes in order.
- Selection: makes decisions (if, if-else, switch).
- Repetition: repeats actions (while, do-while, for).

Combining these structures helps create flexible, logical programs.`,
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
