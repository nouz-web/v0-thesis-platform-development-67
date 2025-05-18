"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Calendar, Clock, FileText, QrCode, RefreshCw, Users, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

export function StudentDashboard() {
  const { t } = useLanguage()
  const { user } = useAuth()

  // Check for excessive absences
  const hasExcessiveTDAbsences = true // This would be determined from actual data
  const hasExcessiveCOURAbsences = false // This would be determined from actual data

  return (
    <div className="space-y-6">
      {/* Absence Warnings */}
      {hasExcessiveTDAbsences && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("student.absenceWarning")}</AlertTitle>
          <AlertDescription>
            {t("student.exceededAbsences")
              .replace("{count}", "3")
              .replace("{course}", "CS301 TD")
              .replace("{max}", "2")}
            <Button variant="link" className="p-0 h-auto text-red-600 font-normal">
              {t("student.submitJustification")}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {hasExcessiveCOURAbsences && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("student.absenceWarning")}</AlertTitle>
          <AlertDescription>
            {t("student.exceededAbsences")
              .replace("{count}", "6")
              .replace("{course}", "CS205 COUR")
              .replace("{max}", "5")}
            <Button variant="link" className="p-0 h-auto text-red-600 font-normal">
              {t("student.submitJustification")}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <QrCode className="h-5 w-5 mr-2" />
              {t("student.scanQR")}
            </CardTitle>
            <CardDescription>{t("student.registerAttendance")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/student/scan-qr">{t("student.scanQR")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-5 w-5 mr-2" />
              {t("student.myAbsences")}
            </CardTitle>
            <CardDescription>{t("student.viewHistory")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/student/absences">{t("student.viewHistory")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <FileText className="h-5 w-5 mr-2" />
              {t("student.submitJustification")}
            </CardTitle>
            <CardDescription>{t("student.forAbsences")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/student/justifications">{t("student.submitJustification")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {t("student.todaySchedule")}
              </CardTitle>
              <CardDescription>{t("student.yourClasses")}</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t("common.refresh")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "08:30 - 10:00",
                course: "CS301: Advanced Algorithms",
                type: "COUR",
                location: "Room A204",
                status: "Attended",
                professor: "Dr. Ahmed",
              },
              {
                time: "10:15 - 11:45",
                course: "CS205: Database Systems",
                type: "TD",
                location: "Lab B103",
                status: "In Progress",
                professor: "Dr. Fatima",
              },
              {
                time: "13:00 - 14:30",
                course: "CS401: Machine Learning",
                type: "COUR",
                location: "Room A208",
                status: "Upcoming",
                professor: "Dr. Karim",
              },
              {
                time: "14:45 - 16:15",
                course: "CS102: Introduction to Programming",
                type: "TD",
                location: "Lab B105",
                status: "Upcoming",
                professor: "Dr. Leila",
              },
            ].map((session, index) => (
              <div key={index} className="flex items-center border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h4 className="font-medium">{session.course}</h4>
                    <Badge
                      variant={
                        session.status === "Attended"
                          ? "outline"
                          : session.status === "In Progress"
                            ? "default"
                            : "secondary"
                      }
                      className="ml-2"
                    >
                      {session.status}
                    </Badge>
                    <Badge variant="outline" className="ml-2">
                      {session.type}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <span className="mr-3">{session.time}</span>
                    <span>{session.location}</span>
                    <span className="ml-3">Prof: {session.professor}</span>
                  </div>
                </div>
                <div>
                  {session.status === "Upcoming" ? (
                    <Button size="sm" asChild>
                      <Link href="/student/scan-qr">
                        <QrCode className="h-4 w-4 mr-2" />
                        {t("student.scanQR")}
                      </Link>
                    </Button>
                  ) : session.status === "In Progress" ? (
                    <Button size="sm" asChild>
                      <Link href="/student/scan-qr">
                        <QrCode className="h-4 w-4 mr-2" />
                        {t("student.scanQR")}
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      <Users className="h-4 w-4 mr-2" />
                      {t("common.attended")}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Lessons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            {t("student.specialLessons")}
          </CardTitle>
          <CardDescription>{t("student.uploadedMaterials")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Advanced Database Concepts",
                course: "CS205: Database Systems",
                date: "May 5, 2023",
                type: "PDF",
                size: "2.4 MB",
              },
              {
                title: "Machine Learning Algorithms",
                course: "CS401: Machine Learning",
                date: "May 3, 2023",
                type: "PDF",
                size: "3.1 MB",
              },
              {
                title: "Programming Fundamentals",
                course: "CS102: Introduction to Programming",
                date: "April 28, 2023",
                type: "PDF",
                size: "1.8 MB",
              },
            ].map((lesson, index) => (
              <div key={index} className="flex items-start border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h4 className="font-medium">{lesson.title}</h4>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <span className="mr-3">{lesson.course}</span>
                    <span>Added: {lesson.date}</span>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {lesson.type} • {lesson.size}
                  </div>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    {t("common.download")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Absence Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            {t("student.attendanceStats")}
          </CardTitle>
          <CardDescription>{t("student.attendanceRecord")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">{t("student.totalClasses")}</div>
                  <div className="text-2xl font-bold">120</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">{t("student.attendanceRate")}</div>
                  <div className="text-2xl font-bold">92%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">{t("student.totalAbsences")}</div>
                  <div className="text-2xl font-bold">9</div>
                  <div className="text-xs text-slate-500 mt-1">
                    <span className="text-green-500">6 {t("student.justified")}</span> /
                    <span className="text-red-500"> 3 {t("student.unjustified")}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">{t("student.attendanceByCourse")}</h4>
              <div className="space-y-3">
                {[
                  { course: "CS301: Advanced Algorithms", type: "COUR", attendance: 88, absences: 3, maxAbsences: 5 },
                  { course: "CS301: Advanced Algorithms", type: "TD", attendance: 75, absences: 3, maxAbsences: 2 },
                  { course: "CS205: Database Systems", type: "COUR", attendance: 95, absences: 1, maxAbsences: 5 },
                  { course: "CS205: Database Systems", type: "TD", attendance: 90, absences: 1, maxAbsences: 2 },
                  { course: "CS401: Machine Learning", type: "COUR", attendance: 92, absences: 2, maxAbsences: 5 },
                  {
                    course: "CS102: Introduction to Programming",
                    type: "COUR",
                    attendance: 94,
                    absences: 3,
                    maxAbsences: 5,
                  },
                ].map((course, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>
                        {course.course} ({course.type})
                      </span>
                      <div className="flex items-center">
                        <span className="font-medium">{course.attendance}%</span>
                        <span className="text-xs ml-2 text-slate-500">
                          ({course.absences}/{course.maxAbsences} absences)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          course.absences > course.maxAbsences
                            ? "bg-red-500"
                            : course.absences === course.maxAbsences
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${course.attendance}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
