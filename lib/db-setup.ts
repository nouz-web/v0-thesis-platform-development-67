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
  maxTDAbsences Int
