"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TeacherSidebar } from "../sidebar"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/components/ui/use-toast"
import { Book, Users, Calendar, Clock, FileText, BarChart3, QrCode } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TeacherCoursesPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [courses] = useState([
    {
      id: "1",
      code: "CS301",
      name: "Advanced Algorithms",
      department: "Computer Science",
      semester: "Spring 2023",
      students: 45,
      sessions: 24,
      completedSessions: 18,
      averageAttendance: 92,
    },
    {
      id: "2",
      code: "CS205",
      name: "Database Systems",
      department: "Computer Science",
      semester: "Spring 2023",
      students: 60,
      sessions: 24,
      completedSessions: 16,
      averageAttendance: 88,
    },
    {
      id: "3",
      code: "CS401",
      name: "Machine Learning",
      department: "Computer Science",
      semester: "Spring 2023",
      students: 35,
      sessions: 24,
      completedSessions: 17,
      averageAttendance: 94,
    },
    {
      id: "4",
      code: "CS102",
      name: "Introduction to Programming",
      department: "Computer Science",
      semester: "Spring 2023",
      students: 80,
      sessions: 24,
      completedSessions: 18,
      averageAttendance: 85,
    },
  ])

  const [selectedCourse, setSelectedCourse] = useState(courses[0])

  const handleGenerateQR = (courseId: string) => {
    window.location.href = "/teacher/qr-code"
  }

  const handleViewAttendance = (courseId: string) => {
    toast({
      title: "Viewing Attendance",
      description: `Viewing attendance for course ${courseId}`,
    })
  }

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
            <h1 className="text-xl font-bold text-slate-800">My Courses</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {courses.map((course) => (
              <Card key={course.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{course.code}</CardTitle>
                  <CardDescription>{course.name}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-slate-500" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-slate-500" />
                      <span>
                        {course.completedSessions}/{course.sessions} sessions
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="w-full flex justify-between items-center">
                    <Badge variant="outline">{course.semester}</Badge>
                    <div className="flex items-center text-sm font-medium">
                      <span className="text-green-600">{course.averageAttendance}%</span>
                      <span className="text-slate-500 ml-1">attendance</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
              </TabsList>

              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleGenerateQR(selectedCourse.id)}>
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleViewAttendance(selectedCourse.id)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Attendance Report
                </Button>
              </div>
            </div>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Book className="h-4 w-4 mr-2" />
                      Course Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Course Code:</dt>
                        <dd className="font-medium">{selectedCourse.code}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Course Name:</dt>
                        <dd className="font-medium">{selectedCourse.name}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Department:</dt>
                        <dd className="font-medium">{selectedCourse.department}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Semester:</dt>
                        <dd className="font-medium">{selectedCourse.semester}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Students Enrolled:</dt>
                        <dd className="font-medium">{selectedCourse.students}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Session Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Completed Sessions</span>
                          <span className="font-medium">
                            {selectedCourse.completedSessions}/{selectedCourse.sessions}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${(selectedCourse.completedSessions / selectedCourse.sessions) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="text-sm text-slate-500 mb-2">Upcoming Sessions</div>
                        <ul className="space-y-2">
                          <li className="text-sm border-l-2 border-blue-500 pl-3 py-1">
                            <div className="font-medium">{selectedCourse.code} - Lecture</div>
                            <div className="text-slate-500">Tomorrow, 10:00 AM - 11:30 AM</div>
                          </li>
                          <li className="text-sm border-l-2 border-green-500 pl-3 py-1">
                            <div className="font-medium">{selectedCourse.code} - Lab</div>
                            <div className="text-slate-500">Thursday, 2:00 PM - 4:00 PM</div>
                          </li>
                          <li className="text-sm border-l-2 border-amber-500 pl-3 py-1">
                            <div className="font-medium">{selectedCourse.code} - Tutorial</div>
                            <div className="text-slate-500">Friday, 11:00 AM - 12:30 PM</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Attendance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Average Attendance</span>
                          <span className="font-medium text-green-600">{selectedCourse.averageAttendance}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${selectedCourse.averageAttendance}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="text-sm text-slate-500 mb-2">Last 5 Sessions</div>
                        <div className="flex justify-between">
                          {[96, 88, 92, 94, 90].map((attendance, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <div
                                className={`w-6 h-16 rounded-t-sm ${
                                  attendance > 90 ? "bg-green-500" : attendance > 80 ? "bg-amber-500" : "bg-red-500"
                                }`}
                                style={{ height: `${attendance * 0.16}px` }}
                              ></div>
                              <span className="text-xs mt-1">{attendance}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <CardTitle>Sessions</CardTitle>
                  <CardDescription>All sessions for {selectedCourse.code}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          date: "2023-05-15",
                          time: "10:00 - 11:30",
                          type: "Lecture",
                          topic: "Advanced Sorting Algorithms",
                          attendance: 92,
                        },
                        {
                          date: "2023-05-12",
                          time: "14:00 - 16:00",
                          type: "Lab",
                          topic: "Implementing QuickSort",
                          attendance: 88,
                        },
                        {
                          date: "2023-05-10",
                          time: "10:00 - 11:30",
                          type: "Lecture",
                          topic: "Graph Algorithms",
                          attendance: 94,
                        },
                        {
                          date: "2023-05-08",
                          time: "11:00 - 12:30",
                          type: "Tutorial",
                          topic: "Problem Solving Session",
                          attendance: 90,
                        },
                        {
                          date: "2023-05-05",
                          time: "10:00 - 11:30",
                          type: "Lecture",
                          topic: "Dynamic Programming",
                          attendance: 96,
                        },
                      ].map((session, index) => (
                        <TableRow key={index}>
                          <TableCell>{session.date}</TableCell>
                          <TableCell>{session.time}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                session.type === "Lecture"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : session.type === "Lab"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-amber-50 text-amber-700 border-amber-200"
                              }
                            >
                              {session.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{session.topic}</TableCell>
                          <TableCell>
                            <span
                              className={
                                session.attendance > 90
                                  ? "text-green-600"
                                  : session.attendance > 80
                                    ? "text-amber-600"
                                    : "text-red-600"
                              }
                            >
                              {session.attendance}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View Details
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
                  <CardTitle>Students</CardTitle>
                  <CardDescription>Students enrolled in {selectedCourse.code}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Absences</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "20190001",
                          name: "Mohammed Ali",
                          email: "mohammed@university.edu",
                          attendance: 95,
                          absences: 1,
                        },
                        {
                          id: "20190002",
                          name: "Amina Benali",
                          email: "amina@university.edu",
                          attendance: 88,
                          absences: 2,
                        },
                        {
                          id: "20190003",
                          name: "Karim Hadj",
                          email: "karim@university.edu",
                          attendance: 100,
                          absences: 0,
                        },
                        {
                          id: "20190004",
                          name: "Leila Mansouri",
                          email: "leila@university.edu",
                          attendance: 92,
                          absences: 1,
                        },
                        {
                          id: "20190005",
                          name: "Youssef Berrada",
                          email: "youssef@university.edu",
                          attendance: 75,
                          absences: 4,
                        },
                      ].map((student, index) => (
                        <TableRow key={index}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>
                            <span
                              className={
                                student.attendance > 90
                                  ? "text-green-600"
                                  : student.attendance > 80
                                    ? "text-amber-600"
                                    : "text-red-600"
                              }
                            >
                              {student.attendance}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                student.absences === 0
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : student.absences <= 2
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {student.absences}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                  <CardDescription>Detailed attendance records for {selectedCourse.code}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Attendance Report</h3>
                    <p className="text-slate-500 mb-4 max-w-md mx-auto">
                      View and export detailed attendance reports for this course.
                    </p>
                    <Button onClick={() => handleViewAttendance(selectedCourse.id)}>View Attendance Report</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grades">
              <Card>
                <CardHeader>
                  <CardTitle>Student Grades</CardTitle>
                  <CardDescription>Manage student grades for {selectedCourse.code}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Midterm</TableHead>
                        <TableHead>Final</TableHead>
                        <TableHead>Assignments</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "20190001",
                          name: "Mohammed Ali",
                          midterm: 85,
                          final: 90,
                          assignments: 88,
                          total: 88,
                        },
                        {
                          id: "20190002",
                          name: "Amina Benali",
                          midterm: 78,
                          final: 85,
                          assignments: 92,
                          total: 85,
                        },
                        {
                          id: "20190003",
                          name: "Karim Hadj",
                          midterm: 92,
                          final: 95,
                          assignments: 94,
                          total: 94,
                        },
                        {
                          id: "20190004",
                          name: "Leila Mansouri",
                          midterm: 88,
                          final: 82,
                          assignments: 90,
                          total: 86,
                        },
                        {
                          id: "20190005",
                          name: "Youssef Berrada",
                          midterm: 65,
                          final: 72,
                          assignments: 80,
                          total: 72,
                        },
                      ].map((student, index) => (
                        <TableRow key={index}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.midterm}</TableCell>
                          <TableCell>{student.final}</TableCell>
                          <TableCell>{student.assignments}</TableCell>
                          <TableCell className="font-medium">
                            <span
                              className={
                                student.total >= 90
                                  ? "text-green-600"
                                  : student.total >= 80
                                    ? "text-blue-600"
                                    : student.total >= 70
                                      ? "text-amber-600"
                                      : "text-red-600"
                              }
                            >
                              {student.total}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit Grades
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
