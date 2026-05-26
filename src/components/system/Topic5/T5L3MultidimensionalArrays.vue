<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { lesson3References } from '../Dashboard/Data/references/topic5/lesson3References.js'

const lessonTitle = 'Lesson 3: Multidimensional Arrays'
const lessonDescription = 'Understanding multidimensional arrays in C programming'
const topicId = 5 // Topic
const lessonId = 3 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine a seating chart in a classroom 🪑.
You can picture it as rows and columns:
• Row 1: Ana, Ben, Carl
• Row 2: Dana, Eli, Fay

💡 Each seat has a row and a column position — just like data in a multidimensional array!

In programming, a multidimensional array lets you store values in tables, grids, or matrices — instead of just a single list.`,
  },
  {
    id: 2,
    title: 'Concept Explanation (What Is a Multidimensional Array?)',
    content: [
      {
        type: 'text',
        value: `A multidimensional array is an array of arrays — meaning it can store data in more than one dimension (rows, columns, etc.).

🧩 Syntax for a 2D Array:`,
      },
      {
        type: 'code',
        value: `dataType arrayName[row][column];`,
      },
      {
        type: 'text',
        value: `✅ Example:`,
      },
      {
        type: 'code',
        value: `int scores[2][3];`,
      },
      {
        type: 'text',
        value: `💬 This creates a 2D array with:
• 2 rows
• 3 columns (total of 6 elements)`,
      },
    ],
  },
  {
    id: 3,
    title: 'Concept Explanation (Declaring and Initializing a 2D Array)',
    content: [
      {
        type: 'text',
        value: `You can initialize a 2D array like this:`,
      },
      {
        type: 'code',
        value: `int scores[2][3] = {
    {85, 90, 80},
    {75, 88, 92}
};`,
      },
      {
        type: 'text',
        value: `💬 Think of it as a table:`,
      },
    ],
    explanation: `<table>
  <thead>
    <tr>
      <th>Row</th>
      <th>Col 1</th>
      <th>Col 2</th>
      <th>Col 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>85</td>
      <td>90</td>
      <td>80</td>
    </tr>
    <tr>
      <td>1</td>
      <td>75</td>
      <td>88</td>
      <td>92</td>
    </tr>
  </tbody>
</table>

• scores[0][0] → 85
• scores[1][2] → 92`,
  },
  {
    id: 4,
    title: 'Guided Example',
    code: `#include <stdio.h>

int main() {
    int table[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", table[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
    explanation: `💬 Explanation (Line by Line):
• int table[2][3] → creates 2 rows × 3 columns.
• The nested loops go through each element row by row.

Output:
1 2 3
4 5 6`,
  },
  {
    id: 5,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'How many total elements are in int nums[3][4];?',
      options: ['6', '7', '12'],
      answer: '12',
    },
  },
  {
    id: 6,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'What does scores[1][2] represent?',
      options: ['Row 1, Column 2 element', 'Row 2, Column 3 element', 'Row 0, Column 1 element'],
      answer: 'Row 2, Column 3 element',
    },
    explanation: `💬 Remember: arrays start counting from 0!`,
  },
  {
    id: 7,
    title: 'Concept Extension (3D Arrays)',
    content: [
      {
        type: 'text',
        value: `You can also create 3D arrays, which store data in layers (like boxes stacked in a shelf).

🧩 Syntax:`,
      },
      {
        type: 'code',
        value: `int cube[2][3][4];`,
      },
      {
        type: 'text',
        value: `💬 This creates:
• 2 layers
• 3 rows per layer
• 4 columns per row
• Total elements = 2 × 3 × 4 = 24

✅ Example Use:
A 3D array could represent student grades from
2 semesters, 3 subjects, and 4 quizzes each.`,
      },
    ],
  },
  {
    id: 8,
    title: 'Quick Practice (Fill in the Blanks)',
    content: `Fill in the blanks to declare a 2D array of 2 rows and 2 columns and print the element in row 2, column 1.`,
    code: `#include <stdio.h>

int main() {
    [_____] nums[2][2] = {
        {10, 20},
        {30, 40}
    };

    printf("%d", nums[1][____]);
    return 0;
}`,
    multipleQuiz: [
      {
        question: 'Fill in the blanks:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'int' },
          { id: 2, answer: '0' },
        ],
        template: '[1] nums[2][2] = {...}; printf("%d", nums[1][[2]]);',
        options: ['int', '0', '1', 'float'],
      },
    ],
    explanation: `💬 Output: 30`,
  },
  {
    id: 9,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'What is the main use of a multidimensional array?',
      options: [
        'To store a list of single values',
        'To organize data in rows and columns',
        'To save more memory space',
      ],
      answer: 'To organize data in rows and columns',
    },
  },
  {
    id: 10,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the missing parts to print all elements of a 3×3 matrix.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'int' },
        { id: 2, answer: 'int' },
        { id: 3, answer: 'matrix[i][j]' },
      ],
      options: ['int', 'matrix[i][j]', 'matrix[j][i]', 'float'],
      template: `#include <stdio.h>

int main() {
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    for ([1] i = 0; i < 3; i++) {
        for ([2] j = 0; j < 3; j++) {
            printf("%d ", [3]);
        }
        printf("\\n");
    }
    return 0;
}`,
      correctCode: `#include <stdio.h>

int main() {
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
    },
    explanation: `🧠 Output:
1 2 3
4 5 6
7 8 9`,
  },
  {
    id: 11,
    title: 'Lesson Takeaways',
    content: `🧠 What You Learned:

• Multidimensional arrays store data in multiple dimensions (2D, 3D, etc.).
• A 2D array is like a table with rows and columns.
• Syntax: dataType name[rows][columns];
• Use nested loops to access all elements.
• Array indexes start from 0.
• 3D arrays can represent data with multiple layers (like semester, subject, and quiz).`,
  },
  {
    id: 12,
    title: 'References',
    references: lesson3References,
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
