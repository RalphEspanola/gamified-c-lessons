<script setup>
import LessonSlides from '../LessonSlides/LessonSlides.vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
const lessonTitle = 'Lesson 4: The Switch Statement'
const lessonDescription = 'Using switch statements inside loops in C programming'
const topicId = 3 // Topic
const lessonId = 4 // Lesson
const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `In the previous topic, you learned about the Switch Case statement 🔄 — it helped you make choices between several options, like:
"If user picks 1, print Burger; if 2, print Fries; if 3, print Drink."

That was about decision-making — choosing one action out of many.

Now, we'll look at the Switch Statement again, but this time as part of looping programs, where it helps control what happens in each repetition of a loop.

💡 In short:
• Switch Case (Topic 2): used for decisions
• Switch Statement (Topic 3): used inside loops to manage repeated decisions`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `The switch statement in C checks a variable's value and performs specific actions based on it. It's especially useful when combined with loops — for example, in a simple text menu that repeats until the user chooses to exit.

Syntax:`,
    code: `switch (expression) {
    case value1:
        // code block
        break;
    case value2:
        // code block
        break;
    default:
        // code block
}`,
    explanation: `🧩 Key Reminders:
• Each case represents one possible value.
• break ends the current case.
• default runs when no other case matches.
• Works perfectly inside loops like while or do–while.`,
  },
  {
    id: 3,
    title: 'Example Program (Menu Loop)',
    content: `Here's a simple menu that keeps running until the user exits 👇`,
    code: `#include <stdio.h>

int main() {
    int choice = 0;

    while (choice != 3) {
        printf("\\nMenu:\\n");
        printf("1. Say Hello\\n");
        printf("2. Say Bye\\n");
        printf("3. Exit\\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Hello there!\\n");
                break;
            case 2:
                printf("Goodbye!\\n");
                break;
            case 3:
                printf("Exiting program...\\n");
                break;
            default:
                printf("Invalid choice!\\n");
        }
    }

    return 0;
}`,
    explanation: `💻 Output (sample run):
Menu:
1. Say Hello
2. Say Bye
3. Exit
Enter choice: 1
Hello there!`,
  },
  {
    id: 4,
    title: 'Check for Understanding (1)',
    multipleQuiz: [
      {
        question:
          'What is the difference between the Switch Case from Topic 2 and the Switch Statement here?',
        interactive: true,
        blanks: [{ id: 1, answer: 'Switch Statement can be used repeatedly in loops' }],
        template: 'Switch Case makes one-time decisions; [1]',
        options: [
          'Switch Case makes one-time decisions',
          'Switch Statement can be used repeatedly in loops',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question: 'What keyword is used to stop a case from "falling through" to the next one?',
        interactive: true,
        blanks: [{ id: 1, answer: 'break' }],
        template: 'Answer: [1]',
        options: ['break', 'exit', 'stop', 'end'],
      },
    ],
  },
  {
    id: 6,
    title: 'Guided Example (ATM Menu Simulation)',
    content: `Let's see another example — simulating ATM options 💳`,
    code: `#include <stdio.h>

int main() {
    int option = 0;

    do {
        printf("\\nATM Menu:\\n");
        printf("1. Withdraw\\n");
        printf("2. Deposit\\n");
        printf("3. Exit\\n");
        printf("Select option: ");
        scanf("%d", &option);

        switch (option) {
            case 1:
                printf("Withdrawing money...\\n");
                break;
            case 2:
                printf("Depositing money...\\n");
                break;
            case 3:
                printf("Thank you! Goodbye.\\n");
                break;
            default:
                printf("Invalid option. Try again.\\n");
        }
    } while (option != 3);

    return 0;
}`,
    explanation: `💡 This program keeps showing the menu while the user hasn't selected Exit (3).`,
  },
  {
    id: 7,
    title: 'Quick Practice',
    content: `Fill in the blanks to create a menu using a switch statement:`,
    code: `int choice = 1;

switch (choice) {
    case 1:
        printf("Play Music");
        [_____];
    case 2:
        printf("Pause Music");
        [_____];
}`,
    multipleQuiz: [
      {
        question: 'Fill in the blanks:',
        interactive: true,
        blanks: [
          { id: 1, answer: 'break' },
          { id: 2, answer: 'break' },
        ],
        template: 'case 1: ... [1]; case 2: ... [2];',
        options: ['break', 'stop', 'break', 'exit'],
      },
    ],
    explanation: `💬 Always use break to stop after a matching case.`,
  },
  {
    id: 8,
    title: 'Deeper Practice / Coding Task',
    content: `Program Title: 🎮 Game Menu (Using Switch and While Loop)

Drag and drop the correct syntax to complete the program:`,
    codingTask: {
      blanks: [
        { id: 1, answer: 'while' },
        { id: 2, answer: 'switch' },
        { id: 3, answer: 'case' },
        { id: 4, answer: 'break' },
        { id: 5, answer: 'case' },
        { id: 6, answer: 'break' },
        { id: 7, answer: 'default' },
      ],
      options: ['case', 'while', 'default', 'switch', 'break', 'case', 'break'],
      template: `#include <stdio.h>

int main() {
    int choice = 0;

    [1] (choice != 3) {
        printf("\\n1. Start Game\\n2. Settings\\n3. Exit\\n");
        scanf("%d", &choice);

        [2] (choice) {
            [3] 1:
                printf("Game Started!\\n");
                [4];
            [5] 2:
                printf("Opening Settings...\\n");
                [6];
            [7]:
                printf("Goodbye!\\n");
        }
    }
    return 0;
}`,
      correctCode: `#include <stdio.h>

int main() {
    int choice = 0;

    while (choice != 3) {
        printf("\\n1. Start Game\\n2. Settings\\n3. Exit\\n");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Game Started!\\n");
                break;
            case 2:
                printf("Opening Settings...\\n");
                break;
            default:
                printf("Goodbye!\\n");
        }
    }
    return 0;
}`,
    },
  },
  {
    id: 9,
    title: 'Check for Understanding (3)',
    multipleQuiz: [
      {
        question:
          'What will happen if you forget to use break inside a case in a switch statement?\nThe program will [__________].',
        interactive: true,
        blanks: [{ id: 1, answer: 'run the next case too' }],
        template: 'Answer: [1]',
        options: ['stop immediately', 'run the next case too', 'show an error'],
      },
    ],
    explanation: `💬 This is called fall-through — one of the most common beginner errors.`,
  },
  {
    id: 10,
    title: 'Lesson Takeaways',
    content: `Key Points to Remember:

• The Switch Case (Topic 2) is used for single-time decisions.
• The Switch Statement (Topic 3) can be used inside loops to handle repeated user inputs or actions.
• Each case represents a possible value for the variable being checked.
• Always include break to prevent fall-through.
• default handles unmatched cases, like an "else" clause.`,
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
