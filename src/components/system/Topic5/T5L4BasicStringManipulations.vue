<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { lesson4References } from '../Dashboard/Data/references/topic5/lesson4References.js'

const lessonTitle = 'Lesson 4: Basic String Manipulations and Functions'
const lessonDescription = 'Mastering string manipulation functions in C'
const topicId = 5 // Topic
const lessonId = 4 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine using your phone to edit a contact name 📱.
You might:
✏️ Type a new name (copy)
➕ Add a last name (concatenate)
🔢 Count the letters (length)
⚖️ Compare two names to see if they match (compare)

💡 In programming, these are all examples of string manipulations —
changing or working with text stored in character arrays!`,
  },
  {
    id: 2,
    title: 'Concept Explanation (What Is String Manipulation?)',
    content: `String manipulation means modifying, analyzing, or comparing strings to perform useful operations.

🧩 Common operations include:
• Finding length → strlen()
• Copying → strcpy()
• Joining → strcat()
• Comparing → strcmp()

All these functions are found in <string.h>.`,
  },
  {
    id: 3,
    title: 'Function 1: strlen() – Find String Length',
    content: [
      {
        type: 'text',
        value: `Finds the number of characters in a string (excluding \\0).`,
      },
      {
        type: 'code',
        value: `#include <stdio.h>
#include <string.h>

int main() {
    char city[] = "Cebu";
    printf("Length: %lu", strlen(city));
    return 0;
}`,
      },
      {
        type: 'text',
        value: `🧠 Output:
Length: 4

💬 Explanation:
• "Cebu" has 4 characters.
• strlen() returns the length as an unsigned long value.
• We use %lu in printf() because:
  • %l means "long"
  • %u means "unsigned integer"
✅ In short: %lu correctly prints the number returned by strlen().`,
      },
    ],
  },
  {
    id: 4,
    title: 'Function 2: strcpy() – Copy One String to Another',
    content: [
      {
        type: 'text',
        value: `Copies the contents of one string into another.`,
      },
      {
        type: 'code',
        value: `#include <stdio.h>
#include <string.h>

int main() {
    char source[] = "Hello";
    char destination[20];
    strcpy(destination, source);
    printf("%s", destination);
    return 0;
}`,
      },
      {
        type: 'text',
        value: `🧠 Output:
Hello

💬 Explanation:
• strcpy(destination, source) → copies everything from source into destination.
• The destination array must be large enough to hold the copied string.`,
      },
    ],
  },
  {
    id: 5,
    title: 'Function 3: strcat() – Join Two Strings',
    content: [
      {
        type: 'text',
        value: `Joins (concatenates) one string to the end of another.`,
      },
      {
        type: 'code',
        value: `#include <stdio.h>
#include <string.h>

int main() {
    char first[20] = "Good";
    char second[] = "Evening";
    strcat(first, second);
    printf("%s", first);
    return 0;
}`,
      },
      {
        type: 'text',
        value: `🧠 Output:
GoodEvening

💬 Explanation:
• strcat(first, second) → adds the second string to the end of the first one.
• If you want a space in between, write "Good " instead of "Good".`,
      },
    ],
  },
  {
    id: 6,
    title: 'Function 4: strcmp() – Compare Two Strings',
    content: [
      {
        type: 'text',
        value: `Compares two strings character by character.`,
      },
      {
        type: 'code',
        value: `#include <stdio.h>
#include <string.h>

int main() {
    char password1[] = "admin";
    char password2[] = "Admin";

    if (strcmp(password1, password2) == 0)
        printf("Match!");
    else
        printf("Not Match!");
    return 0;
}`,
      },
      {
        type: 'text',
        value: `🧠 Output:
Not Match!

💬 Explanation:
• strcmp(a, b) returns 0 if strings are the same.
• Returns a nonzero value if they are different.
• It is case-sensitive, so "admin" ≠ "Admin".`,
      },
    ],
  },
  {
    id: 7,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'Which function is used to combine two strings?',
      options: ['strcat()', 'strcpy()', 'strlen()', 'strcmp()'],
      answer: 'strcat()',
    },
  },
  {
    id: 8,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'What does strcmp() return when two strings are exactly the same?',
      options: ['0', '1', '-1'],
      answer: '0',
    },
  },
  {
    id: 9,
    title: 'Quick Practice (Fill in the Blanks)',
    content: `Fill in the blanks to copy a string and display it.`,
    code: `#include <stdio.h>
#include <string.h>

int main() {
    char name1[] = "Alex";
    char name2[20];
    [_____](name2, name1);
    printf("%s", name2);
    return 0;
}`,
    multipleQuiz: [
      {
        question: 'Fill in the blank:',
        interactive: true,
        blanks: [{ id: 1, answer: 'strcpy' }],
        template: '[1](name2, name1);',
        options: ['strcat', 'strcpy', 'strcmp'],
      },
    ],
    explanation: `🧠 Output: Alex`,
  },
  {
    id: 10,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the missing parts to join and print two words.`,
    codingTask: {
      blanks: [{ id: 1, answer: 'strcat' }],
      options: ['strcat', 'strlen', 'strcmp'],
      template: `#include <stdio.h>
#include <string.h>

int main() {
    char word1[20] = "C";
    char word2[] = "Programming";

    [1](word1, word2);
    printf("%s", word1);
    return 0;
}`,
      correctCode: `#include <stdio.h>
#include <string.h>

int main() {
    char word1[20] = "C";
    char word2[] = "Programming";

    strcat(word1, word2);
    printf("%s", word1);
    return 0;
}`,
    },
    explanation: `🧠 Output: CProgramming`,
  },
  {
    id: 11,
    title: 'Common Mistake Alert ⚠️',
    content: `If the destination array isn't large enough to hold the result of strcpy() or strcat(),
your program might crash or behave unpredictably.

💡 Always make sure your destination array is big enough to store the entire string plus the \\0 character!`,
  },
  {
    id: 12,
    title: 'Lesson Takeaways',
    content: `🧠 What You Learned:

• String manipulation allows you to modify and process text easily.
• All string functions come from <string.h>.
• Common functions:
  • strlen() → counts the length of a string
  • strcpy() → copies one string into another
  • strcat() → joins two strings
  • strcmp() → compares two strings
• strcmp() returns 0 if the strings are equal.
• Use %lu when printing results of strlen() because it returns an unsigned long.
• Always allocate enough memory for destination arrays.`,
  },
  {
    id: 13,
    title: 'References',
    references: lesson4References,
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
