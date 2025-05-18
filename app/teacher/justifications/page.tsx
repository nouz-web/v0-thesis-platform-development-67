"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FileText, Eye, CheckCircle, XCircle } from "lucide-react"
import { TeacherSidebar } from "../sidebar"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import Image from "next/image"

export default function JustificationsPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedJustification, setSelectedJustification] = useState<any>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  // Mock justification data
  const justifications = [
    {
      id: "1",
      student: "Mohammed Ali",
      studentId: "20190001",
      course: "CS301",
      type: "COUR",
      date: "2023-05-02",
      reason: "Medical",
      document: "medical-certificate.pdf",
      status: "pending",
      submittedAt: "2023-05-03",
    },
    {
      id: "2",
      student: "Amina Benali",
      studentId: "20190002",
      course: "CS301",
      type: "TD",
      date: "2023-04-25",
      reason: "Family Emergency",
      document: "family-emergency.pdf",
      status: "pending",
      submittedAt: "2023-04-26",
    },
    {
      id: "3",
      student: "Karim Hadj",
      studentId: "20190003",
      course: "CS205",
      type: "COUR",
      date: "2023-04-20",
      reason: "Medical",
      document: "medical-certificate-2.pdf",
      status: "approved",
      submittedAt: "2023-04-21",
      reviewedAt: "2023-04-22",
    },
    {
      id: "4",
      student: "Leila Mansouri",
      studentId: "20190004",
      course: "CS205",
      type: "TD",
      date: "2023-04-18",
      reason: "Transport Issue",
      document: "transport-issue.pdf",
      status: "rejected",
      submittedAt: "2023-04-19",
      reviewedAt: "2023-04-20",
      rejectionReason: "Insufficient evidence",
    },
    {
      id: "5",
      student: "Omar Bouaziz",
      studentId: "20190005",
      course: "CS401",
      type: "COUR",
      date: "2023-04-12",
      reason: "Academic Conflict",
      document: "academic-conflict.pdf",
      status: "pending",
      submittedAt: "2023-04-13",
    },
  ]

  const filteredJustifications = justifications.filter(
    (justification) => selectedCourse === "all" || justification.course === selectedCourse,
  )

  const handleViewJustification = (justification: any) => {
    setSelectedJustification(justification)
    setIsViewOpen(true)
  }

  const handleApprove = () => {
    toast({
      title: "Justification approved",
      description: `You have approved ${selectedJustification.student}'s absence justification.`,
    })
    setIsViewOpen(false)
  }

  const handleReject = () => {
    toast({
      title: "Justification rejected",
      description: `You have rejected ${selectedJustification.student}'s absence justification.`,
    })
    setIsViewOpen(false)
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
            <h1 className="text-xl font-bold text-slate-800">Absence Justifications</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Absence Justifications</h2>
            <p className="text-slate-600">Review and approve student absence justifications</p>
          </div>

          <div className="mb-6">
            <div className="space-y-2 max-w-xs">
              <Label>Filter by Course</Label>
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
          </div>

          <Tabs defaultValue="pending">
            <TabsList className="mb-6">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="all">All Justifications</TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Pending Justifications
                  </CardTitle>
                  <CardDescription>Justifications awaiting your review</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJustifications
                        .filter((justification) => justification.status === "pending")
                        .map((justification) => (
                          <TableRow key={justification.id}>
                            <TableCell className="font-medium">{justification.student}</TableCell>
                            <TableCell>{justification.course}</TableCell>
                            <TableCell>{justification.type}</TableCell>
                            <TableCell>{justification.date}</TableCell>
                            <TableCell>{justification.reason}</TableCell>
                            <TableCell>{justification.submittedAt}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewJustification(justification)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approved">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    Approved Justifications
                  </CardTitle>
                  <CardDescription>Justifications you have approved</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Reviewed</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJustifications
                        .filter((justification) => justification.status === "approved")
                        .map((justification) => (
                          <TableRow key={justification.id}>
                            <TableCell className="font-medium">{justification.student}</TableCell>
                            <TableCell>{justification.course}</TableCell>
                            <TableCell>{justification.type}</TableCell>
                            <TableCell>{justification.date}</TableCell>
                            <TableCell>{justification.reason}</TableCell>
                            <TableCell>{justification.reviewedAt}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewJustification(justification)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rejected">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <XCircle className="h-5 w-5 mr-2 text-red-500" />
                    Rejected Justifications
                  </CardTitle>
                  <CardDescription>Justifications you have rejected</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Reviewed</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJustifications
                        .filter((justification) => justification.status === "rejected")
                        .map((justification) => (
                          <TableRow key={justification.id}>
                            <TableCell className="font-medium">{justification.student}</TableCell>
                            <TableCell>{justification.course}</TableCell>
                            <TableCell>{justification.type}</TableCell>
                            <TableCell>{justification.date}</TableCell>
                            <TableCell>{justification.reason}</TableCell>
                            <TableCell>{justification.reviewedAt}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewJustification(justification)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    All Justifications
                  </CardTitle>
                  <CardDescription>Complete list of justifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJustifications.map((justification) => (
                        <TableRow key={justification.id}>
                          <TableCell className="font-medium">{justification.student}</TableCell>
                          <TableCell>{justification.course}</TableCell>
                          <TableCell>{justification.type}</TableCell>
                          <TableCell>{justification.date}</TableCell>
                          <TableCell>{justification.reason}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                justification.status === "approved"
                                  ? "outline"
                                  : justification.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {justification.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleViewJustification(justification)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
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

          {/* View Justification Dialog */}
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Justification Details</DialogTitle>
                <DialogDescription>Review the absence justification submitted by the student</DialogDescription>
              </DialogHeader>

              {selectedJustification && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Student</h3>
                      <p className="font-medium">{selectedJustification.student}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Student ID</h3>
                      <p>{selectedJustification.studentId}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Course</h3>
                      <p>{selectedJustification.course}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Session Type</h3>
                      <p>{selectedJustification.type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Absence Date</h3>
                      <p>{selectedJustification.date}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Submitted On</h3>
                      <p>{selectedJustification.submittedAt}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Reason</h3>
                      <p>{selectedJustification.reason}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Status</h3>
                      <Badge
                        variant={
                          selectedJustification.status === "approved"
                            ? "outline"
                            : selectedJustification.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {selectedJustification.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Supporting Document</h3>
                    <div className="border rounded-lg p-4 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium">{selectedJustification.document}</p>
                          <p className="text-xs text-slate-500">PDF Document</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Document
                      </Button>
                    </div>
                  </div>

                  {selectedJustification.status === "rejected" && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Rejection Reason</h3>
                      <p className="text-red-600">{selectedJustification.rejectionReason}</p>
                    </div>
                  )}
                </div>
              )}

              <DialogFooter>
                {selectedJustification && selectedJustification.status === "pending" ? (
                  <>
                    <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleReject}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button onClick={handleApprove}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                    Close
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium mb-1.5">{children}</div>
}
