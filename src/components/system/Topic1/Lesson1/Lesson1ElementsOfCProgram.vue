<script setup>
import LessonSlides from '../../LessonSlides/LessonSlides.vue'

const lessonTitle = 'Lesson 1: Elements of a C Program'
const lessonDescription = 'Learn the basic structure of C programs'

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine writing a recipe: you list ingredients, then give step-by-step instructions.
A C program works the same way — it needs a structure before the computer can "follow instructions."`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `A simple C program has four main parts:

**Preprocessor directive** → tells the compiler which libraries to use.
  Example: #include <stdio.h> for input/output.

**main() function** → the program starts here.

**Statements** → actual instructions inside { }.

**return 0;** → tells the computer the program ended successfully.`,
  },
  {
    id: 3,
    title: 'Check for Understanding',
    quiz: {
      question: 'What tells the compiler which library to use in a program?',
      options: ['main() function', 'Statements', 'Preprocessor directive'],
      answer: 'Preprocessor directive',
    },
  },
  {
    id: 4,
    title: 'Guided Example',
    content: `Example:`,
    code: `#include <stdio.h>
int main() {
  printf("Hello!");
  return 0;
}`,
    explanation: `**Explanation line by line:**

• #include <stdio.h> → allows us to use printf().
• int main() → defines the starting point.
• { ... } → holds the program's instructions.
• printf("Hello!"); → displays text.
• return 0; → program finishes without errors.`,
  },
  {
    id: 5,
    title: 'Quick Practice',
    quiz: {
      question: 'Which function is always required in a C program?',
      options: ['main()', 'printf()', 'return()', 'start()'],
      answer: 'main()',
    },
  },
  {
    id: 6,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the program by filling in the blanks:`,
    codingTask: {
      blanks: [
        { id: 1, answer: '#' },
        { id: 2, answer: 'int' },
        { id: 3, answer: 'printf' },
        { id: 4, answer: ';' },
        { id: 5, answer: 'return' },
        { id: 6, answer: ';' },
        { id: 7, answer: '}' },
      ],
      options: ['#', 'int', 'printf', 'return', '}', ';', ';'],
      template: `[1]include <stdio.h>
[2] main() {
  [3]("Welcome to ITE 12")[4]
  [5] 0[6]
[7]`,
      correctCode: `#include <stdio.h>
int main() {
  printf("Welcome to ITE 12");
  return 0;
}`,
    },
  },
  {
    id: 7,
    title: 'Lesson Takeaways',
    content: `**Key Points to Remember:**

• Every C program starts with **main()**.

• #include <stdio.h> lets us use input/output functions.

• return 0; ends the program successfully.

• All statements must end with a semicolon (;).`,
  },
]
</script>

<template>
  <LessonSlides
    :lesson-title="lessonTitle"
    :lesson-description="lessonDescription"
    :slides="slides"
    back-route="/"
    complete-route="/"
  />
</template>
