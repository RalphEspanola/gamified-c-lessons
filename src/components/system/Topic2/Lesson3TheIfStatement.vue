<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 3: The If Statement'
const lessonDescription = 'Making simple decisions with if statements'
const topicId = 2 // Topic
const lessonId = 3 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine your phone deciding when to notify you:
"If you get a new message, show a notification."

In C, the if statement helps your program make simple decisions — it runs a block of code only when a condition is true.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `The if statement allows a program to check a condition and perform an action if it's true.

Syntax:`,
    code: `if (condition) {
    // code to run if condition is true
}`,
    explanation: `• If the condition is true, the code inside { } executes.
- If the condition is false, that code block is skipped.`,
  },
  {
    id: 3,
    title: 'Concept Explanation (Example)',
    content: `Example:`,
    code: `if (score >= 75) {
    printf("You passed!");
}`,
    explanation: `The message appears only when score is 75 or higher.`,
  },
  {
    id: 4,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'What happens when the condition in an if statement is false?',
      options: [
        'the statements inside { } are skipped',
        'the statements inside { } are executed',
        'the program stops',
        'an error occurs',
      ],
      answer: 'the statements inside { } are skipped',
    },
  },
  {
    id: 5,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'Which symbol is used to compare two values in an if statement?',
      options: ['==', '=', ':=', '!='],
      answer: '==',
    },
  },
  {
    id: 6,
    title: 'Guided Example',
    content: `Example Code:`,
    code: `#include <stdio.h>
int main() {
    int temp = 32;

    if (temp > 30) {
        printf("It's a hot day!");
    }

    printf("\\nEnjoy your day!");
    return 0;
}`,
    explanation: `Explanation line by line:

- if (temp > 30) → checks if the temperature is greater than 30.
- If true, prints "It's a hot day!".
- printf("\\nEnjoy your day!"); runs regardless, since it's outside the if block.`,
  },
  {
    id: 7,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question: 'Fill in the blank to print "Pass" if grade is greater than or equal to 75:',
        interactive: true,
        blanks: [{ id: 1, answer: '>=' }],
        template: 'if (grade [1] 75) { printf("Pass"); }',
        options: ['>=', '>', '==', '<='],
      },
      {
        question:
          'Complete the condition so it prints "Numbers are equal" when x and y have the same value:',
        interactive: true,
        blanks: [{ id: 1, answer: '==' }],
        template: 'if (x [1] y) { printf("Numbers are equal"); }',
        options: ['==', '=', '!=', '>='],
      },
    ],
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the program that checks if a student passes based on their grade:`,
    codingTask: {
      blanks: [{ id: 1, answer: '>=' }],
      options: ['>', '<', '>=', '==', '!=', '%'],
      template: `#include <stdio.h>
int main() {
    int grade = 82;

    if (grade [1] 75) {
        printf("Congratulations! You passed!");
    }

    printf("\\nProgram finished.");
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int grade = 82;

    if (grade >= 75) {
        printf("Congratulations! You passed!");
    }

    printf("\\nProgram finished.");
    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

- The if statement allows conditional execution of code.
- The condition inside ( ) must evaluate to true (1) or false (0).
- If the condition is false, the block is skipped.
- Use == for comparison, not = (which assigns values).`,
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
