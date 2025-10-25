<script setup>
import LessonSlides from '../../LessonSlides/LessonSlides.vue'

const lessonTitle = 'Lesson 6: Common Programming Errors'
const lessonDescription = 'Understanding and fixing programming errors in C'

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Mistakes happen — even professional programmers make errors! The key is to understand the types of errors so you can quickly find and fix them.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `Three main types of programming errors in C:

1. Syntax Error – violates grammar rules of C. Example: forgetting a semicolon ;.
2. Logical Error – program runs, but the output is wrong. Example: using + instead of -.
3. Runtime Error – program compiles but crashes during execution. Example: dividing by zero.`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'Forgetting a semicolon at the end of a statement causes what type of error?',
      options: ['Syntax Error', 'Logical Error', 'Runtime Error'],
      answer: 'Syntax Error',
    },
  },
  {
    id: 4,
    title: 'Guided Example - Syntax Error',
    content: `**1. Syntax Error (Faulty Code):**`,
    code: `#include <stdio.h>
int main() {
    int x = 5      // ❌ missing semicolon
    printf("%d", x);
    return 0;
}`,
    explanation: `**Fixed Code:**
\`\`\`c
int x = 5;        // ✅ semicolon added
printf("%d", x);
\`\`\``,
  },
  {
    id: 5,
    title: 'Guided Example - Logical Error',
    content: `**2. Logical Error (Faulty Code):**`,
    code: `#include <stdio.h>
int main() {
    int a = 10, b = 5;
    int sum = a - b;   // ❌ should be addition, not subtraction
    printf("The sum is %d", sum);
    return 0;
}`,
    explanation: `🧠 What Happens: The program runs fine, but the output is incorrect because of the wrong operator.

**Fixed Code:**
\`\`\`c
int sum = a + b;   // ✅ corrected to addition
printf("The sum is %d", sum);
\`\`\``,
  },
  {
    id: 6,
    title: 'Guided Example - Runtime Error',
    content: `**3. Runtime Error (Faulty Code):**`,
    code: `#include <stdio.h>
int main() {
    int x = 10;
    int y = 0;
    int result = x / y;   // ❌ division by zero (crash at runtime)
    printf("Result: %d", result);
    return 0;
}`,
    explanation: `💥 What Happens: The program compiles successfully but crashes while running due to division by zero.

**Fixed Code:**
\`\`\`c
if (y != 0) {
    int result = x / y;
    printf("Result: %d", result);
} else {
    printf("Error: Cannot divide by zero.");
}
\`\`\``,
  },
  {
    id: 7,
    title: 'Check for Understanding (2)',
    quiz: {
      question:
        'If a program compiles and runs but gives the wrong answer, what type of error is it?',
      options: ['Runtime Error', 'Syntax Error', 'Logical Error'],
      answer: 'Logical Error',
    },
  },
  {
    id: 8,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'What happens if you divide an integer by zero in C?',
      options: ['Prints 0', 'Prints Infinity', 'Causes a runtime error', 'Skips the line'],
      answer: 'Causes a runtime error',
    },
  },
  {
    id: 9,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question: 'Spot the error in this code:\nint a = 10, b = 0;\nprintf("%d", a / b);',
        interactive: true,
        blanks: [{ id: 1, answer: 'Runtime Error' }],
        template: 'Answer: [1]',
        options: ['Prints 0', 'Prints Infinity', 'Runtime Error'],
      },
    ],
  },
  {
    id: 10,
    title: 'Deeper Practice / Coding Task',
    content: `Here's a faulty code that should print "Sum is: 15". Find and fix the errors:`,
    codingTask: {
      blanks: [
        { id: 1, answer: ';' },
        { id: 2, answer: '+' },
      ],
      options: ['+', '*', '-', ';'],
      template: `#include <stdio.h>
int main() {
    int num1 = 10, num2 = 5[1]
    printf("Sum is: %d", num1 [2] num2);
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int num1 = 10, num2 = 5;
    printf("Sum is: %d", num1 + num2);
    return 0;
}`,
    },
  },
  {
    id: 11,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• Syntax errors → break the rules (compiler will not run the program).
• Logical errors → wrong logic, wrong results.
• Runtime errors → crash during program execution.
• Debugging = finding and fixing these errors.`,
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
