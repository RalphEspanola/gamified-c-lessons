<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'

const lessonTitle = 'Lesson 7: Nested If–Else Statement'
const lessonDescription = 'Understanding nested if-else and else-if statements in C'

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine you're applying for a school scholarship:
🎓 If your average grade is 90 or above → you get a Full Scholarship.
📘 Else if your grade is 80 or above → you get a Partial Scholarship.
📄 Else → you don't qualify this time.

That's how a nested if–else works in programming — your program makes multiple decisions step by step, just like how schools decide scholarships.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `A nested if–else lets a program handle more than two conditions.
Instead of using many separate if blocks, we use else if to chain them neatly.

Syntax:`,
    code: `if (condition1) {
    // runs if condition1 is true
} else if (condition2) {
    // runs if condition2 is true
} else {
    // runs if all above are false
}`,
    explanation: `✅ Example:
\`\`\`c
int score = 85;

if (score >= 90) {
    printf("Excellent!");
} else if (score >= 75) {
    printf("Passed!");
} else {
    printf("Failed!");
}
\`\`\`

💡 The else if form is a cleaner way of writing multiple nested if decisions.`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'What is a nested if–else used for?',
      options: [
        'Making one decision only',
        'Making multiple related decisions',
        'Repeating code',
        'Ending a program',
      ],
      answer: 'Making multiple related decisions',
    },
  },
  {
    id: 4,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question: 'If the first if condition is true, the following else if blocks are [______].',
        interactive: true,
        blanks: [{ id: 1, answer: 'skipped' }],
        template: 'Answer: [1]',
        options: ['skipped', 'executed'],
      },
    ],
  },
  {
    id: 5,
    title: 'Guided Example',
    code: `#include <stdio.h>

int main() {
    int score;

    printf("Enter your score: ");
    scanf("%d", &score);

    if (score >= 90) {
        printf("Excellent!");
    } else if (score >= 75) {
        printf("Passed!");
    } else {
        printf("Failed!");
    }

    return 0;
}`,
    explanation: `Explanation:

• if (score >= 90) → prints "Excellent!"
• else if (score >= 75) → prints "Passed!"
• else → prints "Failed!"

💡 Each condition is checked in order until one is true.`,
  },
  {
    id: 6,
    title: 'Check for Understanding (3)',
    multipleQuiz: [
      {
        question:
          'In an else if structure, what happens if none of the conditions are true?\nThe program runs the [______] block.',
        interactive: true,
        blanks: [{ id: 1, answer: 'else' }],
        template: 'Answer: [1]',
        options: ['else', 'if', 'first', 'next'],
      },
    ],
  },
  {
    id: 7,
    title: 'Quick Practice',
    quiz: {
      question:
        'What will this program display if temperature = 32?\n\nif (temperature >= 37) {\n    printf("You have a fever.");\n} else if (temperature >= 35) {\n    printf("Normal temperature.");\n} else {\n    printf("Too cold!");\n}',
      options: ['You have a fever.', 'Normal temperature.', 'Too cold!'],
      answer: 'Too cold!',
    },
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Drag and drop the correct choices to complete the program that checks a student's scholarship eligibility.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'scanf' },
        { id: 2, answer: 'grade' },
        { id: 3, answer: '>=' },
        { id: 4, answer: 'printf' },
        { id: 5, answer: 'else' },
        { id: 6, answer: '>=' },
        { id: 7, answer: 'printf' },
        { id: 8, answer: 'else' },
        { id: 9, answer: 'printf' },
      ],
      options: ['printf', '>=', 'else', 'grade', 'printf', 'scanf', 'printf', '>=', 'else'],
      template: `#include <stdio.h>

int main() {
    int grade;

    printf("Enter your grade: ");
    [1]("%d", &[2]);

    if (grade [3] 90) {
        [4]("Full Scholarship!");
    } [5] if (grade [6] 80) {
        [7]("Partial Scholarship!");
    } [8] {
        [9]("Not Qualified.");
    }

    return 0;
}`,
      correctCode: `#include <stdio.h>

int main() {
    int grade;

    printf("Enter your grade: ");
    scanf("%d", &grade);

    if (grade >= 90) {
        printf("Full Scholarship!");
    } else if (grade >= 80) {
        printf("Partial Scholarship!");
    } else {
        printf("Not Qualified.");
    }

    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• The else if structure allows multiple conditions to be checked in sequence.
• The program stops checking once one condition is true.
• The final else block runs only if all previous conditions are false.
• Use else if for cleaner, more readable code than multiple nested if blocks.

Think of it like:
👉 If this... else if that... otherwise...`,
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
