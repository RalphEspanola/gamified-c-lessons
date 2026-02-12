<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'

const lessonTitle = 'END OF TOPIC QUIZ — Topic 5: Array and String Manipulations'
const lessonDescription = 'Test your understanding of arrays and string operations'
const topicId = 4
const slides = [
  {
    id: 1,
    title: 'Question 1 – Array Basics',
    multipleQuiz: [
      {
        question:
          'An array is a collection of elements of the same data type stored in [_____] memory locations.',
        interactive: true,
        blanks: [{ id: 1, answer: 'consecutive' }],
        template: 'Answer: [1]',
        options: ['separate', 'consecutive', 'random'],
      },
    ],
  },
  {
    id: 2,
    title: 'Question 2 – Array Declaration',
    content: `To declare an array that can store 5 student grades with decimal values, write:`,
    code: `[_____] grades[5];`,
    multipleQuiz: [
      {
        question: 'Fill in the data type:',
        interactive: true,
        blanks: [{ id: 1, answer: 'float' }],
        template: '[1] grades[5];',
        options: ['char', 'int', 'float'],
      },
    ],
    explanation: `💬 Explanation:
Since grades can include decimal numbers, the correct type is float.`,
  },
  {
    id: 3,
    title: 'Question 3 – Array Indexing',
    quiz: {
      question: 'Array indexes in C always start at 1.',
      options: ['True', 'False'],
      answer: 'False',
    },
    explanation: `💬 Explanation:
Indexes in C start at 0.`,
  },
  {
    id: 4,
    title: 'Question 4 – Array Access',
    content: `Fill in the missing part to access the third element of an array called scores:`,
    code: `scores[_____]`,
    multipleQuiz: [
      {
        question: 'Fill in the index:',
        interactive: true,
        blanks: [{ id: 1, answer: '2' }],
        template: 'scores[[1]]',
        options: ['0', '1', '2', '3'],
      },
    ],
    explanation: `💬 Explanation:
The first element is index 0, so the third element is index 2.`,
  },
  {
    id: 5,
    title: 'Question 5 – 2D Arrays',
    multipleQuiz: [
      {
        question: 'A 2D array can be visualized as a [_____] of rows and columns.',
        interactive: true,
        blanks: [{ id: 1, answer: 'grid' }],
        template: 'Answer: [1]',
        options: ['list', 'grid', 'loop'],
      },
    ],
  },
  {
    id: 6,
    title: 'Question 6 – 2D Array Declaration',
    quiz: {
      question: 'What is the correct declaration for a 2D array with 3 rows and 4 columns?',
      options: ['int data[3,4];', 'int data[3][4];', 'int data{3,4};'],
      answer: 'int data[3][4];',
    },
  },
  {
    id: 7,
    title: 'Question 7 – String Functions',
    multipleQuiz: [
      {
        question:
          'To find how many characters are in a string (excluding \\0), use the function [_____].',
        interactive: true,
        blanks: [{ id: 1, answer: 'strlen()' }],
        template: 'Answer: [1]',
        options: ['strcat()', 'strlen()', 'strcpy()'],
      },
    ],
  },
  {
    id: 8,
    title: 'Question 8 – String Copy',
    content: `Fill in the missing part to copy one string into another:`,
    code: `[_____](destination, source);`,
    multipleQuiz: [
      {
        question: 'Fill in the function name:',
        interactive: true,
        blanks: [{ id: 1, answer: 'strcpy' }],
        template: '[1](destination, source);',
        options: ['strcpy', 'strcat', 'strcmp', 'strlen'],
      },
    ],
  },
  {
    id: 9,
    title: 'Question 9 – String Concatenation',
    content: `Complete the missing part to join two strings.`,
    code: `char word1[20] = "Hello ";
char word2[] = "World!";
[_____](word1, word2);
printf("%s", word1);`,
    multipleQuiz: [
      {
        question: 'Fill in the function name:',
        interactive: true,
        blanks: [{ id: 1, answer: 'strcat' }],
        template: '[1](word1, word2);',
        options: ['strcat', 'strcpy', 'strcmp', 'strlen'],
      },
    ],
    explanation: `🧠 Output:
Hello World!`,
  },
  {
    id: 10,
    title: 'Question 10 – String Comparison',
    quiz: {
      question: 'The function strcmp() returns 0 if two strings are exactly the same.',
      options: ['True', 'False'],
      answer: 'True',
    },
  },
  {
    id: 11,
    title: 'Question 11 – Null Terminator',
    multipleQuiz: [
      {
        question: 'In C, the null character (\\0) marks the [_____] of a string.',
        interactive: true,
        blanks: [{ id: 1, answer: 'end' }],
        template: 'Answer: [1]',
        options: ['start', 'middle', 'end'],
      },
    ],
  },
  {
    id: 12,
    title: 'Question 12 – 2D Array Data Type',
    content: `Fill in the missing data type:`,
    code: `[_____] matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};`,
    multipleQuiz: [
      {
        question: 'Fill in the data type:',
        interactive: true,
        blanks: [{ id: 1, answer: 'int' }],
        template: '[1] matrix[2][3] = {...};',
        options: ['int', 'float', 'char', 'double'],
      },
    ],
  },
  {
    id: 13,
    title: 'Question 13 – Array Loop',
    content: `Complete the missing code to print all elements of a 1D array.`,
    code: `int nums[3] = {10, 20, 30};
for (int i = 0; i < [____]; i++) {
    printf("%d ", nums[i]);
}`,
    multipleQuiz: [
      {
        question: 'Fill in the loop condition:',
        interactive: true,
        blanks: [{ id: 1, answer: '3' }],
        template: 'for (int i = 0; i < [1]; i++)',
        options: ['2', '3', '4', 'nums'],
      },
    ],
    explanation: `🧠 Output:
10 20 30`,
  },
  {
    id: 14,
    title: 'Question 14 – String Function Purpose',
    multipleQuiz: [
      {
        question: 'The strcat() function is used to [_____] two strings together.',
        interactive: true,
        blanks: [{ id: 1, answer: 'add/join' }],
        template: 'Answer: [1]',
        options: ['compare', 'add/join', 'copy'],
      },
    ],
  },
  {
    id: 15,
    title: 'Question 15 – String Comparison Code',
    content: `Fill in the blanks to compare two strings and print "Match!" if they are the same.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'strcmp' },
        { id: 2, answer: '==' },
      ],
      options: ['strcmp', 'strcat', '==', '!='],
      template: `#include <stdio.h>
#include <string.h>

int main() {
    char str1[] = "Code";
    char str2[] = "Code";

    if ([1](str1, str2) [2] 0) {
        printf("Match!");
    } else {
        printf("Not Match!");
    }

    return 0;
}`,
      correctCode: `#include <stdio.h>
#include <string.h>

int main() {
    char str1[] = "Code";
    char str2[] = "Code";

    if (strcmp(str1, str2) == 0) {
        printf("Match!");
    } else {
        printf("Not Match!");
    }

    return 0;
}`,
    },
    explanation: `🧠 Output:
Match!

💬 Explanation:
strcmp() compares two strings.
It returns 0 when the strings are equal, so the condition becomes true.`,
  },
]
</script>

<template>
  <LessonSlides
    mode="quiz"
    :lesson-title="lessonTitle"
    :lesson-description="lessonDescription"
    :slides="slides"
    :topic-id="topicId"
    back-route="/"
    complete-route="/"
    @quiz-complete="handleQuizComplete"
  />
</template>
