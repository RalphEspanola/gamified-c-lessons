<script setup>
import LessonSlides from '../../LessonSlides/LessonSlides.vue'

const lessonTitle = 'Lesson 2: Variables and Data Types'
const lessonDescription = 'Understanding variables and data types in C'
const topicId = 1 // Topic 1
const lessonId = 2 // Lesson 2
function handleLessonComplete() {
  console.log('✅ Lesson 1 completed!')
}

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Think of variables as labeled boxes where you store different kinds of things. In coding, these boxes hold numbers, letters, or text. Just like you can't put soup in a jewelry box, in C you must choose the right data type for each variable.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `Common data types in C:

• int → whole numbers (e.g., 25, -10, 0)
• float → decimal numbers (e.g., 3.14, -2.5)
• char → single characters (e.g., 'A', 'b', '1')
• double → larger decimal numbers (more precision than float)

Variables must be declared with a type before use:`,
    code: `int age = 20;
float gpa = 3.5;
char grade = 'A';`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    quiz: {
      question: "Which data type is best for storing a person's age?",
      options: ['int', 'float', 'char', 'double'],
      answer: 'int',
    },
  },
  {
    id: 4,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'Which of the following stores a single character?',
      options: ['int', 'float', 'char', 'double'],
      answer: 'char',
    },
  },
  {
    id: 5,
    title: 'Guided Example',
    content: `Example Code:`,
    code: `#include <stdio.h>
int main() {
    int age = 20;        // integer variable
    float gpa = 3.5;     // decimal value
    char initial = 'N';  // single character
    printf("Age: %d\\n", age);
    printf("GPA: %.1f\\n", gpa);
    printf("Initial: %c\\n", initial);
    return 0;
}`,
    explanation: `Explanation line by line:

• int age = 20; → stores a whole number.
• float gpa = 3.5; → stores a decimal.
• char initial = 'N'; → stores a character.
• printf() uses format specifiers: %d for int, %.1f for float, %c for char.`,
  },
  {
    id: 6,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question: 'Fill in the blank: ______ grade = 89.5;',
        interactive: true,
        blanks: [{ id: 1, answer: 'float' }],
        template: '[1] grade = 89.5;',
        options: ['int', 'float', 'char', 'double'],
      },
      {
        question: 'Make a variable that stores a whole number:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'int' },
          { id: 2, answer: '=' },
          { id: 3, answer: ';' },
        ],
        template: '[1] num [2] 20 [3]',
        options: ['int', 'float', '=', ';'],
      },
      {
        question: 'Make a variable that stores a character:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'char' },
          { id: 2, answer: 'letter' },
          { id: 3, answer: '=' },
          { id: 4, answer: ';' },
        ],
        template: "[1] [2] [3] 'A' [4]",
        options: ['char', 'letter', '=', ';'],
      },
    ],
  },
  {
    id: 7,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the program by filling in the blanks:`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'age' },
        { id: 2, answer: 'float' },
        { id: 3, answer: 'char' },
        { id: 4, answer: '%d' },
        { id: 5, answer: 'gpa' },
        { id: 6, answer: '%c' },
      ],
      options: ['%c', 'age', 'float', 'gpa', 'char', '%d'],
      template: `#include <stdio.h>
int main() {
    int [1] = 20;
    [2] gpa = 3.5;
    [3] initial = 'N';
    printf("Age: [4]\\n", age);
    printf("GPA: %.1f\\n", [5]);
    printf("Initial: [6]\\n", initial);
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int age = 20;
    float gpa = 3.5;
    char initial = 'N';
    printf("Age: %d\\n", age);
    printf("GPA: %.1f\\n", gpa);
    printf("Initial: %c\\n", initial);
    return 0;
}`,
    },
  },
  {
    id: 8,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• Variables store data values in memory.
• Every variable in C must have a data type.
• Common types: int, float, char, double.
• Use the correct format specifier when printing variables:
  - %d for int
  - %f for float
  - %c for char`,
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
