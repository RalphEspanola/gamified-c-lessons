<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 5: The Do–While Statement'
const lessonDescription = 'Understanding do-while loops in C programming'
const topicId = 3 // Topic
const lessonId = 5 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine trying to log in to an app 🔐. You must enter your password at least once, and if it's wrong, you'll be asked to try again.

That's how the do–while loop works!

It always runs the code at least once, then checks if it should repeat — based on a condition.

💡 So even if the condition is false, the loop runs once before checking.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `The do–while statement is like the while loop, but the condition is checked after the code runs.

Syntax:`,
    code: `do {
    // statements to execute
} while (condition);`,
    explanation: `🧩 Key Differences from while:

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>while loop</th>
      <th>do–while loop</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Condition checked</td>
      <td>Before the loop runs</td>
      <td>After the loop runs</td>
    </tr>
    <tr>
      <td>Minimum runs</td>
      <td>May run 0 times</td>
      <td>Always runs at least once</td>
    </tr>
    <tr>
      <td>Common use</td>
      <td>When condition may not be true at start</td>
      <td>When you must run the code once before checking</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: 3,
    title: 'Example Program (Counting Numbers)',
    code: `#include <stdio.h>
int main() {
    int num = 1;
    do {
        printf("%d ", num);
        num++;
    } while (num <= 5);
    return 0;
}`,
    explanation: `💻 Output:
1 2 3 4 5

🧠 Explanation:
• Starts with num = 1.
• Runs the code block once → prints 1.
• Checks num <= 5; if true, repeats.
• Stops when num becomes 6.

✅ Even if the condition were false at the start, this loop would still run one time.`,
  },
  {
    id: 4,
    title: 'Check for Understanding (1)',
    multipleQuiz: [
      {
        question:
          'What makes the do–while loop different from the regular while loop?\nIt checks the condition [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'after the loop runs' }],
        template: 'Answer: [1]',
        options: ['before the loop runs', 'after the loop runs', 'during every statement'],
      },
    ],
  },
  {
    id: 5,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question:
          'If the condition in a do–while loop is false at the start, the loop will [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'run once' }],
        template: 'Answer: [1]',
        options: ['run once', 'not run at all', 'run infinitely'],
      },
    ],
  },
  {
    id: 6,
    title: 'Guided Example (User Input)',
    content: `Let's make a program that asks the user for a number until they type 0:`,
    code: `#include <stdio.h>
int main() {
    int num;
    do {
        printf("Enter a number (0 to stop): ");
        scanf("%d", &num);
    } while (num != 0);
    printf("Loop ended.");
    return 0;
}`,
    explanation: `💡 Explanation:
• The program asks for a number first (runs once).
• It repeats only if the user didn't enter 0.
• When 0 is entered, condition is false → loop stops.`,
  },
  {
    id: 7,
    title: 'Quick Practice',
    content: `Fill in the blanks to complete the do–while loop that prints numbers 1 to 3:`,
    code: `int i = 1;
do {
    printf("%d ", i);
    i++;
} while (i ___ 3);`,
    multipleQuiz: [
      {
        question: 'Fill in the operator:',
        interactive: true,
        blanks: [{ id: 1, answer: '<=' }],
        template: 'while (i [1] 3)',
        options: ['<=', '>=', '=='],
      },
    ],
    explanation: `💬 This ensures the loop prints 1, 2, and 3 before stopping.`,
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Drag and drop the correct parts to complete the program that prints "Hello!" at least once.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'do' },
        { id: 2, answer: 'while' },
      ],
      options: ['do', 'while', 'for', 'switch', 'case'],
      template: `#include <stdio.h>
int main() {
    int repeat = 0;
    [1] {
        printf("Hello!\\n");
        printf("Repeat again? (1 = yes, 0 = no): ");
        scanf("%d", &repeat);
    } [2] (repeat == 1);
    return 0;
}`,
      correctCode: `#include <stdio.h>
int main() {
    int repeat = 0;
    do {
        printf("Hello!\\n");
        printf("Repeat again? (1 = yes, 0 = no): ");
        scanf("%d", &repeat);
    } while (repeat == 1);
    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Check for Understanding (3)',
    multipleQuiz: [
      {
        question: 'When does a do–while loop stop repeating?\nWhen the [__________] becomes false.',
        interactive: true,
        blanks: [{ id: 1, answer: 'condition' }],
        template: 'Answer: [1]',
        options: ['variable', 'update statement', 'condition'],
      },
    ],
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: [
      {
        type: 'text',
        value: `Key Points to Remember:

• The do–while loop always runs at least once.
• The condition is checked after the loop executes.
• Use it when you must perform an action first (like asking for input).
• Common use: menus, input validation, or retry prompts.

Structure:`,
      },
      {
        type: 'code',
        value: `do {
    // statements
} while (condition);`,
      },
    ],
  },
]
const { completeLesson } = useLearningProgress()
function handleLessonComplete() {
  completeLesson(topicId, lessonId)
}
</script>

<template>
  <LessonSlides
    :lesson-title="lessonTitle"
    :lesson-description="lessonDescription"
    :slides="slides"
    back-route="/"
    complete-route="/"
    @lesson-complete="handleLessonComplete"
  />
</template>
