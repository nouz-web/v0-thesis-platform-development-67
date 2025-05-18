"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TeacherSidebar } from "../sidebar"
import { useToast } from "@/components/ui/use-toast"
import { PenLine, Save, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function GradeStudentsPage() {
  const { toast } = useToast()
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedAssessment, setSelectedAssessment] = useState("")
  const [students, setStudents] = useState([
    {
      id: "20190001",
      name: "Mohammed Ali",
      email: "mohammed@university.edu",
      grade: "",
      attendance: 95,
    },
    {
      id: "20190002",
      name: "Amina Benali",
      email: "amina@university.edu",
      grade: "",
      attendance: 88,
    },
    {
      id: "20190003",
      name: "Karim Hadj",
      email: "karim@university.edu",
      grade: "",
      attendance: 100,
    },
    {
      id: "20190004",
      name: "Leila Mansouri",
      email: "leila@university.edu",
      grade: "",
      attendance: 92,
    },
    {
      id: "20190005",
      name: "Youssef Berrada",
      email: "youssef@university.edu",
      grade: "",
      attendance: 75,
    },
  ])

  const handleGradeChange = (id: string, value: string) => {
    setStudents(
      students.map((student) => {
        if (student.id === id) {
          return { ...student, grade: value }
        }
        return student
      }),
    )
  }

  const handleSaveGrades = () => {
    // In a real app, this would be an API call
    toast({
      title: "Grades Saved",
      description: `Grades for ${selectedAssessment} have been saved successfully.`,
    })
  }

  const handleExportGrades = () => {
    // In a real app, this would generate a CSV or Excel file
    toast({
      title: "Grades Exported",
      description: "Grades have been exported successfully.",
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
            <h1 className="text-xl font-bold text-slate-800">Grade Students</h1>
          </div>
        </header>

        <main className="p-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PenLine className="h-5 w-5 mr-2" />
                Grade Students
              </CardTitle>
              <CardDescription>Enter and manage student grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs301">CS301: Advanced Algorithms</SelectItem>
                      <SelectItem value="cs205">CS205: Database Systems</SelectItem>
                      <SelectItem value="cs401">CS401: Machine Learning</SelectItem>
                      <SelectItem value="cs102">CS102: Introduction to Programming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assessment">Assessment</Label>
                  <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                    <SelectTrigger id="assessment">
                      <SelectValue placeholder="Select assessment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="midterm">Midterm Exam</SelectItem>
                      <SelectItem value="final">Final Exam</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendance">Attendance Threshold</Label>
                  <Input id="attendance" placeholder="Enter attendance threshold" />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Attendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Input
                          value={student.grade}
                          onChange={(e) => handleGradeChange(student.id, e.target.value)}
                          placeholder="Enter grade"
                        />
                      </TableCell>
                      <TableCell>{student.attendance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleExportGrades}>
                <Download className="mr-2 h-4 w-4" />
                Export Grades
              </Button>
              <Button onClick={handleSaveGrades}>
                <Save className="mr-2 h-4 w-4" />
                Save Grades
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}
