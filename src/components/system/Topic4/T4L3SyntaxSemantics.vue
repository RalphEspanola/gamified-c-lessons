<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { lesson3References } from '../Dashboard/Data/references/topic4/lesson3References.js'

const lessonTitle = 'Lesson 3: Syntax and Semantics of Void Functions'
const lessonDescription = 'Understanding void function syntax and semantics in C'
const topicId = 4 // Topic
const lessonId = 3 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine you're in class 🧑‍🏫. Your teacher says, "Stand up," or "Submit your assignment."

You don't reply with an answer — you just do the action.

That's exactly how a void function works in programming!

💡 It performs an action, like printing or displaying information, but it doesn't return anything back to the part of the program that called it.

💬 Think of it as an instruction, not a question — it tells the computer what to do, not what to give back.`,
  },
  {
    id: 2,
    title: 'Concept Explanation (What It Is)',
    content: [
      {
        type: 'text',
        value: `A void function is a type of function that does not return a value. It only performs an operation, such as displaying a message or updating data.

🧩 Syntax:`,
      },
      {
        type: 'code',
        value: `void functionName() {
    // statements
}`,
      },
      {
        type: 'text',
        value: `✅ How it works:
• Starts with the keyword void
• Has a name followed by parentheses ()
• May contain statements inside { }
• Doesn't use a return statement`,
      },
    ],
  },
  {
    id: 3,
    title: 'Concept Explanation (Semantic Meaning)',
    content: `The semantics of a void function describe what it means or how it behaves:`,
    explanation: `<table>
  <thead>
    <tr>
      <th>Concept</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>"Void" keyword</td>
      <td>Tells the compiler the function returns no value.</td>
    </tr>
    <tr>
      <td>Behavior</td>
      <td>The function only performs an action.</td>
    </tr>
    <tr>
      <td>Effect</td>
      <td>It may print data, set variables, or call other functions.</td>
    </tr>
  </tbody>
</table>

💬 In simple terms: Void functions "do something," but they don't give something back.`,
  },
  {
    id: 4,
    title: 'Guided Example',
    code: `#include <stdio.h>

void greetUser() {
    printf("Hello, C programmer!\\n");
}

int main() {
    greetUser();
    printf("Welcome to Functions!");
    return 0;
}`,
    explanation: `💬 Explanation (Line by Line):
• void greetUser() → declares a void function.
• { printf(...); } → executes an action (prints a message).
• greetUser(); → calls the function from main().
• The program doesn't expect any value in return — just the action.`,
  },
  {
    id: 5,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'What does the keyword "void" mean in a function?',
      options: [
        'The function returns nothing',
        'The function returns an integer',
        'The function takes no parameters',
      ],
      answer: 'The function returns nothing',
    },
  },
  {
    id: 6,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'Which of the following best describes a void function?',
      options: [
        'Performs a task but returns no value',
        'Stores data in variables',
        'Returns a computed result',
      ],
      answer: 'Performs a task but returns no value',
    },
  },
  {
    id: 7,
    title: 'Quick Practice (Fill in the Blanks)',
    content: `Fill in the blanks to create a void function that prints "Try coding in C!".`,
    code: `#include <stdio.h>

[_____] motivate() {
    printf("Try coding in C!");
}

int main() {
    motivate();
    return 0;
}`,
    multipleQuiz: [
      {
        question: 'Fill in the blank:',
        interactive: true,
        blanks: [{ id: 1, answer: 'void' }],
        template: '[1] motivate() { ... }',
        options: ['void', 'int', 'char'],
      },
    ],
  },
  {
    id: 8,
    title: 'Check for Understanding (3)',
    quiz: {
      question:
        'What happens if you try to use a return statement to send a value from a void function?',
      options: ['It causes a compilation error', 'It prints the value', 'It restarts the program'],
      answer: 'It causes a compilation error',
    },
  },
  {
    id: 9,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the missing parts to define and call a void function that displays your name.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'void' },
        { id: 2, answer: 'void' },
      ],
      options: ['void', 'int', 'void', 'printf'],
      template: `#include <stdio.h>

[1] displayName();   // Declaration

int main() {
    displayName();        // Call
    return 0;
}

[2] displayName() {  // Definition
    printf("Name: Jake");
}`,
      correctCode: `#include <stdio.h>

void displayName();   // Declaration

int main() {
    displayName();        // Call
    return 0;
}

void displayName() {  // Definition
    printf("Name: Jake");
}`,
    },
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: [
      {
        type: 'text',
        value: `🧠 What You Learned:

• Void functions perform actions but do not return values.
• Syntax:`,
      },
      {
        type: 'code',
        value: `void functionName() { ... }`,
      },
      {
        type: 'text',
        value: `• Semantics: they execute a task (like printing) but send nothing back.
• You can declare, define, and call void functions just like other functions.
• Using void functions helps organize repetitive actions in your program.`,
      },
    ],
  },
  {
    id: 11,
    title: 'References',
    references: lesson3References,
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
