export const quizCategories = [
  {
    id: 1,
    name: 'General Knowledge',
    questions: [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 'Paris',
        topic: 'Geography'
      },
      {
        id: 2,
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars',
        topic: 'Astronomy'
      },
      {
        id: 3,
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        correctAnswer: 'Leonardo da Vinci',
        topic: 'Art History'
      }
    ]
  },
  {
    id: 2,
    name: 'Science',
    questions: [
      {
        id: 1,
        question: 'What is the chemical symbol for gold?',
        options: ['Ag', 'Au', 'Fe', 'Cu'],
        correctAnswer: 'Au',
        topic: 'Chemistry'
      },
      {
        id: 2,
        question: 'What is the largest organ in the human body?',
        options: ['Heart', 'Brain', 'Skin', 'Liver'],
        correctAnswer: 'Skin',
        topic: 'Biology'
      },
      {
        id: 3,
        question: 'What is the speed of light?',
        options: ['299,792 km/s', '199,792 km/s', '399,792 km/s', '499,792 km/s'],
        correctAnswer: '299,792 km/s',
        topic: 'Physics'
      }
    ]
  },
  {
    id: 3,
    name: 'Technology',
    questions: [
      {
        id: 1,
        question: 'Who is the co-founder of Microsoft?',
        options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Larry Page'],
        correctAnswer: 'Bill Gates',
        topic: 'Tech History'
      },
      {
        id: 2,
        question: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Computer Processing Unit'],
        correctAnswer: 'Central Processing Unit',
        topic: 'Computer Hardware'
      },
      {
        id: 3,
        question: 'Which programming language is known as the "mother of all languages"?',
        options: ['Python', 'Java', 'C', 'Assembly'],
        correctAnswer: 'C',
        topic: 'Programming'
      }
    ]
  },
  {
    id: 4,
    name: 'Mathematics',
    questions: [
      {
        id: 1,
        question: 'What is the value of π (pi) to two decimal places?',
        options: ['3.14', '3.16', '3.12', '3.18'],
        correctAnswer: '3.14',
        topic: 'Basic Math'
      },
      {
        id: 2,
        question: 'What is the square root of 144?',
        options: ['10', '12', '14', '16'],
        correctAnswer: '12',
        topic: 'Algebra'
      },
      {
        id: 3,
        question: 'In a right triangle, what is the name of the longest side?',
        options: ['Hypotenuse', 'Base', 'Height', 'Adjacent'],
        correctAnswer: 'Hypotenuse',
        topic: 'Geometry'
      }
    ]
  }
];

export const learningResources = {
  'Geography': [
    'World Atlas - Interactive Maps',
    'National Geographic Education',
    'Geography Now YouTube Channel'
  ],
  'Astronomy': [
    'NASA Official Website',
    'Space.com',
    'Astronomy Picture of the Day'
  ],
  'Art History': [
    'Khan Academy Art History',
    'Google Arts & Culture',
    'The Art Story'
  ],
  'Chemistry': [
    'Khan Academy Chemistry',
    'Royal Society of Chemistry',
    'Chemistry LibreTexts'
  ],
  'Biology': [
    'Khan Academy Biology',
    'National Geographic',
    'Biology Online'
  ],
  'Physics': [
    'Khan Academy Physics',
    'Physics Classroom',
    'MIT OpenCourseWare'
  ],
  'Tech History': [
    'Computer History Museum',
    'TechCrunch',
    'Wired Magazine'
  ],
  'Computer Hardware': [
    'PC Part Picker',
    'Tom\'s Hardware',
    'TechRadar'
  ],
  'Programming': [
    'freeCodeCamp',
    'MDN Web Docs',
    'W3Schools'
  ],
  'Basic Math': [
    'Khan Academy Math',
    'IXL Math',
    'Math is Fun'
  ],
  'Algebra': [
    'Khan Academy Algebra',
    'Algebra.com',
    'Purple Math'
  ],
  'Geometry': [
    'Khan Academy Geometry',
    'GeoGebra',
    'Math Planet'
  ]
};