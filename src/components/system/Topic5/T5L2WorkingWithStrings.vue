<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'

const lessonTitle = 'Lesson 2: Working with Strings'
const lessonDescription = 'Understanding strings and string manipulation in C'
const topicId = 5 // Topic
const lessonId = 2 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine you're sending a text message 📱.
Every word, emoji, and letter you type is actually stored as a sequence of characters —
that's what we call a string in programming!

💬 In C, a string is like a word made of individual letters stored side by side in memory.
Each letter is placed in an array of characters, and the word ends with a special character called \\0 (null terminator).`,
  },
  {
    id: 2,
    title: 'Concept Explanation (What Is a String?)',
    content: [
      {
        type: 'text',
        value: `A string in C is a collection of characters stored in a character array.

🧩 Syntax:`,
      },
      {
        type: 'code',
        value: `char stringName[size];`,
      },
      {
        type: 'text',
        value: `✅ Example:`,
      },
      {
        type: 'code',
        value: `char name[6] = "Maria";`,
      },
      {
        type: 'text',
        value: `💬 Explanation:
The string "Maria" is made up of 5 letters + 1 null terminator (\\0),
so the size must be 6.

The computer stores it as:
M | a | r | i | a | \\0`,
      },
    ],
  },
  {
    id: 3,
    title: 'Concept Explanation (Declaring and Initializing Strings)',
    content: [
      {
        type: 'text',
        value: `You can declare and assign strings in two ways:

✅ Method 1 – Direct Initialization`,
      },
      {
        type: 'code',
        value: `char city[] = "Manila";`,
      },
      {
        type: 'text',
        value: `✅ Method 2 – Character by Character`,
      },
      {
        type: 'code',
        value: `char city[7] = {'M', 'a', 'n', 'i', 'l', 'a', '\\0'};`,
      },
      {
        type: 'text',
        value: `Both are valid!
🧠 Always remember to leave space for \\0 at the end.`,
      },
    ],
  },
  {
    id: 4,
    title: 'Guided Example',
    code: `#include <stdio.h>

int main() {
    char name[] = "Conrad";
    printf("Hello, %s!", name);
    return 0;
}`,
    explanation: `💬 Explanation (Line by Line):
• char name[] = "Conrad"; → creates a string named name.
• %s → format specifier for strings in printf().

Output:
Hello, Conrad!`,
  },
  {
    id: 5,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'What is a string in C?',
      options: ['A group of characters stored in an array', 'A single number', 'A Boolean value'],
      answer: 'A group of characters stored in an array',
    },
  },
  {
    id: 6,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'What special character marks the end of every string in C?',
      options: ['\\t', '\\n', '/0', '\\0'],
      answer: '\\0',
    },
  },
  {
    id: 7,
    title: 'Quick Practice (Fill in the Blanks)',
    content: `Fill in the blanks to declare a string and print it:`,
    code: `#include <stdio.h>

int main() {
    [_____] greeting[] = "Welcome";
    printf("%[____]", greeting);
    return 0;
}`,
    multipleQuiz: [
      {
        question: 'Fill in the blanks:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'char' },
          { id: 2, answer: 's' },
        ],
        template: '[1] greeting[] = "Welcome"; printf("%[2]", greeting);',
        options: ['char', 's', 'd', 'int'],
      },
    ],
  },
  {
    id: 8,
    title: 'Concept Extension (Using String Functions)',
    content: [
      {
        type: 'text',
        value: `To make working with strings easier, C provides string functions from <string.h>.

✅ Example Functions:`,
      },
    ],
    explanation: `<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strlen()</td>
      <td>Finds string length</td>
      <td>strlen(name)</td>
    </tr>
    <tr>
      <td>strcpy()</td>
      <td>Copies one string to another</td>
      <td>strcpy(newName, name)</td>
    </tr>
    <tr>
      <td>strcat()</td>
      <td>Joins two strings</td>
      <td>strcat(first, last)</td>
    </tr>
    <tr>
      <td>strcmp()</td>
      <td>Compares two strings</td>
      <td>strcmp(a, b)</td>
    </tr>
  </tbody>
</table>

💬 Example:
\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char word1[] = "Hello";
    char word2[] = "World";
    strcat(word1, word2);
    printf("%s", word1);
}
\`\`\`

🧠 Output:
HelloWorld`,
  },
  {
    id: 9,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'Which function can be used to find how long a string is?',
      options: ['strcat()', 'strlen()', 'strcmp()'],
      answer: 'strlen()',
    },
  },
  {
    id: 10,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the code to copy one string into another and display it.`,
    codingTask: {
      blanks: [{ id: 1, answer: 'strcpy' }],
      options: ['strcpy', 'strlen', 'strcat'],
      template: `#include <stdio.h>
#include <string.h>

int main() {
    char first[] = "Programming";
    char copy[20];

    [1](copy, first);
    printf("%s", copy);

    return 0;
}`,
      correctCode: `#include <stdio.h>
#include <string.h>

int main() {
    char first[] = "Programming";
    char copy[20];

    strcpy(copy, first);
    printf("%s", copy);

    return 0;
}`,
    },
  },
  {
    id: 11,
    title: 'Lesson Takeaways',
    content: `🧠 What You Learned:

• A string is a sequence of characters stored in a character array.
• Strings always end with the \\0 (null terminator).
• Use %s in printf() to print strings.
• Common string functions from <string.h>:
  • strlen() → get string length
  • strcpy() → copy strings
  • strcat() → join strings
  • strcmp() → compare strings
• Always allocate enough space for all characters plus the null terminator.`,
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
