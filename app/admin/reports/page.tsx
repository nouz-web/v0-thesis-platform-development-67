"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "../sidebar"
import { useToast } from "@/components/ui/use-toast"
import { FileText, Download, BarChart3, PieChart, Calendar, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ReportsPage() {
  const { toast } = useToast()
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("semester")
  const [selectedReport, setSelectedReport] = useState("attendance")

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your report has been generated and is ready for download.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "Your report has been downloaded successfully.",
    })
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

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
            <h1 className="text-xl font-bold text-slate-800">Reports</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Reports</h2>
            <p className="text-slate-600">Generate and view attendance and performance reports</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Generate Report
              </CardTitle>
              <CardDescription>Select parameters to generate a custom report</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="attendance">Attendance Report</SelectItem>
                      <SelectItem value="justifications">Justifications Report</SelectItem>
                      <SelectItem value="performance">Performance Report</SelectItem>
                      <SelectItem value="warnings">Absence Warnings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time Period</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="semester">Current Semester</SelectItem>
                      <SelectItem value="year">Academic Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full" onClick={handleGenerateReport}>
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="attendance">
            <TabsList className="mb-6">
              <TabsTrigger value="attendance">Attendance Reports</TabsTrigger>
              <TabsTrigger value="justifications">Justification Reports</TabsTrigger>
              <TabsTrigger value="warnings">Absence Warnings</TabsTrigger>
              <TabsTrigger value="custom">Custom Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Attendance Reports
                      </CardTitle>
                      <CardDescription>Overview of student attendance</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Generated</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          name: "Semester Attendance Summary",
                          department: "Computer Science",
                          period: "Spring 2023",
                          generated: "2023-05-10",
                          status: "complete",
                        },
                        {
                          name: "Monthly Attendance Report",
                          department: "Mathematics",
                          period: "April 2023",
                          generated: "2023-05-05",
                          status: "complete",
                        },
                        {
                          name: "Weekly Attendance Report",
                          department: "Physics",
                          period: "Week 18",
                          generated: "2023-05-01",
                          status: "complete",
                        },
                        {
                          name: "Course-specific Attendance",
                          department: "Computer Science",
                          period: "Spring 2023",
                          generated: "2023-04-28",
                          status: "complete",
                        },
                      ].map((report, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>{report.department}</TableCell>
                          <TableCell>{report.period}</TableCell>
                          <TableCell>{report.generated}</TableCell>
                          <TableCell>
                            <Badge variant={report.status === "complete" ? "outline" : "secondary"}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={handleDownload}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="justifications">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Justification Reports
                      </CardTitle>
                      <CardDescription>Overview of absence justifications</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Generated</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          name: "Justification Summary",
                          department: "All Departments",
                          period: "Spring 2023",
                          generated: "2023-05-09",
                          status: "complete",
                        },
                        {
                          name: "Medical Justifications",
                          department: "All Departments",
                          period: "Spring 2023",
                          generated: "2023-05-08",
                          status: "complete",
                        },
                        {
                          name: "Pending Justifications",
                          department: "Computer Science",
                          period: "May 2023",
                          generated: "2023-05-07",
                          status: "complete",
                        },
                      ].map((report, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>{report.department}</TableCell>
                          <TableCell>{report.period}</TableCell>
                          <TableCell>{report.generated}</TableCell>
                          <TableCell>
                            <Badge variant={report.status === "complete" ? "outline" : "secondary"}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={handleDownload}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="warnings">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Absence Warnings
                      </CardTitle>
                      <CardDescription>Students with excessive absences</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Absences</TableHead>
                        <TableHead>Max Allowed</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          student: "Mohammed Ali",
                          id: "20190001",
                          department: "Computer Science",
                          course: "CS301: Advanced Algorithms",
                          absences: 3,
                          maxAllowed: 2,
                        },
                        {
                          student: "Amina Benali",
                          id: "20190002",
                          department: "Computer Science",
                          course: "CS205: Database Systems",
                          absences: 6,
                          maxAllowed: 5,
                        },
                        {
                          student: "Karim Hadj",
                          id: "20190003",
                          department: "Mathematics",
                          course: "MATH202: Linear Algebra",
                          absences: 4,
                          maxAllowed: 3,
                        },
                      ].map((warning, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{warning.student}</TableCell>
                          <TableCell>{warning.id}</TableCell>
                          <TableCell>{warning.department}</TableCell>
                          <TableCell>{warning.course}</TableCell>
                          <TableCell className="text-red-600 font-medium">{warning.absences}</TableCell>
                          <TableCell>{warning.maxAllowed}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
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

            <TabsContent value="custom">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Custom Reports
                  </CardTitle>
                  <CardDescription>Create and view custom reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <PieChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Create a Custom Report</h3>
                    <p className="text-slate-500 mb-4 max-w-md mx-auto">
                      Use the report generator above to create a custom report with specific parameters.
                    </p>
                    <Button onClick={handleGenerateReport}>Generate Custom Report</Button>
                  </div>
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
