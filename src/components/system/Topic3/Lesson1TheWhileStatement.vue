<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { lesson1References } from '../Dashboard/Data/references/topic3/lesson1References'

const lessonTitle = 'Lesson 1: The While Statement'
const lessonDescription = 'Understanding while loops in C programming'
const topicId = 3 // Topic
const lessonId = 1 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Think of learning something new — like riding a bike. You keep trying while you still need practice. Once you learn it, you stop.

A while loop in programming works the same way!

🌀 It repeats the same steps while a condition is true.
🛑 It stops when the condition is no longer true.`,
  },
  {
    id: 2,
    title: 'What is a While Statement?',
    content: `The while statement is a type of looping control structure in C. It allows you to repeat a block of code as long as a condition remains true.

Syntax:`,
    code: `while (condition) {
    // statements to execute repeatedly
}`,
    explanation: `🧩 Explanation:
• The condition is checked before the loop runs.
• If it's true, the statements inside { } execute.
• After executing, the condition is checked again.
• The loop stops when the condition becomes false.

💡 Think of it as:
👉 "Keep doing this while this condition is true."`,
  },
  {
    id: 3,
    title: 'Example Program',
    content: `Let's see a simple C program that uses a while loop 👇`,
    code: `#include <stdio.h>
int main() {
    int count = 1;
    while (count <= 5) {
        printf("%d ", count);
        count++;
    }
    return 0;
}`,
    explanation: `🧠 Step-by-step explanation:
1️⃣ The loop starts with count = 1.
2️⃣ It checks count <= 5. If true, it runs the code inside { }.
3️⃣ Prints the current number.
4️⃣ Increases count by 1 (count++).
5️⃣ Repeats the check until count becomes 6.
6️⃣ Then it stops.

🖥️ Output:
1 2 3 4 5`,
  },
  {
    id: 4,
    title: 'Common Mistake: Infinite Loop',
    content: `Be careful! 😱 If you forget to update your loop variable, your program will never stop.

❌ Example (Infinite Loop):`,
    code: `int num = 1;
while (num <= 5) {
    printf("%d ", num);
    // forgot num++ here!
}`,
    explanation: `💡 Since num never changes, num <= 5 is always true — the loop runs forever.

✅ Always make sure the condition will eventually become false.`,
  },
  {
    id: 5,
    title: 'Check for Understanding (1)',
    multipleQuiz: [
      {
        question: 'What does the while loop do in C?\nIt repeats code [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'as long as a condition is true' }],
        template: 'Answer: [1]',
        options: ['until the program ends', 'as long as a condition is true', 'only one time'],
      },
    ],
  },
  {
    id: 6,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question:
          'What happens if the condition is false when the program first reaches the while loop?\nThe statements inside { } are [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'skipped' }],
        template: 'Answer: [1]',
        options: ['executed once', 'skipped', 'repeated infinitely'],
      },
    ],
  },
  {
    id: 7,
    title: 'Guided Exercise (How Many Times?)',
    content: `How many times will this loop execute?`,
    code: `int x = 3;
while (x <= 6) {
    printf("%d ", x);
    x++;
}`,
    quiz: {
      question: 'How many times will this loop execute?',
      options: ['2 times', '3 times', '4 times', '5 times'],
      answer: '4 times',
    },
    explanation: `💬 Explanation: The loop runs while x <= 6, starting from x = 3.
✅ The values printed are 3, 4, 5, and 6 → total of 4 loops.`,
  },
  {
    id: 8,
    title: 'Debug the Error (Find the Mistake)',
    content: `Find and fix the problem in this code:`,
    code: `int i = 1;
while (i <= 3);
{
    printf("%d ", i);
    i++;
}`,
    quiz: {
      question: 'What is wrong with this code?',
      options: [
        'Missing semicolon',
        'Extra semicolon after while',
        'Condition is wrong',
        'Needs another variable',
      ],
      answer: 'Extra semicolon after while',
    },
    explanation: `💬 Explanation: The semicolon (;) after the while condition ends the loop early.

✅ Correct version:
\`\`\`c
while (i <= 3) {
    printf("%d ", i);
    i++;
}
\`\`\``,
  },
  {
    id: 9,
    title: 'Check for Understanding (3)',
    multipleQuiz: [
      {
        question: 'Which part of the loop ensures that it eventually stops?',
        interactive: true,
        blanks: [{ id: 1, answer: 'the update statement' }],
        template: 'Answer: [1]',
        options: ['the update statement', 'the print statement', 'the variable declaration'],
      },
    ],
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• The while statement repeats a block of code while a condition is true.
• The condition is checked before each repetition.
• If it's false from the start, the loop body won't run.
• Always include an update statement to avoid infinite loops.
• Used when the number of repetitions is unknown ahead of time.`,
  },
  {
    id: 1,
    title: 'References',
    references: lesson1References,
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
