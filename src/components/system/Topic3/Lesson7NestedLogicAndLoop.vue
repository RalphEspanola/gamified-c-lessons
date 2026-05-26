<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { lesson7References } from '../Dashboard/Data/references/topic3/lesson7References'

const lessonTitle = 'Lesson 7: Nested Logic and Loop'
const lessonDescription = 'Understanding nested loops in C programming'
const topicId = 3 // Topic
const lessonId = 7 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine cleaning your classroom 🧹:
You go row by row — and within each row, desk by desk.

✅ That's a loop inside another loop —
The outer loop moves through rows,
and the inner loop moves through desks in that row.

That's exactly what a nested loop does in programming!

💡 Nested loops are used when you need to repeat actions inside another repetition, like printing tables, checking grids, or drawing shapes.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `A nested loop means one loop inside another loop.
Usually, the outer loop controls rows or groups,
while the inner loop controls columns or details.

Syntax:`,
    code: `for (int i = 1; i <= rows; i++) {         // outer loop
    for (int j = 1; j <= columns; j++) {  // inner loop
        // statements
    }
}`,
    explanation: `🧩 How it works:
• The outer loop runs once → triggers the inner loop.
• The inner loop runs completely for each outer loop cycle.
• When the inner loop finishes, the outer loop continues to its next cycle.`,
  },
  {
    id: 3,
    title: 'Example Program (Multiplication Table)',
    code: `#include <stdio.h>

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            printf("%d ", i * j);
        }
        printf("\\n");
    }
    return 0;
}`,
    explanation: `💻 Output:
1 2 3
2 4 6
3 6 9

🧠 Explanation:
• The outer loop (i) controls rows.
• The inner loop (j) multiplies i by j for each column.
• After printing all columns, a newline (\\n) starts the next row.`,
  },
  {
    id: 4,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'How many times will the inner loop run in total if both loops go from 1 to 3?',
      options: ['3 times', '6 times', '9 times', '12 times'],
      answer: '9 times',
    },
    explanation: `💬 3 (outer) × 3 (inner) = 9 total executions.`,
  },
  {
    id: 5,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'In a nested loop, which loop finishes first?',
      options: ['outer loop', 'inner loop', 'they end together'],
      answer: 'inner loop',
    },
    explanation: `💬 The inner loop repeats fully before the outer loop moves to its next cycle.`,
  },
  {
    id: 6,
    title: 'Guided Example (Star Pattern)',
    content: `Let's create a triangle pattern using nested loops ⭐`,
    code: `#include <stdio.h>

int main() {
    for (int row = 1; row <= 5; row++) {
        for (int col = 1; col <= row; col++) {
            printf("* ");
        }
        printf("\\n");
    }
    return 0;
}`,
    explanation: `💻 Output:
*
* *
* * *
* * * *
* * * * *

🧠 Explanation:
• Outer loop (row) controls the number of lines.
• Inner loop (col) prints stars equal to the current row number.`,
  },
  {
    id: 7,
    title: 'Quick Practice',
    content: `Fill in the blanks to print a 3×3 grid of # symbols:`,
    code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= [___]; j++) {
        printf("# ");
    }
    printf("\\n");
}`,
    multipleQuiz: [
      {
        question: 'Fill in the blank:',
        interactive: true,
        blanks: [{ id: 1, answer: '3' }],
        template: 'for (int j = 1; j <= [1]; j++)',
        options: ['3', 'i', 'j', '5'],
      },
    ],
    explanation: `💬 The inner loop prints 3 symbols for each of the 3 outer loop cycles.`,
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Program Title: 🧮 Multiplication Table (1 to 5)

Drag and drop the missing parts to complete the nested for loop:`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'for' },
        { id: 2, answer: 'for' },
        { id: 3, answer: 'printf' },
        { id: 4, answer: 'printf' },
      ],
      options: ['for', 'printf', 'while', 'switch', 'for', 'printf'],
      template: `#include <stdio.h>

int main() {
    [1] (int i = 1; i <= 5; i++) {
        [2] (int j = 1; j <= 5; j++) {
            [3]("%d\\t", i * j);
        }
        [4]("\\n");
    }
    return 0;
}`,
      correctCode: `#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= 5; j++) {
            printf("%d\\t", i * j);
        }
        printf("\\n");
    }
    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Check for Understanding (3)',
    multipleQuiz: [
      {
        question: 'What does the outer loop usually control in a nested loop?',
        interactive: true,
        blanks: [{ id: 1, answer: 'rows or groups' }],
        template: 'Answer: [1]',
        options: ['rows or groups', 'columns or items', 'functions'],
      },
    ],
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• Nested loops mean a loop inside another loop.
• The inner loop runs completely for each cycle of the outer loop.
• Total executions = (outer loop count) × (inner loop count).
• Common uses: patterns, tables, grids, and 2D data.
• Loops can contain conditional logic (if statements) for more control — that's called nested logic.`,
  },
  {
    id: 11,
    title: 'References',
    references: lesson7References,
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
