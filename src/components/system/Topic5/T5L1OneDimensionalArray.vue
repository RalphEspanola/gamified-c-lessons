<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { lesson1References } from '../Dashboard/Data/references/topic5/lesson1References.js'

const lessonTitle = 'Lesson 1: One-Dimensional Array'
const lessonDescription = 'Understanding one-dimensional arrays in C programming'
const topicId = 5 // Topic
const lessonId = 1 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: [
      {
        type: 'text',
        value: `Imagine you're listing your favorite songs 🎵.
Instead of writing them one by one like:`,
      },
      {
        type: 'code',
        value: `song1 = "Perfect";
song2 = "Halo";
song3 = "Shape of You";`,
      },
      {
        type: 'text',
        value: `You can keep them all together in one list — an array!

💡 An array in programming is like a playlist,
where each song (value) has its own position number (index).

You can easily play or access any song by knowing its index —
just like choosing track #2 or #3 on your playlist.`,
      },
    ],
  },
  {
    id: 2,
    title: 'Concept Explanation (What Is a One-Dimensional Array?)',
    content: [
      {
        type: 'text',
        value: `A one-dimensional array stores a list of elements of the same data type.

🧩 Syntax:`,
      },
      {
        type: 'code',
        value: `dataType arrayName[size];`,
      },
      {
        type: 'text',
        value: `✅ Example:`,
      },
      {
        type: 'code',
        value: `int scores[5];`,
      },
      {
        type: 'text',
        value: `This creates an array named scores with 5 elements,
each capable of storing an integer value.`,
      },
    ],
  },
  {
    id: 3,
    title: 'Concept Explanation (How to Assign and Access Values)',
    content: [
      {
        type: 'text',
        value: `You can assign values using indexes (starting from 0).

Example:`,
      },
      {
        type: 'code',
        value: `int scores[5] = {90, 85, 88, 92, 75};
printf("%d", scores[2]);`,
      },
      {
        type: 'text',
        value: `💬 Explanation:
scores[0] → 90
scores[1] → 85
scores[2] → 88 (this is what prints)

Array indexes always start at 0, not 1!`,
      },
    ],
  },
  {
    id: 4,
    title: 'Guided Example',
    code: `#include <stdio.h>

int main() {
    int numbers[4] = {10, 20, 30, 40};

    for (int i = 0; i < 4; i++) {
        printf("%d ", numbers[i]);
    }

    return 0;
}`,
    explanation: `💬 Explanation:
• int numbers[4] → declares an array of 4 integers.
• {10, 20, 30, 40} → initializes the array.
• The for loop prints all elements using numbers[i].

🧠 Output:
10 20 30 40`,
  },
  {
    id: 5,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'What is the first index of an array in C?',
      options: ['0', '1', '-1'],
      answer: '0',
    },
  },
  {
    id: 6,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'Which of the following correctly declares an array of 3 integers?',
      options: ['int num[3];', 'int num(3);', 'array num[3];'],
      answer: 'int num[3];',
    },
  },
  {
    id: 7,
    title: 'Quick Practice (Fill in the Blanks)',
    content: `Fill in the blanks to create an array of 4 float values and print the second element:`,
    code: `#include <stdio.h>

int main() {
    [_____] grades[4] = {1.5, 2.0, 1.75, 2.25};
    printf("%.2f", grades[____]);
    return 0;
}`,
    multipleQuiz: [
      {
        question: 'Fill in the blanks:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'float' },
          { id: 2, answer: '1' },
        ],
        template: '[1] grades[4] = {...}; printf("%.2f", grades[[2]]);',
        options: ['float', '1', '2', '3'],
      },
    ],
  },
  {
    id: 8,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'What happens if you try to access an element beyond the array size?',
      options: [
        'It causes an error or unexpected behavior',
        'It automatically resizes the array',
        'It ignores the element',
      ],
      answer: 'It causes an error or unexpected behavior',
    },
  },
  {
    id: 9,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the missing parts to store and display 5 ages:`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'int' },
        { id: 2, answer: 'int' },
        { id: 3, answer: 'age[i]' },
      ],
      options: ['float', 'int', 'i', 'age[i]', 'double', 'int', 'char', 'age'],
      template: `#include <stdio.h>

int main() {
    [1] age[5] = {18, 19, 20, 21, 22};

    for ([2] i = 0; i < 5; i++) {
        printf("%d ", [3]);
    }

    return 0;
}`,
      correctCode: `#include <stdio.h>

int main() {
    int age[5] = {18, 19, 20, 21, 22};

    for (int i = 0; i < 5; i++) {
        printf("%d ", age[i]);
    }

    return 0;
}`,
    },
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: `🧠 What You Learned:

• A one-dimensional array stores multiple values of the same type under one name.
• Array elements are accessed by indexes, starting from 0.
• Syntax: dataType arrayName[size];
• Use loops (like for) to process or display all array elements.
• Accessing elements outside the array size may cause errors or unexpected results.`,
  },
  {
    id: 11,
    title: 'References',
    references: lesson1References,
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
