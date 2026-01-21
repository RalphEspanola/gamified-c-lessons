<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 4: Parameters'
const lessonDescription = 'Understanding function parameters in C programming'
const topicId = 4 // Topic
const lessonId = 4 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine you're ordering food online 🍔. You tell the app what you want — "1 burger, 2 fries, 1 drink."

Those details you give are like parameters in a function — they're the inputs that the program uses to do something specific.

💡 In programming, parameters let functions work with data you provide, so one function can be reused with different values each time it's called.`,
  },
  {
    id: 2,
    title: 'Concept Explanation (What Are Parameters?)',
    content: [
      {
        type: 'text',
        value: `Parameters are variables inside a function that receive values from the function call.
They act as placeholders for the data the function will use.

🧩 Syntax:`,
      },
      {
        type: 'code',
        value: `void greetUser(char name[]) {
    printf("Hello, %s!", name);
}`,
      },
      {
        type: 'text',
        value: `Here, name is a parameter. When you call the function, you can pass different values — for example:`,
      },
      {
        type: 'code',
        value: `greetUser("Sandy");
greetUser("Miguel");`,
      },
      {
        type: 'text',
        value: `💬 Output:
Hello, Sandy!
Hello, Miguel!`,
      },
    ],
  },
  {
    id: 3,
    title: 'Concept Explanation (Parameters vs Arguments)',
    content: `Understanding the difference between parameters and arguments:`,
    explanation: `<table>
  <thead>
    <tr>
      <th>Term</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Parameter</td>
      <td>The variable in the function definition.</td>
      <td>void greetUser(char name[]) → name</td>
    </tr>
    <tr>
      <td>Argument</td>
      <td>The actual value passed to the function.</td>
      <td>greetUser("Sandy"); → "Sandy"</td>
    </tr>
  </tbody>
</table>

💡 Parameters are like placeholders, while arguments are the actual data.`,
  },
  {
    id: 4,
    title: 'Guided Example',
    code: `#include <stdio.h>

void displaySum(int a, int b) {
    int sum = a + b;
    printf("Sum: %d\\n", sum);
}

int main() {
    displaySum(4, 6);
    displaySum(10, 5);
    return 0;
}`,
    explanation: `💬 Explanation:
• int a, int b → these are parameters in the function definition.
• displaySum(4, 6) and displaySum(10, 5) → these pass arguments.
• The same function works with different input values — reusable and efficient!`,
  },
  {
    id: 5,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'What are parameters in a function?',
      options: [
        'Variables inside the function that receive data',
        'Fixed numbers in the program',
        'Commands to end the function',
      ],
      answer: 'Variables inside the function that receive data',
    },
  },
  {
    id: 6,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question: 'In the line displaySum(3, 7);, the numbers 3 and 7 are called [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'arguments' }],
        template: 'Answer: [1]',
        options: ['arguments', 'parameters', 'operators'],
      },
    ],
  },
  {
    id: 7,
    title: 'Quick Practice (Fill in the Blanks)',
    content: `Fill in the blanks to create a function that prints a student's grade.`,
    code: `#include <stdio.h>

void showGrade([_____] grade) {
    printf("Grade: %d", grade);
}

int main() {
    showGrade(95);
    return 0;
}`,
    multipleQuiz: [
      {
        question: 'Fill in the blank:',
        interactive: true,
        blanks: [{ id: 1, answer: 'int' }],
        template: 'void showGrade([1] grade)',
        options: ['int', 'char', 'void'],
      },
    ],
  },
  {
    id: 8,
    title: 'Check for Understanding (3)',
    content: `How many parameters does this function have?`,
    code: `void computeAverage(int a, int b, int c)`,
    quiz: {
      question: 'Number of parameters:',
      options: ['1', '2', '3'],
      answer: '3',
    },
  },
  {
    id: 9,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the code below to define and call a function that prints a name and age.`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'void' },
        { id: 2, answer: 'char' },
        { id: 3, answer: 'int' },
        { id: 4, answer: 'void' },
        { id: 5, answer: 'char' },
        { id: 6, answer: 'int' },
      ],
      options: ['char', 'int', 'void', 'void', 'int', 'char'],
      template: `#include <stdio.h>

[1] displayInfo([2] name[], [3] age);

int main() {
    displayInfo("Sandy", 19);
    return 0;
}

[4] displayInfo([5] name[], [6] age) {
    printf("Name: %s\\nAge: %d", name, age);
}`,
      correctCode: `#include <stdio.h>

void displayInfo(char name[], int age);

int main() {
    displayInfo("Sandy", 19);
    return 0;
}

void displayInfo(char name[], int age) {
    printf("Name: %s\\nAge: %d", name, age);
}`,
    },
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: `🧠 What You Learned:

• Parameters let functions receive input values and use them inside the function.
• The values you send into a function are called arguments.
• Parameters = placeholders, Arguments = actual data.
• You can define multiple parameters in one function.
• Parameters make functions flexible, reusable, and dynamic.`,
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
    :topic-id="topicId"
    :lesson-id="lessonId"
    back-route="/"
    complete-route="/"
    @lesson-complete="handleLessonComplete"
  />
</template>
