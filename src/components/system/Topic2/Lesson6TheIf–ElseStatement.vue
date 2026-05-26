<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { lesson6References } from '../Dashboard/Data/references/topic2/lesson6References'

const lessonTitle = 'Lesson 6: The If–Else Statement'
const lessonDescription = 'Understanding if-else statements in C programming'
const topicId = 2 // Topic
const lessonId = 6 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `When you code, you often face two choices:
👉 If your logic works — celebrate!
👉 Else — debug it! 😅

That's the idea behind the if–else statement. It helps your program make a binary decision:
• one action if the condition is true,
• a different action if it's false.

The if–else statement lets your program respond intelligently to conditions.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `The if–else statement checks a condition and runs one of two possible blocks.

Syntax:`,
    code: `if (condition) {
    // runs if condition is true
} else {
    // runs if condition is false
}`,
    explanation: `✅ Example:
\`\`\`c
int age = 18;
if (age >= 18) {
    printf("You are an adult.");
} else {
    printf("You are a minor.");
}
\`\`\`

💡 How it works:
• If the condition (age >= 18) is true, it prints "You are an adult."
• If not, it prints "You are a minor."`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'What keyword is used to handle the false condition in an if–else statement?',
      options: ['if', 'else', 'when', 'switch'],
      answer: 'else',
    },
  },
  {
    id: 4,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question: 'The if block runs [______] the condition is true.',
        interactive: true,
        blanks: [{ id: 1, answer: 'only if' }],
        template: 'Answer: [1]',
        options: ['only if', 'even if not'],
      },
    ],
  },
  {
    id: 5,
    title: 'Guided Example',
    content: `Example Code:`,
    code: `#include <stdio.h>
int main() {
    int score;
    printf("Enter your score: ");
    scanf("%d", &score);
    if (score >= 75) {
        printf("You passed!");
    } else {
        printf("You failed.");
    }
    return 0;
}`,
    explanation: `Explanation line by line:

• if (score >= 75) → checks if the score meets the passing mark.
• If true → prints "You passed!"
• If false → prints "You failed."
• This is a simple if–else decision process.`,
  },
  {
    id: 6,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'If score = 60, which message will display?',
      options: ['You passed!', 'You failed.'],
      answer: 'You failed.',
    },
  },
  {
    id: 7,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question:
          'Fill in the blanks to complete the missing keywords in this program:\nif (num ___ 0) {\n    printf("Positive number");\n} [___] {\n    printf("Negative number");\n}',
        interactive: true,
        blanks: [
          { id: 1, answer: '>=' },
          { id: 2, answer: 'else' },
        ],
        template: 'if (num [1] 0) { ... } [2] { ... }',
        options: ['else', '==', '>=', '<='],
      },
    ],
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Drag and drop the correct choices to complete the program that checks whether a number is even or odd.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'scanf' },
        { id: 2, answer: 'num' },
        { id: 3, answer: '%' },
        { id: 4, answer: '==' },
        { id: 5, answer: 'printf' },
        { id: 6, answer: 'else' },
        { id: 7, answer: 'printf' },
      ],
      options: ['scanf', 'num', '%', '==', 'else', 'printf', 'printf'],
      template: `#include <stdio.h>
int main() {
    int num;
    printf("Enter a number: ");
    [1]("%d", &[2]);
    if (num [3] 2 [4] 0) {
        [5]("Even number");
    } [6] {
        [7]("Odd number");
    }
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);
    if (num % 2 == 0) {
        printf("Even number");
    } else {
        printf("Odd number");
    }
    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• The if–else statement handles two possible outcomes.
• The if block runs when the condition is true.
• The else block runs when the condition is false.
• Used to make programs respond differently to data or user input.

Think of it as "If this happens — do this, else — do that."`,
  },
  {
    id: 10,
    title: 'References',
    references: lesson6References,
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
