/**
 * Database Setup Guide
 *
 * This file provides instructions for setting up the database for the Absence Management Platform.
 *
 * Option 1: PostgreSQL with Prisma (Recommended)
 * =============================================
 *
 * 1. Install PostgreSQL:
 *    - Download and install PostgreSQL from https://www.postgresql.org/download/
 *    - Create a new database named "absence_management"
 *
 * 2. Install Prisma:
 *    - Run: npm install prisma --save-dev
 *    - Run: npx prisma init
 *
 * 3. Configure Prisma:
 *    - Update the DATABASE_URL in .env file with your PostgreSQL connection string
 *    - Example: DATABASE_URL="postgresql://username:password@localhost:5432/absence_management"
 *
 * 4. Define Schema:
 *    - Copy the schema below to your prisma/schema.prisma file
 *
 * 5. Generate Prisma Client:
 *    - Run: npx prisma generate
 *
 * 6. Create Database Tables:
 *    - Run: npx prisma migrate dev --name init
 *
 * 7. Seed Database (Optional):
 *    - Create a seed.ts file in the prisma folder
 *    - Run: npx prisma db seed
 *
 * Option 2: SQLite (Simpler for Development)
 * =========================================
 *
 * 1. Configure Prisma for SQLite:
 *    - Update the DATABASE_URL in .env file:
 *    - Example: DATABASE_URL="file:./dev.db"
 *
 * 2. Follow steps 4-7 from Option 1
 *
 * Option 3: MongoDB
 * ================
 *
 * 1. Install MongoDB:
 *    - Download and install MongoDB from https://www.mongodb.com/try/download/community
 *    - Create a new database named "absence_management"
 *
 * 2. Install Mongoose:
 *    - Run: npm install mongoose
 *
 * 3. Configure MongoDB:
 *    - Add MONGODB_URI to your .env file
 *    - Example: MONGODB_URI="mongodb://localhost:27017/absence_management"
 *
 * 4. Create models using the schema structure below (adapted for MongoDB)
 */

// Prisma Schema (for Option 1 and 2)
/*
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "sqlite" for Option 2
  url      = env("DATABASE_URL")
}

model User {
  id            String          @id @default(cuid())
  name          String
  email         String          @unique
  password      String
  role          Role            @default(STUDENT)
  department    String
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  sessions      Session[]       @relation("TeacherSessions")
  attendances   Attendance[]
  justifications Justification[] @relation("StudentJustifications")
  reviewedJustifications Justification[] @relation("ReviewedJustifications")
}

enum Role {
  ADMIN
  TEACHER
  STUDENT
}

model Course {
  id            String          @id @default(cuid())
  code          String          @unique
  name          String
  department    String
  semester      String
  maxTDAbsences Int             @default(2)
  maxCOURAbsences Int           @default(5)
  teacherId     String
  teacher       User            @relation("TeacherSessions", fields: [teacherId], references: [id])
  sessions      Session[]
}

model Session {
  id            String          @id @default(cuid())
  courseId      String
  course        Course          @relation(fields: [courseId], references: [id])
  date          DateTime
  startTime     String
  endTime       String
  type          SessionType
  qrCode        QRCode?
  attendances   Attendance[]
}

enum SessionType {
  LECTURE
  LAB
  TUTORIAL
  EXAM
}

model Attendance {
  id            String          @id @default(cuid())
  sessionId     String
  session       Session         @relation(fields: [sessionId], references: [id])
  studentId     String
  student       User            @relation(fields: [studentId], references: [id])
  status        AttendanceStatus
  timestamp     DateTime        @default(now())
}

enum AttendanceStatus {
  PRESENT
  ABSENT
  LATE
}

model Justification {
  id            String          @id @default(cuid())
  studentId     String
  student       User            @relation("StudentJustifications", fields: [studentId], references: [id])
  sessionId     String
  reason        String
  documentUrl   String?
  status        JustificationStatus @default(PENDING)
  submittedAt   DateTime        @default(now())
  reviewedAt    DateTime?
  reviewedById  String?
  reviewedBy    User?           @relation("ReviewedJustifications", fields: [reviewedById], references: [id])
}

enum JustificationStatus {
  PENDING
  APPROVED
  REJECTED
}

model QRCode {
  id            String          @id @default(cuid())
  sessionId     String          @unique
  session       Session         @relation(fields: [sessionId], references: [id])
  generatedAt   DateTime        @default(now())
  expiresAt     DateTime
  isActive      Boolean         @default(true)
}
*/

