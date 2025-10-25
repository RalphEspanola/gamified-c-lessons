<script setup>
import LessonSlides from '../../LessonSlides/LessonSlides.vue'

const lessonTitle = 'Lesson 5: String Formatter'
const lessonDescription = 'Understanding format specifiers in C'

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine you're filling out a form. Some fields ask for numbers, some for text, some for single letters. In C, we need format specifiers to tell the program how to correctly read and display different kinds of data.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `Common format specifiers in C:

• %d → int (whole numbers)
• %f → float (decimals)
• %c → char (single character)
• %s → string (word or text)
• %.2f → float with 2 decimal places`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    multipleQuiz: [
      {
        question: 'Which format specifier is used to display a single character?',
        interactive: true,
        blanks: [{ id: 1, answer: '%c' }],
        template: 'Answer: [1]',
        options: ['&', '%c', '%d', '%f'],
      },
      {
        question: 'Which format specifier is used to display a whole number?',
        interactive: true,
        blanks: [{ id: 1, answer: '%d' }],
        template: 'Answer: [1]',
        options: ['&', '%c', '%d', '%f'],
      },
    ],
  },
  {
    id: 4,
    title: 'Guided Example',
    content: `Example Code:`,
    code: `#include <stdio.h>
int main() {
    int age = 18;
    float gpa = 3.75;
    char grade = 'A';
    char name[] = "Badang";
    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
    printf("Grade: %c\\n", grade);
    return 0;
}`,
    explanation: `Explanation line by line:

• %s → prints a string.
• %d → prints an integer.
• %.2f → prints float with 2 decimal places.
• %c → prints a single character.`,
  },
  {
    id: 5,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'If you want to print a float with 3 decimal places, which specifier do you use?',
      options: ['%.3f', '%.3d', '%.3c'],
      answer: '%.3f',
    },
  },
  {
    id: 6,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'What will be the output of this code?\nfloat pi = 3.14159;\nprintf("%.2f", pi);',
      options: ['3.14', '3.14159', '3.1', '3'],
      answer: '3.14',
    },
  },
  {
    id: 7,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question:
          'Fill in the blank to correctly print the string variable city:\nchar city[] = "Manila";\nprintf("City: ___", city);',
        interactive: true,
        blanks: [{ id: 1, answer: '%s' }],
        template: 'printf("City: [1]", city);',
        options: ['%s', '%d', '%c', '%f'],
      },
    ],
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Fill and complete the code below:`,
    codingTask: {
      blanks: [
        { id: 1, answer: '%s' },
        { id: 2, answer: '%d' },
        { id: 3, answer: '%.2f' },
        { id: 4, answer: '%c' },
      ],
      options: ['%s', '%d', '%.2f', '%c', '%f', '%.3f'],
      template: `#include <stdio.h>
int main() {
    int age = 18;
    float gpa = 3.75;
    char grade = 'A';
    char name[] = "Badang";
    printf("Name: [1]\\n", name);
    printf("Age: [2]\\n", age);
    printf("GPA: [3]\\n", gpa);
    printf("Grade: [4]\\n", grade);
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int age = 18;
    float gpa = 3.75;
    char grade = 'A';
    char name[] = "Badang";
    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
    printf("Grade: %c\\n", grade);
    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• Format specifiers tell C how to handle variables in input/output.
• %d, %f, %c, %s are the most common.
• Use precision like %.2f for decimal places.
• Always match the specifier to the variable type.`,
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
