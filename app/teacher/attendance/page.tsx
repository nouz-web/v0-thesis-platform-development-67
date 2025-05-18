"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, FileText, Users } from "lucide-react"
import { TeacherSidebar } from "../sidebar"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import Image from "next/image"

export default function AttendancePage() {
  const { t } = useLanguage()
  const [selectedCourse, setSelectedCourse] = useState("cs301")
  const [selectedSession, setSelectedSession] = useState("all")

  // Mock attendance data
  const sessions = [
    {
      id: "1",
      course: "CS301",
      type: "COUR",
      date: "2023-05-09",
      time: "08:30 - 10:00",
      totalStudents: 45,
      presentStudents: 42,
      absentStudents: 3,
    },
    {
      id: "2",
      course: "CS301",
      type: "TD",
      date: "2023-05-07",
      time: "10:15 - 11:45",
      totalStudents: 25,
      presentStudents: 23,
      absentStudents: 2,
    },
    {
      id: "3",
      course: "CS205",
      type: "COUR",
      date: "2023-05-06",
      time: "13:00 - 14:30",
      totalStudents: 40,
      presentStudents: 38,
      absentStudents: 2,
    },
    {
      id: "4",
      course: "CS205",
      type: "TD",
      date: "2023-05-04",
      time: "14:45 - 16:15",
      totalStudents: 20,
      presentStudents: 18,
      absentStudents: 2,
    },
    {
      id: "5",
      course: "CS401",
      type: "COUR",
      date: "2023-05-03",
      time: "08:30 - 10:00",
      totalStudents: 35,
      presentStudents: 32,
      absentStudents: 3,
    },
  ]

  // Mock student attendance data
  const studentAttendance = [
    {
      id: "1",
      name: "Mohammed Ali",
      studentId: "20190001",
      status: "present",
      time: "08:35",
    },
    {
      id: "2",
      name: "Amina Benali",
      studentId: "20190002",
      status: "present",
      time: "08:32",
    },
    {
      id: "3",
      name: "Karim Hadj",
      studentId: "20190003",
      status: "absent",
      time: "-",
    },
    {
      id: "4",
      name: "Leila Mansouri",
      studentId: "20190004",
      status: "present",
      time: "08:40",
    },
    {
      id: "5",
      name: "Omar Bouaziz",
      studentId: "20190005",
      status: "absent",
      time: "-",
    },
    {
      id: "6",
      name: "Fatima Zahra",
      studentId: "20190006",
      status: "present",
      time: "08:37",
    },
    {
      id: "7",
      name: "Youcef Kaddour",
      studentId: "20190007",
      status: "present",
      time: "08:33",
    },
    {
      id: "8",
      name: "Nadia Belkacem",
      studentId: "20190008",
      status: "absent",
      time: "-",
    },
  ]

  const filteredSessions = sessions.filter((session) => selectedCourse === "all" || session.course === selectedCourse)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <TeacherSidebar />

      <div className="flex-1">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_universite-rBCWJvlJdIulKoDqALIzWAGKTycOkW.png"
                alt="Abbas Laghrour University Khenchela Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <h1 className="text-xl font-bold text-slate-800">Attendance Records</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Attendance Records</h2>
            <p className="text-slate-600">View and manage student attendance for your courses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label>Select Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="cs301">CS301: Advanced Algorithms</SelectItem>
                  <SelectItem value="cs205">CS205: Database Systems</SelectItem>
                  <SelectItem value="cs401">CS401: Machine Learning</SelectItem>
                  <SelectItem value="cs102">CS102: Introduction to Programming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Session</Label>
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sessions</SelectItem>
                  {filteredSessions.map((session) => (
                    <SelectItem key={session.id} value={session.id}>
                      {session.course}: {session.type} ({session.date})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="sessions">
            <TabsList className="mb-6">
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>

            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Session Attendance
                  </CardTitle>
                  <CardDescription>Attendance records for each session</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Total Students</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead>Absent</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">{session.course}</TableCell>
                          <TableCell>{session.type}</TableCell>
                          <TableCell>{session.date}</TableCell>
                          <TableCell>{session.time}</TableCell>
                          <TableCell>{session.totalStudents}</TableCell>
                          <TableCell>
                            <span className="text-green-600">{session.presentStudents}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-red-600">{session.absentStudents}</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              <Users className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Student Attendance
                  </CardTitle>
                  <CardDescription>
                    {selectedSession === "all"
                      ? "Select a specific session to view student attendance"
                      : `Attendance for session on ${sessions.find((s) => s.id === selectedSession)?.date || ""}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedSession === "all" ? (
                    <div className="text-center py-8 text-slate-500">
                      Please select a specific session to view student attendance details
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentAttendance.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>
                              <Badge variant={student.status === "present" ? "outline" : "destructive"}>
                                {student.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{student.time}</TableCell>
                            <TableCell className="text-right">
                              {student.status === "absent" ? (
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Justifications
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm" disabled>
                                  <FileText className="h-4 w-4 mr-2" />
                                  No Action
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium mb-1.5">{children}</div>
}
