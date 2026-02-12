<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'

const lessonTitle = 'End of Topic Quiz – Topic 3: Looping'
const lessonDescription = 'Test your understanding of loops in C programming'
const topicId = 3
const slides = [
  {
    id: 1,
    title: 'Question 1 – While Loop Basics',
    multipleQuiz: [
      {
        question: 'A while loop continues to run as long as the [__________] is true.',
        interactive: true,
        blanks: [{ id: 1, answer: 'condition' }],
        template: 'Answer: [1]',
        options: ['condition', 'statement', 'result'],
      },
    ],
  },
  {
    id: 2,
    title: 'Question 2 – Loop Control',
    quiz: {
      question: 'A while loop checks the condition after executing the loop body.',
      options: ['True', 'False'],
      answer: 'False',
    },
    explanation: `💬 That describes a do-while loop. A while loop checks the condition first.`,
  },
  {
    id: 3,
    title: 'Question 3 – Missing Syntax',
    content: `Complete the code that prints numbers 1 to 3 using a while loop:`,
    code: `int i = 1;
while ([_____]) {
    printf("%d ", i);
    i++;
}`,
    multipleQuiz: [
      {
        question: 'Fill in the condition:',
        interactive: true,
        blanks: [{ id: 1, answer: 'i <= 3' }],
        template: 'while ([1])',
        options: ['i <= 3', 'i >= 3', 'i == 3'],
      },
    ],
  },
  {
    id: 4,
    title: 'Question 4 – Loop Phases',
    quiz: {
      question: 'Which of the following is NOT one of the main phases of loop execution?',
      options: ['Initialization', 'Condition Checking', 'Body Execution', 'Program Termination'],
      answer: 'Program Termination',
    },
  },
  {
    id: 5,
    title: 'Question 5 – While vs Do-While',
    multipleQuiz: [
      {
        question:
          'The main difference between while and do-while loops is that a do-while loop always executes [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'at least once' }],
        template: 'Answer: [1]',
        options: ['at least once', 'twice', 'only if condition is true'],
      },
    ],
  },
  {
    id: 6,
    title: 'Question 6 – Switch Statement',
    quiz: {
      question: 'A switch statement can evaluate integer and character values in C.',
      options: ['True', 'False'],
      answer: 'True',
    },
  },
  {
    id: 7,
    title: 'Question 7 – Switch Syntax',
    content: `Complete the missing part of this switch statement:`,
    code: `int num = 2;
switch (num) {
    case 1:
        printf("One");
        break;
    [_____] 2:
        printf("Two");
        break;
    default:
        printf("Other");
}`,
    multipleQuiz: [
      {
        question: 'Fill in the missing keyword:',
        interactive: true,
        blanks: [{ id: 1, answer: 'case' }],
        template: '[1] 2:',
        options: ['when', 'case', 'switch'],
      },
    ],
  },
  {
    id: 8,
    title: 'Question 8 – Do-While Syntax',
    multipleQuiz: [
      {
        question: 'What keyword is used to check the condition at the end of a do-while loop?',
        interactive: true,
        blanks: [{ id: 1, answer: 'while' }],
        template: 'Answer: [1]',
        options: ['while', 'if', 'repeat'],
      },
    ],
  },
  {
    id: 9,
    title: 'Question 9 – Debugging',
    content: `Find the error that causes an infinite loop:`,
    code: `int i = 1;
while (i <= 5) {
    printf("%d ", i);
}`,
    quiz: {
      question: 'What is the error?',
      options: ['Missing i--', 'Missing printf()', 'Wrong condition', 'Missing i++'],
      answer: 'Missing i++',
    },
    explanation: `💬 The loop never increments i, so the condition stays true forever.`,
  },
  {
    id: 10,
    title: 'Question 10 – For Loop Syntax',
    content: `Complete the code that prints numbers 1 to 5:`,
    code: `for (int i = 1; i <= 5; [_____]) {
    printf("%d ", i);
}`,
    multipleQuiz: [
      {
        question: 'Fill in the update statement:',
        interactive: true,
        blanks: [{ id: 1, answer: 'i++' }],
        template: 'for (int i = 1; i <= 5; [1])',
        options: ['i++', 'i--', 'i = i + 2'],
      },
    ],
  },
  {
    id: 11,
    title: 'Question 11 – Nested Loop Output',
    multipleQuiz: [
      {
        question:
          'If both the outer and inner loop run 3 times each, the total number of iterations is [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: '9' }],
        template: 'Answer: [1]',
        options: ['6', '9', '12'],
      },
    ],
  },
  {
    id: 12,
    title: 'Question 12 – Star Pattern',
    content: `Drag and drop to complete the nested loop that prints a triangle of stars:`,
    code: `for (int row = 1; row <= 3; row++) {
    for (int col = 1; col <= [_____]; col++) {
        printf("* ");
    }
    printf("\\n");
}`,
    multipleQuiz: [
      {
        question: 'Fill in the condition:',
        interactive: true,
        blanks: [{ id: 1, answer: 'row' }],
        template: 'for (int col = 1; col <= [1]; col++)',
        options: ['row', 'col', '3'],
      },
    ],
  },
  {
    id: 13,
    title: 'Question 13 – Break Statement',
    multipleQuiz: [
      {
        question:
          'The break statement is used to [__________] a loop before its condition becomes false.',
        interactive: true,
        blanks: [{ id: 1, answer: 'end' }],
        template: 'Answer: [1]',
        options: ['end', 'skip', 'pause'],
      },
    ],
  },
  {
    id: 14,
    title: 'Question 14 – Nested Loop Syntax',
    content: `Complete the missing keyword in the nested for loop:`,
    code: `for (int i = 1; i <= 3; i++) {
    [_____] (int j = 1; j <= 3; j++) {
        printf("%d ", i * j);
    }
    printf("\\n");
}`,
    multipleQuiz: [
      {
        question: 'Fill in the missing keyword:',
        interactive: true,
        blanks: [{ id: 1, answer: 'for' }],
        template: '[1] (int j = 1; j <= 3; j++)',
        options: ['for', 'while', 'do'],
      },
    ],
  },
  {
    id: 15,
    title: 'Question 15 – Loop Purpose',
    quiz: {
      question:
        'Loops help programmers reduce repetition by executing instructions multiple times automatically.',
      options: ['True', 'False'],
      answer: 'True',
    },
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
