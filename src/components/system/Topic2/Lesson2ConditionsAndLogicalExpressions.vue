<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 2: Conditions and Logical Expressions'
const lessonDescription = 'Making decisions with conditions and logical operators'
const topicId = 2 // Topic
const lessonId = 2 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Every day, we make decisions using conditions:
- "If it's raining, bring an umbrella."
- "If I'm hungry, I'll eat."

In C, we use conditions and logical expressions to help programs make similar choices — deciding when certain actions should happen.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `A condition is a test that evaluates to either true (1) or false (0).

C uses relational and logical operators to form these conditions.

Relational Operators:
- == → equal to (5 == 5 is true)
- != → not equal to (4 != 5 is true)
- > → greater than (8 > 2 is true)
- < → less than (3 < 1 is false)
- >= → greater or equal (7 >= 7 is true)
- <= → less or equal (5 <= 4 is false)

Logical Operators:
- && → AND (both must be true)
- || → OR (at least one must be true)
- ! → NOT (reverses the condition)`,
    code: `// Relational
if (x == 5)
if (x != 5)
if (x > 5)

// Logical
if (x > 0 && y > 0)
if (x > 0 || y > 0)
if (!(x == y))`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'Which operator checks if two values are not equal?',
      options: ['<=', '>=', '!=', '=='],
      answer: '!=',
    },
  },
  {
    id: 4,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'What will be the result of (4 < 5) && (5 > 7)?',
      options: ['true', 'false', 'error', 'undefined'],
      answer: 'false',
    },
  },
  {
    id: 5,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'True or False: !(5 == 5) evaluates to True.',
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
    int temp = 28;

    if (temp > 30) {
        printf("It's hot!");
    }

    if (temp >= 25 && temp <= 30) {
        printf("The weather is nice!");
    }

    if (!(temp < 25)) {
        printf("No need for a jacket.");
    }

    return 0;
}`,
    explanation: `Explanation line by line:

- temp > 30 → checks if temperature is above 30.
- temp >= 25 && temp <= 30 → checks if it's between 25 and 30.
- !(temp < 25) → means temp is not less than 25.`,
  },
  {
    id: 7,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question: 'Fill in the blank to check if num is greater than 10 and less than 50:',
        interactive: true,
        blanks: [
          { id: 1, answer: '>' },
          { id: 2, answer: '&&' },
          { id: 3, answer: '<' },
        ],
        template: 'if (num [1] 10 [2] num [3] 50)',
        options: ['>', '&&', '<', '||', '==', '!='],
      },
      {
        question: 'Make a condition that checks if score is not equal to 100:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'score' },
          { id: 2, answer: '!=' },
          { id: 3, answer: '100' },
        ],
        template: 'if ([1] [2] [3])',
        options: ['score', '!=', '100', '==', '>='],
      },
      {
        question: 'Make a condition that checks if x is equal to 10 or y is greater than 5:',
        interactive: true,
        blanks: [
          { id: 1, answer: '==' },
          { id: 2, answer: '||' },
          { id: 3, answer: '>' },
        ],
        template: 'if (x [1] 10 [2] y [3] 5)',
        options: ['==', '||', '>', '&&', '!=', '<'],
      },
    ],
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the program that checks if a person qualifies for the basketball team based on age and height:`,
    codingTask: {
      blanks: [
        { id: 1, answer: '>=' },
        { id: 2, answer: '&&' },
        { id: 3, answer: '>=' },
      ],
      options: ['>=', '<=', '&&', '||', '==', '!='],
      template: `#include <stdio.h>
int main() {
    int age = 20;
    int height = 170;

    if (age [1] 18 [2] height [3] 160) {
        printf("You can join the basketball team!");
    } else {
        printf("Sorry, you don't meet the requirements.");
    }

    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int age = 20;
    int height = 170;

    if (age >= 18 && height >= 160) {
        printf("You can join the basketball team!");
    } else {
        printf("Sorry, you don't meet the requirements.");
    }

    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

- Conditions control decisions using true or false results.
- Relational operators compare values (>, <, ==, !=, etc.).
- Logical operators combine conditions (&&, ||, !).
- Combining conditions helps build smarter and more precise decisions in your code.`,
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