// MongoDB Schema (for Option 3)
/*
// User Model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'TEACHER', 'STUDENT'], default: 'STUDENT' },
  department: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Course Model
const CourseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  maxTDAbsences: { type: Number, default: 2 },
  maxCOURAbsences: { type: Number, default: 5 },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Session Model
const SessionSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  type: { type: String, enum: ['LECTURE', 'LAB', 'TUTORIAL', 'EXAM'], required: true }
});

// Attendance Model
const AttendanceSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['PRESENT', 'ABSENT', 'LATE'], required: true },
  timestamp: { type: Date, default: Date.now }
});

// Justification Model
const JustificationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  reason: { type: String, required: true },
  documentUrl: { type: String },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date },
  reviewedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// QRCode Model
const QRCodeSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true, unique: true },
  generatedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
});
*/

/**
 * Option 4: Supabase (Recommended for Vercel Deployment)
 * =====================================================
 *
 * 1. Create a Supabase project:
 *    - Go to https://supabase.com/ and create a new project
 *    - Note your project URL and anon key
 *
 * 2. Install Supabase client:
 *    - Run: npm install @supabase/supabase-js
 *
 * 3. Configure Supabase:
 *    - Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file
 *    - Example:
 *      NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
 *      NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
 *
 * 4. Create tables in Supabase:
 *    - Use the SQL editor in the Supabase dashboard to create tables
 *    - Use the schema structure below (adapted for PostgreSQL)
 *
 * 5. Set up authentication:
 *    - Configure authentication providers in the Supabase dashboard
 *    - Implement authentication in your app using the Supabase client
 */

// Supabase SQL Schema
/*
-- Create users table with auth integration
CREATE TABLE users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'STUDENT' CHECK (role IN ('ADMIN', 'TEACHER', 'STUDENT')),
  department TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  semester TEXT NOT NULL,
  max_td_absences INTEGER DEFAULT 2,
  max_cour_absences INTEGER DEFAULT 5,
  teacher_id UUID REFERENCES users NOT NULL
);

-- Create sessions table
CREATE TABLE sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses NOT NULL,
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('LECTURE', 'LAB', 'TUTORIAL', 'EXAM'))
);

-- Create attendance table
CREATE TABLE attendance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES sessions NOT NULL,
  student_id UUID REFERENCES users NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PRESENT', 'ABSENT', 'LATE')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(session_id, student_id)
);

-- Create justifications table
CREATE TABLE justifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES users NOT NULL,
  session_id UUID REFERENCES sessions NOT NULL,
  reason TEXT NOT NULL,
  document_url TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by_id UUID REFERENCES users
);

-- Create qr_codes table
CREATE TABLE qr_codes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES sessions NOT NULL UNIQUE,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE justifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

-- Example policies (customize as needed)
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Teachers can view their courses" ON courses
  FOR SELECT USING (auth.uid() = teacher_id);

-- Add more policies as needed for your application
*/

/**
 * Connecting to the Database
 * =========================
 *
 * After setting up your database using one of the options above,
 * you'll need to update the lib/db.ts file to connect to your database.
 *
 * For Prisma (Option 1 and 2):
 * ----------------------------
 * ```
 * import { PrismaClient } from '@prisma/client'
 *
 * const prisma = new PrismaClient()
 *
 * export default prisma
 * ```
 *
 * For MongoDB (Option 3):
 * ----------------------
 * ```
 * import mongoose from 'mongoose'
 *
 * const MONGODB_URI = process.env.MONGODB_URI
 *
 * if (!MONGODB_URI) {
 *   throw new Error('Please define the MONGODB_URI environment variable')
 * }
 *
 * let cached = global.mongoose
 *
 * if (!cached) {
 *   cached = global.mongoose = { conn: null, promise: null }
 * }
 *
 * async function dbConnect() {
 *   if (cached.conn) {
 *     return cached.conn
 *   }
 *
 *   if (!cached.promise) {
 *     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
 *       return mongoose
 *     })
 *   }
 *   cached.conn = await cached.promise
 *   return cached.conn
 * }
 *
 * export default dbConnect
 * ```
 *
 * For Supabase (Option 4):
 * -----------------------
 * ```
 * import { createClient } from '@supabase/supabase-js'
 *
 * const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
 * const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * if (!supabaseUrl || !supabaseAnonKey) {
 *   throw new Error('Missing Supabase environment variables')
 * }
 *
 * export const supabase = createClient(supabaseUrl, supabaseAnonKey)
 * ```
 */
