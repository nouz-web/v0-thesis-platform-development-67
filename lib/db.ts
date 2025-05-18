// This is a mock database service for the absence management platform
// In a real implementation, this would connect to a real database

export type User = {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  department: string
}

export type Course = {
  id: string
  code: string
  name: string
  teacherId: string
  semester: string
  maxAbsences: number
}

export type Session = {
  id: string
  courseId: string
  date: Date
  startTime: string
  endTime: string
  type: "lecture" | "lab" | "tutorial" | "exam"
  qrCodeId?: string
}

export type Attendance = {
  id: string
  sessionId: string
  studentId: string
  status: "present" | "absent"
  timestamp: Date
}

export type Justification = {
  id: string
  studentId: string
  sessionId: string
  reason: string
  documentUrl: string
  status: "pending" | "approved" | "rejected"
  submittedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
}

export type QRCode = {
  id: string
  sessionId: string
  generatedAt: Date
  expiresAt: Date
  isActive: boolean
}

// Mock data
const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@university.edu",
    role: "admin",
    department: "Administration",
  },
  {
    id: "2",
    name: "Dr. Ahmed",
    email: "ahmed@university.edu",
    role: "teacher",
    department: "Computer Science",
  },
  {
    id: "3",
    name: "Dr. Fatima",
    email: "fatima@university.edu",
    role: "teacher",
    department: "Computer Science",
  },
  {
    id: "4",
    name: "Mohammed",
    email: "mohammed@university.edu",
    role: "student",
    department: "Computer Science",
  },
]

const courses: Course[] = [
  {
    id: "1",
    code: "CS301",
    name: "Advanced Algorithms",
    teacherId: "2",
    semester: "Spring 2023",
    maxAbsences: 4,
  },
  {
    id: "2",
    code: "CS205",
    name: "Database Systems",
    teacherId: "3",
    semester: "Spring 2023",
    maxAbsences: 4,
  },
  {
    id: "3",
    code: "CS401",
    name: "Machine Learning",
    teacherId: "2",
    semester: "Spring 2023",
    maxAbsences: 4,
  },
  {
    id: "4",
    code: "CS102",
    name: "Introduction to Programming",
    teacherId: "3",
    semester: "Spring 2023",
    maxAbsences: 6,
  },
]

// Database service
export const db = {
  // User methods
  getUsers: () => users,
  getUserById: (id: string) => users.find((user) => user.id === id),
  getUsersByRole: (role: User["role"]) => users.filter((user) => user.role === role),

  // Course methods
  getCourses: () => courses,
  getCourseById: (id: string) => courses.find((course) => course.id === id),
  getCoursesByTeacher: (teacherId: string) => courses.filter((course) => course.teacherId === teacherId),

  // Session methods
  createSession: (session: Omit<Session, "id">) => {
    // In a real implementation, this would create a session in the database
    return {
      id: Math.random().toString(36).substring(2, 9),
      ...session,
    }
  },

  // QR Code methods
  generateQRCode: (sessionId: string, validityMinutes: number) => {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + validityMinutes * 60000)

    // In a real implementation, this would create a QR code in the database
    return {
      id: Math.random().toString(36).substring(2, 9),
      sessionId,
      generatedAt: now,
      expiresAt,
      isActive: true,
    }
  },

  // Attendance methods
  recordAttendance: (sessionId: string, studentId: string) => {
    // In a real implementation, this would record attendance in the database
    return {
      id: Math.random().toString(36).substring(2, 9),
      sessionId,
      studentId,
      status: "present",
      timestamp: new Date(),
    }
  },

  // Justification methods
  submitJustification: (justification: Omit<Justification, "id" | "submittedAt" | "status">) => {
    // In a real implementation, this would create a justification in the database
    return {
      id: Math.random().toString(36).substring(2, 9),
      ...justification,
      status: "pending",
      submittedAt: new Date(),
    }
  },

  reviewJustification: (justificationId: string, status: "approved" | "rejected", reviewedBy: string) => {
    // In a real implementation, this would update a justification in the database
    return {
      id: justificationId,
      status,
      reviewedAt: new Date(),
      reviewedBy,
    }
  },
}
