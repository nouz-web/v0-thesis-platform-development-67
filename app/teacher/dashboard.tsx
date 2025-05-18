"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, Clock, Download, FileText, QrCode, RefreshCw, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TeacherDashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <QrCode className="h-5 w-5 mr-2" />
              Generate QR Code
            </CardTitle>
            <CardDescription>For today's sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generate QR Code</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2" />
              View Attendance
            </CardTitle>
            <CardDescription>Check student attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Records
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <FileText className="h-5 w-5 mr-2" />
              Pending Justifications
            </CardTitle>
            <CardDescription>Review absence justifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Review
              <Badge className="ml-2 bg-red-500">5</Badge>
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
                Today's Schedule
              </CardTitle>
              <CardDescription>Your classes for today</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "08:30 - 10:00",
                course: "CS301: Advanced Algorithms",
                location: "Room A204",
                status: "Completed",
                attendance: "42/45",
              },
              {
                time: "10:15 - 11:45",
                course: "CS205: Database Systems",
                location: "Lab B103",
                status: "In Progress",
                attendance: "38/40",
              },
              {
                time: "13:00 - 14:30",
                course: "CS401: Machine Learning",
                location: "Room A208",
                status: "Upcoming",
                attendance: "0/35",
              },
              {
                time: "14:45 - 16:15",
                course: "CS102: Introduction to Programming",
                location: "Lab B105",
                status: "Upcoming",
                attendance: "0/50",
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
                        session.status === "Completed"
                          ? "outline"
                          : session.status === "In Progress"
                            ? "default"
                            : "secondary"
                      }
                      className="ml-2"
                    >
                      {session.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <span className="mr-3">{session.time}</span>
                    <span>{session.location}</span>
                    {session.status !== "Upcoming" && <span className="ml-auto">Attendance: {session.attendance}</span>}
                  </div>
                </div>
                <div>
                  {session.status === "Upcoming" ? (
                    <Button size="sm">
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate QR
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      View Attendance
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Statistics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Attendance Statistics
              </CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">Total Classes</div>
                  <div className="text-2xl font-bold">42</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">Average Attendance</div>
                  <div className="text-2xl font-bold">89%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">Justified Absences</div>
                  <div className="text-2xl font-bold">37</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">Unjustified Absences</div>
                  <div className="text-2xl font-bold">18</div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Attendance by Course</h4>
              <div className="space-y-3">
                {[
                  { course: "CS301: Advanced Algorithms", attendance: 93 },
                  { course: "CS205: Database Systems", attendance: 95 },
                  { course: "CS401: Machine Learning", attendance: 88 },
                  { course: "CS102: Introduction to Programming", attendance: 82 },
                ].map((course, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{course.course}</span>
                      <span className="font-medium">{course.attendance}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          course.attendance > 90
                            ? "bg-green-500"
                            : course.attendance > 80
                              ? "bg-amber-500"
                              : "bg-red-500"
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
