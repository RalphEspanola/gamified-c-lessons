// src/data/topic1Data.js
// This file contains Topic 1: C Fundamentals data only

export const topic1 = {
  id: 1,
  title: 'Topic 1: C Fundamentals',
  icon: 'mdi-code-braces',
  lessonsCount: 6,
  duration: '45 mins',
  lessons: [
    {
      id: 1,
      title: 'Lesson 1: Elements of a C Program',
      subtitle: 'Learn the basic structure of C programs',
      status: 'completed',
      route: '/topic1/lesson1',
    },
    {
      id: 2,
      title: 'Lesson 2: Variables and Data Types',
      subtitle: 'Understanding variables and data types in C',
      status: 'in-progress',
      route: '/topic1/lesson2',
    },
    {
      id: 3,
      title: 'Lesson 3: Executable Statements (Input & Output)',
      subtitle: 'Master input and output operations',
      status: 'locked',
      route: '/topic1/lesson3',
    },
    {
      id: 4,
      title: 'Lesson 4: Arithmetic Expressions',
      subtitle: 'Understand how to perform calculations in C',
      status: 'locked',
      route: '/topic1/lesson4',
    },
    {
      id: 5,
      title: 'Lesson 5: String Formatter',
      subtitle: 'Format and display text neatly using format specifiers',
      status: 'locked',
      route: '/topic1/lesson5',
    },
    {
      id: 6,
      title: 'Lesson 6: Common Programming Errors',
      subtitle: 'Identify and avoid frequent coding mistakes',
      status: 'locked',
      route: '/topic1/lesson6',
    },
  ],
  quiz: {
    id: 7,
    title: 'Topic 1 Quiz: C Fundamentals',
    subtitle: 'Test your understanding of basic C concepts',
    status: 'locked',
    route: '/topic1/Topic1Quiz',
  },
}
