"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText } from "lucide-react"
import { StudentSidebar } from "../sidebar"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import Image from "next/image"

export default function AbsencesPage() {
  const { t } = useLanguage()

  // Mock absence data
  const absences = [
    {
      id: "1",
      course: "CS301: Advanced Algorithms",
      type: "COUR",
      date: "2023-05-02",
      time: "08:30 - 10:00",
      professor: "Dr. Ahmed",
      status: "unjustified",
    },
    {
      id: "2",
      course: "CS301: Advanced Algorithms",
      type: "TD",
      date: "2023-04-25",
      time: "10:15 - 11:45",
      professor: "Dr. Ahmed",
      status: "justified",
      justification: "Medical",
    },
    {
      id: "3",
      course: "CS205: Database Systems",
      type: "COUR",
      date: "2023-04-20",
      time: "13:00 - 14:30",
      professor: "Dr. Fatima",
      status: "justified",
      justification: "Family Emergency",
    },
    {
      id: "4",
      course: "CS205: Database Systems",
      type: "TD",
      date: "2023-04-18",
      time: "14:45 - 16:15",
      professor: "Dr. Fatima",
      status: "unjustified",
    },
    {
      id: "5",
      course: "CS401: Machine Learning",
      type: "COUR",
      date: "2023-04-12",
      time: "08:30 - 10:00",
      professor: "Dr. Karim",
      status: "justified",
      justification: "Medical",
    },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

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
            <h1 className="text-xl font-bold text-slate-800">{t("student.myAbsences")}</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">{t("student.myAbsences")}</h2>
            <p className="text-slate-600">{t("student.viewHistory")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Absences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5</div>
                <div className="text-sm text-slate-500 mt-1">
                  <span className="text-green-500">3 justified</span> /{" "}
                  <span className="text-red-500">2 unjustified</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">TD Absences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <div className="text-sm text-slate-500 mt-1">
                  <span className="text-green-500">1 justified</span> /{" "}
                  <span className="text-red-500">1 unjustified</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Max allowed: 2</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">COUR Absences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <div className="text-sm text-slate-500 mt-1">
                  <span className="text-green-500">2 justified</span> /{" "}
                  <span className="text-red-500">1 unjustified</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Max allowed: 5</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Absences</TabsTrigger>
              <TabsTrigger value="unjustified">Unjustified</TabsTrigger>
              <TabsTrigger value="justified">Justified</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Absence History
                  </CardTitle>
                  <CardDescription>Complete record of your absences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Professor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {absences.map((absence) => (
                        <TableRow key={absence.id}>
                          <TableCell className="font-medium">{absence.course}</TableCell>
                          <TableCell>{absence.type}</TableCell>
                          <TableCell>{absence.date}</TableCell>
                          <TableCell>{absence.time}</TableCell>
                          <TableCell>{absence.professor}</TableCell>
                          <TableCell>
                            <Badge variant={absence.status === "justified" ? "outline" : "destructive"}>
                              {absence.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {absence.status === "unjustified" ? (
                              <Button size="sm" asChild>
                                <Link href="/student/justifications">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Justify
                                </Link>
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="unjustified">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Unjustified Absences
                  </CardTitle>
                  <CardDescription>Absences that require justification</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Professor</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {absences
                        .filter((absence) => absence.status === "unjustified")
                        .map((absence) => (
                          <TableRow key={absence.id}>
                            <TableCell className="font-medium">{absence.course}</TableCell>
                            <TableCell>{absence.type}</TableCell>
                            <TableCell>{absence.date}</TableCell>
                            <TableCell>{absence.time}</TableCell>
                            <TableCell>{absence.professor}</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" asChild>
                                <Link href="/student/justifications">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Justify
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="justified">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Justified Absences
                  </CardTitle>
                  <CardDescription>Absences with approved justifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Professor</TableHead>
                        <TableHead>Justification</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {absences
                        .filter((absence) => absence.status === "justified")
                        .map((absence) => (
                          <TableRow key={absence.id}>
                            <TableCell className="font-medium">{absence.course}</TableCell>
                            <TableCell>{absence.type}</TableCell>
                            <TableCell>{absence.date}</TableCell>
                            <TableCell>{absence.time}</TableCell>
                            <TableCell>{absence.professor}</TableCell>
                            <TableCell>{absence.justification}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-2" />
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
        </main>
      </div>
    </div>
  )
}
