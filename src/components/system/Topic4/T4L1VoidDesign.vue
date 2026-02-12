<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'

const lessonTitle = 'Lesson 1: Top-Down Structured Design with Void Functions'
const lessonDescription = 'Understanding structured design and void functions in C'
const topicId = 4 // Topic
const lessonId = 1 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine you're organizing a group project in class. You don't do everything yourself — one person writes, another designs slides, another presents.

That's how programming works too! 💻 Instead of writing one giant program, we break it into smaller parts called functions — each one doing a specific task.

💡 This is called Top-Down Structured Design — starting from the main idea, then dividing it into smaller, manageable steps.`,
  },
  {
    id: 2,
    title: 'Concept Explanation (Top-Down Design)',
    content: `In Top-Down Design, you:
1️⃣ Start with the main goal of your program.
2️⃣ Divide it into subtasks (steps that can be handled separately).
3️⃣ Write a function for each subtask.

🧩 Example (Concept)
• Main Task: Display a student's report.
• Subtasks:
   • Get input → getStudentInfo()
   • Compute average → computeAverage()
   • Display result → showResult()

Each task is written as its own function — this makes the program easier to read, test, and fix.`,
  },
  {
    id: 3,
    title: 'Concept Explanation (Void Functions)',
    content: `A void function performs an action but doesn't return a value. It's used when a function just does something, like displaying output.

🧩 Syntax:`,
    code: `void functionName() {
    // statements
}`,
    explanation: `💡 Example:
\`\`\`c
void greetUser() {
    printf("Welcome to ITE12!");
}
\`\`\`

This function simply prints a message — no data is sent back.`,
  },
  {
    id: 4,
    title: 'Guided Example',
    content: `Let's use a simple Top-Down Design example.`,
    code: `#include <stdio.h>
void greet();
void goodbye();

int main() {
    greet();
    goodbye();
    return 0;
}

void greet() {
    printf("Hello, programmer!\\n");
}

void goodbye() {
    printf("Goodbye! See you next time!\\n");
}`,
    explanation: `💬 Explanation:
• main() acts as the main control — it calls other functions.
• greet() and goodbye() are void functions — they just print messages.
• This structure makes the code organized and modular.`,
  },
  {
    id: 5,
    title: 'Check for Understanding (1)',
    multipleQuiz: [
      {
        question:
          'What is the main idea behind Top-Down Design?\nIt means breaking a big program into [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'smaller functions' }],
        template: 'Answer: [1]',
        options: ['fast readable codes', 'smaller functions', 'longer codes', 'variables only'],
      },
    ],
  },
  {
    id: 6,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'What does a void function do?',
      options: ['Performs a task but returns no value', 'Returns a value', 'Creates variables'],
      answer: 'Performs a task but returns no value',
    },
  },
  {
    id: 7,
    title: 'Quick Practice (Identify the Function)',
    content: `Which function in this example is a void function?`,
    code: `#include <stdio.h>
void display() {
    printf("Hello World!");
}

int main() {
    display();
    return 0;
}`,
    quiz: {
      question: 'Which is the void function?',
      options: ['main()', 'display()', 'printf()'],
      answer: 'display()',
    },
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the code below to make it print two messages using two void functions.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'void' },
        { id: 2, answer: 'void' },
        { id: 3, answer: 'void' },
        { id: 4, answer: 'void' },
      ],
      options: ['void', 'int', 'void', 'void', 'char', 'void'],
      template: `#include <stdio.h>
[1] intro();
[2] outro();

int main() {
    intro();
    outro();
    return 0;
}

[3] intro() {
    printf("Welcome to C Programming!\\n");
}

[4] outro() {
    printf("Keep practicing functions!\\n");
}`,
      correctCode: `#include <stdio.h>
void intro();
void outro();

int main() {
    intro();
    outro();
    return 0;
}

void intro() {
    printf("Welcome to C Programming!\\n");
}

void outro() {
    printf("Keep practicing functions!\\n");
}`,
    },
  },
  {
    id: 9,
    title: 'Check for Understanding (3)',
    multipleQuiz: [
      {
        question: 'Why are functions important in programming?\nThey help make code [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'easier to read and reuse' }],
        template: 'Answer: [1]',
        options: ['easier to read and reuse', 'longer and confusing', 'slower to run'],
      },
    ],
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: `🧠 What You Learned:

• Top-Down Design = breaking a program into smaller, logical functions.
• Void functions perform actions but don't return values.
• The main() function can call other functions for organization.
• Writing modular functions makes code easier to debug, reuse, and maintain.`,
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
