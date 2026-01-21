<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle =
  'End-of-Topic Quiz: Conditions, Logical Expressions, and Selection Control Structures'
const lessonDescription = 'Test your understanding of control structures in C'
const topicId = 2
const slides = [
  {
    id: 1,
    title: 'Question 1 – Control Structures',
    multipleQuiz: [
      {
        question: 'Control structures determine the [__________] of a program.',
        interactive: true,
        blanks: [{ id: 1, answer: 'order of execution' }],
        template: 'Answer: [1]',
        options: ['order of execution', 'number of variables', 'data type', 'function name'],
      },
    ],
  },
  {
    id: 2,
    title: 'Question 2 – Control Structures',
    quiz: {
      question:
        'The three main types of control structures in C are: sequence, selection, and iteration.',
      options: ['True', 'False'],
      answer: 'True',
    },
  },
  {
    id: 3,
    title: 'Question 3 – Conditions & Logical Expressions',
    quiz: {
      question: 'Which of the following is a relational operator in C?',
      options: ['&&', '>=', '=', '||'],
      answer: '>=',
    },
  },
  {
    id: 4,
    title: 'Question 4 – Logical Operators',
    multipleQuiz: [
      {
        question: 'The operator used for logical AND is [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: '&&' }],
        template: 'Answer: [1]',
        options: ['&&', '||', '!', '=='],
      },
    ],
  },
  {
    id: 5,
    title: 'Question 5 – Relational Operator',
    multipleQuiz: [
      {
        question:
          'Complete the expression to check if x is greater than or equal to 10:\nif (x ___ 10)',
        interactive: true,
        blanks: [{ id: 1, answer: '>=' }],
        template: 'if (x [1] 10)',
        options: ['>', '>=', '==', '<='],
      },
    ],
  },
  {
    id: 6,
    title: 'Question 6 – If Statement',
    quiz: {
      question:
        'If the condition in an if statement is false, the statements inside { } are skipped.',
      options: ['True', 'False'],
      answer: 'True',
    },
  },
  {
    id: 7,
    title: 'Question 7 – If Statement Syntax',
    multipleQuiz: [
      {
        question:
          'Write the correct syntax to display "Pass" if score is above 75:\nif (score ___ 75) {\n    printf("Pass");\n}',
        interactive: true,
        blanks: [{ id: 1, answer: '>' }],
        template: 'if (score [1] 75)',
        options: ['>', '>=', '<', '=='],
      },
    ],
  },
  {
    id: 8,
    title: 'Question 8 – Nested If Statement',
    multipleQuiz: [
      {
        question: 'A nested if means placing one if statement [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'inside another if' }],
        template: 'Answer: [1]',
        options: ['inside another if', 'after a loop', 'in a function', 'before return 0'],
      },
    ],
  },
  {
    id: 9,
    title: 'Question 9 – Decision Steps in Algorithms',
    quiz: {
      question: 'Which step comes before writing the decision structure in an algorithm?',
      options: [
        'Analyze possible outputs',
        'Define the problem',
        'Compile the code',
        'Debug the result',
      ],
      answer: 'Define the problem',
    },
  },
  {
    id: 10,
    title: 'Question 10 – If–Else Statement',
    multipleQuiz: [
      {
        question: 'The else block executes when the if condition is [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'false' }],
        template: 'Answer: [1]',
        options: ['true', 'false', 'missing', 'incomplete'],
      },
    ],
  },
  {
    id: 11,
    title: 'Question 11 – If–Else Syntax',
    multipleQuiz: [
      {
        question:
          'Write the correct structure to decide if a number is positive or negative:\nif (num > 0) {\n    printf("Positive");\n} ___ {\n    printf("Negative");\n}',
        interactive: true,
        blanks: [{ id: 1, answer: 'else' }],
        template: 'if (num > 0) { ... } [1] { ... }',
        options: ['else', 'else if', 'elif', 'otherwise'],
      },
    ],
  },
  {
    id: 12,
    title: 'Question 12 – Nested If–Else Syntax',
    multipleQuiz: [
      {
        question:
          'Fill the missing syntax to complete the nested decision:\nif (score >= 90) {\n    printf("Excellent!");\n} ___ if (score >= 75) {\n    printf("Passed!");\n} ___ {\n    printf("Failed!");\n}',
        interactive: true,
        blanks: [
          { id: 1, answer: 'else' },
          { id: 2, answer: 'else' },
        ],
        template: 'if (...) { ... } [1] if (...) { ... } [2] { ... }',
        options: ['else', 'if', 'else', 'elif'],
      },
    ],
  },
  {
    id: 13,
    title: 'Question 13 – Switch Case',
    multipleQuiz: [
      {
        question: 'Each case in a switch statement must end with a [__________] to stop execution.',
        interactive: true,
        blanks: [{ id: 1, answer: 'break' }],
        template: 'Answer: [1]',
        options: ['break', 'continue', 'exit', 'stop'],
      },
    ],
  },
  {
    id: 14,
    title: 'Question 14 – Switch Case Default',
    quiz: {
      question: "When no case matches the variable's value, which block runs?",
      options: ['endcase', 'exit', 'default', 'stop'],
      answer: 'default',
    },
  },
  {
    id: 15,
    title: 'Question 15 – Switch Case Practice',
    content: `Fill in the missing syntax for the switch statement that prints fruit names:`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'switch' },
        { id: 2, answer: 'break' },
        { id: 3, answer: 'break' },
        { id: 4, answer: 'default' },
      ],
      options: ['switch', 'break', 'default', 'break', 'case'],
      template: `#include <stdio.h>
int main() {
    int choice = 2;
    [1] (choice) {
        case 1:
            printf("Apple");
            [2];
        case 2:
            printf("Banana");
            [3];
        [4]:
            printf("Invalid choice");
    }
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int choice = 2;
    switch (choice) {
        case 1:
            printf("Apple");
            break;
        case 2:
            printf("Banana");
            break;
        default:
            printf("Invalid choice");
    }
    return 0;
}`,
    },
  },
]
const { completeQuiz } = useLearningProgress()

function handleQuizComplete() {
  completeQuiz(topicId)
}
</script>

<template>
  <LessonSlides
    mode="quiz"
    :lesson-title="lessonTitle"
    :lesson-description="lessonDescription"
    :slides="slides"
    :topic-id="topicId"
    :lesson-id="0"
    back-route="/"
    complete-route="/"
    @quiz-complete="handleQuizComplete"
  />
</template>
