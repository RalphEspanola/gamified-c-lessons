<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'

const lessonTitle = 'Lesson 8: The Switch Case Statement'
const lessonDescription = 'Understanding switch-case statements in C programming'
const topicId = 2 // Topic
const lessonId = 8 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine you're choosing what drink to order from a vending machine:
🥤 Press 1 for Coke
🍊 Press 2 for Orange Juice
☕ Press 3 for Coffee

Instead of checking each option with multiple if–else statements, the machine can use a switch case — a cleaner way to handle many possible choices.

In programming, a switch case helps your code decide what to do based on the value of a single variable.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `The switch case statement lets your program choose from many options based on the value of a variable.

Syntax:`,
    code: `switch (expression) {
    case value1:
        // code to run if expression == value1
        break;

    case value2:
        // code to run if expression == value2
        break;

    default:
        // code to run if no cases match
}`,
    explanation: `✅ Example:
\`\`\`c
int choice = 2;

switch (choice) {
    case 1:
        printf("Coke");
        break;
    case 2:
        printf("Orange Juice");
        break;
    case 3:
        printf("Coffee");
        break;
    default:
        printf("Invalid choice");
}
\`\`\`

💡 The break stops the program from checking other cases once one matches.
💡 The default block runs when no case matches.`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    multipleQuiz: [
      {
        question: 'The switch statement is used when you want to [______].',
        interactive: true,
        blanks: [{ id: 1, answer: 'Test multiple values of the same variable' }],
        template: 'Answer: [1]',
        options: [
          'Repeat a block of code',
          'Test multiple values of the same variable',
          'Compare two numbers',
          'Exit a loop',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question: 'What happens if a break is missing in a case?\nThe program will [______].',
        interactive: true,
        blanks: [{ id: 1, answer: 'Continue to the next case' }],
        template: 'Answer: [1]',
        options: ['Stop immediately', 'Skip the rest', 'Continue to the next case'],
      },
    ],
  },
  {
    id: 5,
    title: 'Guided Example',
    content: `Example Code:`,
    code: `#include <stdio.h>

int main() {
    int day = 3;

    switch (day) {
        case 1:
            printf("Monday");
            break;
        case 2:
            printf("Tuesday");
            break;
        case 3:
            printf("Wednesday");
            break;
        default:
            printf("Invalid day");
    }

    return 0;
}`,
    explanation: `Explanation:

• The variable day is checked.
• The program prints the message for the matching case.
• If day doesn't match any case, it prints the default message.

💡 Think of it like a menu — your choice decides which code runs.`,
  },
  {
    id: 6,
    title: 'Check for Understanding (3)',
    multipleQuiz: [
      {
        question:
          "When is it better to use a switch case instead of multiple if–else statements?\nIt's best used [__________].",
        interactive: true,
        blanks: [{ id: 1, answer: 'When comparing one variable to many constant values' }],
        template: 'Answer: [1]',
        options: [
          'When checking different variables',
          'When comparing one variable to many constant values',
          'When doing calculations',
          'When looping through data',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question:
          'Fill in the blanks to complete this switch structure:\nswitch (grade) {\n    case \'A\':\n        printf("Excellent!");\n        [___];\n    case \'B\':\n        printf("Good!");\n        [___];\n    [___]:\n        printf("Invalid grade");\n}',
        interactive: true,
        blanks: [
          { id: 1, answer: 'break' },
          { id: 2, answer: 'break' },
          { id: 3, answer: 'default' },
        ],
        template: "case 'A': ... [1]; case 'B': ... [2]; [3]: ...",
        options: ['break', 'break', 'default'],
      },
    ],
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Drag and drop the correct choices to complete the program that displays the day name based on a number.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'scanf' },
        { id: 2, answer: 'day' },
        { id: 3, answer: 'switch' },
        { id: 4, answer: 'printf' },
        { id: 5, answer: 'break' },
        { id: 6, answer: 'printf' },
        { id: 7, answer: 'break' },
        { id: 8, answer: 'printf' },
        { id: 9, answer: 'break' },
        { id: 10, answer: 'default' },
        { id: 11, answer: 'printf' },
      ],
      options: [
        'printf',
        'break',
        'scanf',
        'default',
        'switch',
        'day',
        'printf',
        'break',
        'printf',
        'break',
        'printf',
      ],
      template: `#include <stdio.h>

int main() {
    int day;

    printf("Enter a number (1–3): ");
    [1]("%d", &[2]);

    [3] (day) {
        case 1:
            [4]("Monday");
            [5];
        case 2:
            [6]("Tuesday");
            [7];
        case 3:
            [8]("Wednesday");
            [9];
        [10]:
            [11]("Invalid day");
    }

    return 0;
}`,
      correctCode: `#include <stdio.h>

int main() {
    int day;

    printf("Enter a number (1–3): ");
    scanf("%d", &day);

    switch (day) {
        case 1:
            printf("Monday");
            break;
        case 2:
            printf("Tuesday");
            break;
        case 3:
            printf("Wednesday");
            break;
        default:
            printf("Invalid day");
    }

    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• The switch case handles multiple possible values of one variable.
• Each case runs when its value matches the variable.
• The break statement prevents code from continuing to the next case.
• The default case runs when no match is found.
• Best used when testing a single variable against many constant values.`,
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
