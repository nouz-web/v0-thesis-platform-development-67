"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, BarChart3, BookOpen, Download, FileText, PieChart, RefreshCw } from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Students</CardDescription>
            <CardTitle className="text-3xl">1,245</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-500 flex items-center">
              <span className="text-green-500 flex items-center mr-1">+2.5%</span>
              from last semester
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Teachers</CardDescription>
            <CardTitle className="text-3xl">87</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-500 flex items-center">
              <span className="text-green-500 flex items-center mr-1">+1.2%</span>
              from last semester
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Departments</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-500">Across 4 faculties</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Attendance</CardDescription>
            <CardTitle className="text-3xl">87%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-500 flex items-center">
              <span className="text-red-500 flex items-center mr-1">-1.3%</span>
              from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Attention Required</AlertTitle>
        <AlertDescription>
          15 students have exceeded the maximum allowed absences this semester.
          <Button variant="link" className="p-0 h-auto text-red-600 font-normal">
            View details
          </Button>
        </AlertDescription>
      </Alert>

      {/* Charts and Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Attendance by Department
                </CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-slate-50 rounded-lg flex items-end justify-between p-4">
              {[85, 70, 92, 65, 78, 88, 75, 90].map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-slate-600 rounded-t-sm w-12" style={{ height: `${value}%` }}></div>
                  <span className="text-xs mt-1 text-slate-600 truncate max-w-[50px] text-center">
                    {["CS", "Math", "Physics", "Chem", "Bio", "Eng", "Med", "Law"][index]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Absence Reasons
                </CardTitle>
                <CardDescription>Distribution of justified absences</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-slate-50 rounded-lg p-4 flex flex-col justify-center items-center">
              <div className="w-48 h-48 rounded-full border-8 border-slate-200 relative mb-4">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-blue-500"
                    style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-green-500"
                    style={{ clipPath: "polygon(50% 50%, 0 0, 100% 0)" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-amber-500"
                    style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 50%)" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-red-500"
                    style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 75% 100%)" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-purple-500"
                    style={{ clipPath: "polygon(50% 50%, 75% 100%, 0 100%, 0 50%)" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-slate-500"
                    style={{ clipPath: "polygon(50% 50%, 0 50%, 0 0)" }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 w-full">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                  <span className="text-xs">Medical (45%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                  <span className="text-xs">Family (20%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-sm mr-2"></div>
                  <span className="text-xs">Academic (15%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                  <span className="text-xs">Transport (10%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-sm mr-2"></div>
                  <span className="text-xs">Personal (7%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-slate-500 rounded-sm mr-2"></div>
                  <span className="text-xs">Other (3%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "10:25 AM",
                user: "Dr. Ahmed",
                action: "Generated QR code for CS301 lecture",
                icon: <BookOpen className="h-4 w-4" />,
              },
              {
                time: "09:42 AM",
                user: "Admin",
                action: "Generated monthly attendance report",
                icon: <FileText className="h-4 w-4" />,
              },
              {
                time: "09:15 AM",
                user: "System",
                action: "Sent absence notifications to 12 students",
                icon: <AlertCircle className="h-4 w-4" />,
              },
              {
                time: "08:30 AM",
                user: "Dr. Fatima",
                action: "Approved 5 absence justifications",
                icon: <FileText className="h-4 w-4" />,
              },
              {
                time: "Yesterday",
                user: "Admin",
                action: "Added 3 new courses to the system",
                icon: <BookOpen className="h-4 w-4" />,
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{item.user}</span>
                    <span className="text-xs text-slate-500 ml-2">{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-600">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
