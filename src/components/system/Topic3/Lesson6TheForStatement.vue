<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'

const lessonTitle = 'Lesson 6: The For Statement'
const lessonDescription = 'Understanding for loops in C programming'

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine you're doing 10 jumping jacks 🏋️. You know exactly how many times you'll repeat.

You count from 1 to 10 — one by one — until you're done.

That's how the for loop works in programming! It repeats a set of actions a specific number of times — perfect when you know how many repetitions you need.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `A for loop lets you execute a block of code a fixed number of times.

Syntax:`,
    code: `for (initialization; condition; update) {
    // statements
}`,
    explanation: `🧩 Explanation of parts:

<table>
  <thead>
    <tr>
      <th>Part</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Initialization</td>
      <td>Sets the starting value (e.g., int i = 1;)</td>
    </tr>
    <tr>
      <td>Condition</td>
      <td>Loop continues while this is true (e.g., i <= 5)</td>
    </tr>
    <tr>
      <td>Update</td>
      <td>Changes the value each time (e.g., i++)</td>
    </tr>
  </tbody>
</table>

💡 All three parts are written on one line, making the for loop shorter and cleaner than while.`,
  },
  {
    id: 3,
    title: 'Example Program: Counting from 1 to 5',
    code: `#include <stdio.h>
int main() {
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    return 0;
}`,
    explanation: `🧠 Explanation:
• int i = 1; → starts at 1
• i <= 5; → runs while true
• i++ → increases i each loop
• When i becomes 6, loop stops

💻 Output:
1 2 3 4 5`,
  },
  {
    id: 4,
    title: 'Check for Understanding (1)',
    multipleQuiz: [
      {
        question: 'What part of the for loop controls how long it runs?',
        interactive: true,
        blanks: [{ id: 1, answer: 'condition' }],
        template: 'Answer: [1]',
        options: ['initialization', 'condition', 'update'],
      },
    ],
  },
  {
    id: 5,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question: 'Which part of the for loop is executed first?',
        interactive: true,
        blanks: [{ id: 1, answer: 'initialization' }],
        template: 'Answer: [1]',
        options: ['condition', 'update', 'initialization'],
      },
    ],
  },
  {
    id: 6,
    title: 'Guided Example (Sum of Numbers)',
    content: `Let's add the numbers 1 to 5 using a for loop 👇`,
    code: `#include <stdio.h>
int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum = sum + i;
    }
    printf("Sum = %d", sum);
    return 0;
}`,
    explanation: `💡 Explanation:
• Starts with i = 1
• Repeats while i <= 5
• Adds each number to sum
• Stops when i becomes 6

💻 Output:
Sum = 15`,
  },
  {
    id: 7,
    title: 'Quick Practice',
    content: `Fill in the blanks to complete the loop that prints numbers 10 down to 1:`,
    code: `for (int x = 10; x ___ 1; x___) {
    printf("%d ", x);
}`,
    multipleQuiz: [
      {
        question: 'Fill in the condition and update:',
        interactive: true,
        blanks: [
          { id: 1, answer: '>=' },
          { id: 2, answer: '--' },
        ],
        template: 'for (int x = 10; x [1] 1; x[2])',
        options: ['>=', '<=', '--', '++'],
      },
    ],
    explanation: `💬 The loop starts at 10, goes down by 1, and stops when x becomes less than 1.`,
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Drag and drop the correct parts to complete the for loop program:
🔢 Print Even Numbers 2 to 10`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'for' },
        { id: 2, answer: 'printf' },
      ],
      options: ['for', 'while', 'printf', 'if', 'switch'],
      template: `#include <stdio.h>
int main() {
    [1] (int i = 2; i <= 10; i = i + 2) {
        [2]("%d ", i);
    }
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    for (int i = 2; i <= 10; i = i + 2) {
        printf("%d ", i);
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
        question: 'When is a for loop best used?\nWhen the number of repetitions is [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'known in advance' }],
        template: 'Answer: [1]',
        options: ['unknown', 'known in advance', 'random'],
      },
    ],
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• The for loop repeats actions a fixed number of times.
• It has three parts: initialization, condition, and update.
• All loop control statements are written on one line.
• Use it when the number of repetitions is known ahead of time.
• It's cleaner and easier to read than equivalent while loops.`,
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
