<script setup>
import LessonSlides from '../../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 3: Executable Statements (Input & Output)'
const lessonDescription = 'Master input and output operations'
const topicId = 1 // Topic 1
const lessonId = 3 // Lesson 2

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine having a conversation: one person speaks, and the other listens. In C, printf() is speaking (output), and scanf() is listening (input). Executable statements make your program interactive.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `• printf() → displays output on the screen.
- scanf() → reads input from the user.
- Every statement must end with a semicolon ;.

Example:`,
    code: `int number;
printf("Enter a number: ");
scanf("%d", &number);`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'Which function is used to display output?',
      options: ['printf()', 'scanf()', 'display()', 'output()'],
      answer: 'printf()',
    },
  },
  {
    id: 4,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'Which symbol is required in scanf() to store input into a variable?',
      options: ['&', '*', '#', '%'],
      answer: '&',
    },
  },
  {
    id: 5,
    title: 'Guided Example',
    content: `Example Code:`,
    code: `#include <stdio.h>
int main() {
    int number;
    printf("Enter a number: ");  // ask user
    scanf("%d", &number);        // read user input
    printf("You entered: %d", number);
    return 0;
}`,
    explanation: `Explanation line by line:

- int number; → declares a variable.
- printf("Enter a number: "); → prompts the user.
- scanf("%d", &number); → reads input into number.
- printf("You entered: %d", number); → displays the input.`,
  },
  {
    id: 6,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question: 'Fill in the blank: scanf("___", &x); → to read an integer value.',
        interactive: true,
        blanks: [{ id: 1, answer: '%d' }],
        template: 'scanf("[1]", &x);',
        options: ['%d', '%f', '%c', '%s'],
      },
      {
        question: 'Complete the printf statement:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'printf' },
          { id: 2, answer: ';' },
        ],
        template: '[1]("Hello World")[2]',
        options: ['printf', 'scanf', ';', '&'],
      },
      {
        question: 'Complete the scanf statement:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'scanf' },
          { id: 2, answer: '%d' },
          { id: 3, answer: '&' },
        ],
        template: '[1]("[2]", [3]num);',
        options: ['scanf', 'printf', '%d', '&', '%f'],
      },
    ],
  },
  {
    id: 7,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the program that asks the user to enter a number and then displays it back:`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'number' },
        { id: 2, answer: 'printf' },
        { id: 3, answer: 'scanf' },
        { id: 4, answer: '%d' },
        { id: 5, answer: '&' },
      ],
      options: ['&', 'number', 'scanf', '%d', 'printf', '%c'],
      template: `#include <stdio.h>
int main() {
    int [1];
    [2]("Enter a number: ");
    [3]("[4]", [5]number);
    printf("You entered: %d", number);
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int number;
    printf("Enter a number: ");
    scanf("%d", &number);
    printf("You entered: %d", number);
    return 0;
}`,
    },
  },
  {
    id: 8,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

- Use printf() for output.
- Use scanf() for input.
- Always use & before variables in scanf().
- Statements must end with a semicolon ;.
- Format specifiers: %d for int, %f for float, %c for char.`,
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
