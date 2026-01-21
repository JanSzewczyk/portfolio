import { type Education } from "./types";

export const EDUCATION: Education[] = [
  {
    id: "edu-1",
    institution: "Cracow University of Technology",
    institutionUrl: "https://www.pk.edu.pl",
    location: "Cracow, Poland",
    degree: "master",
    fieldOfStudy: "Computer Science",
    startDate: "2019-10-01",
    endDate: "2024-02-01",
    grade: "5.0",
    thesis: {
      title: "Hands Control System",
      description:
        "Developed an AI-powered mouse control system using hand gestures, enabling hands-free computer interaction. The system uses computer vision and machine learning to track hand movements in real-time and translate them into precise cursor control.",
      technologies: ["Python", "MediaPipe", "scikit-learn", "OpenCV", "TensorFlow"],
      url: "https://github.com/janszewczyk"
    },
    achievements: [
      "Graduated with honors (5.0/5.0 GPA)",
      "Master's thesis focused on AI and computer vision",
      "Published research on gesture recognition systems"
    ],
    coursework: [
      "Machine Learning & Artificial Intelligence",
      "Computer Vision",
      "Advanced Algorithms & Data Structures",
      "Software Engineering",
      "Distributed Systems",
      "Web Technologies"
    ]
  },
  {
    id: "edu-2",
    institution: "Cracow University of Technology",
    institutionUrl: "https://www.pk.edu.pl",
    location: "Cracow, Poland",
    degree: "bachelor",
    fieldOfStudy: "Computer Science",
    startDate: "2016-10-01",
    endDate: "2019-06-30",
    grade: "4.5",
    thesis: {
      title: "Web-based Task Management System",
      description:
        "Designed and implemented a full-stack task management application with real-time collaboration features, user authentication, and responsive UI using modern web technologies.",
      technologies: ["JavaScript", "React", "Node.js", "MongoDB", "Express"]
    },
    achievements: [
      "Graduated with distinction (4.5/5.0 GPA)",
      "Dean's List for academic excellence (2017-2019)",
      "Best project award in Software Engineering course"
    ],
    coursework: [
      "Object-Oriented Programming",
      "Database Systems",
      "Computer Networks",
      "Operating Systems",
      "Algorithms & Data Structures",
      "Web Development Fundamentals"
    ]
  }
];
