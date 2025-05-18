"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminSidebar } from "../sidebar"
import { useToast } from "@/components/ui/use-toast"
import { BarChart3, PieChart, LineChart, Download, RefreshCw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function StatisticsPage() {
  const { toast } = useToast()
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("semester")

  const handleRefresh = () => {
    toast({
      title: "Statistics Refreshed",
      description: "The statistics have been updated with the latest data.",
    })
  }

  const handleExport = () => {
    toast({
      title: "Statistics Exported",
      description: "The statistics have been exported successfully.",
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
            <h1 className="text-xl font-bold text-slate-800">Statistics</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Attendance Statistics</h2>
            <p className="text-slate-600">Analyze attendance patterns and trends</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            <div className="flex items-end space-x-2">
              <Button className="flex-1" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-slate-500 mb-1">Average Attendance Rate</div>
                <div className="text-3xl font-bold">87%</div>
                <div className="text-xs text-slate-500 flex items-center mt-1">
                  <span className="text-green-500 flex items-center mr-1">+2.5%</span>
                  from last semester
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-slate-500 mb-1">Total Sessions</div>
                <div className="text-3xl font-bold">1,245</div>
                <div className="text-xs text-slate-500 flex items-center mt-1">
                  <span className="text-green-500 flex items-center mr-1">+12%</span>
                  from last semester
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-slate-500 mb-1">Justified Absences</div>
                <div className="text-3xl font-bold">523</div>
                <div className="text-xs text-slate-500 flex items-center mt-1">
                  <span className="text-red-500 flex items-center mr-1">+8%</span>
                  from last semester
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-slate-500 mb-1">Unjustified Absences</div>
                <div className="text-3xl font-bold">218</div>
                <div className="text-xs text-slate-500 flex items-center mt-1">
                  <span className="text-green-500 flex items-center mr-1">-3%</span>
                  from last semester
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="attendance">
            <TabsList className="mb-6">
              <TabsTrigger value="attendance">Attendance Trends</TabsTrigger>
              <TabsTrigger value="departments">Department Comparison</TabsTrigger>
              <TabsTrigger value="justifications">Justification Analysis</TabsTrigger>
              <TabsTrigger value="courses">Course Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2" />
                    Attendance Trends
                  </CardTitle>
                  <CardDescription>Attendance rate over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-slate-50 rounded-lg p-4">
                    {/* This would be a real chart in a production app */}
                    <div className="w-full h-full flex items-end justify-between">
                      {[75, 82, 78, 85, 90, 87, 92, 88, 85, 89, 91, 87].map((value, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="bg-blue-500 rounded-t-sm w-12" style={{ height: `${value * 0.7}%` }}></div>
                          <span className="text-xs mt-1 text-slate-600">
                            {
                              ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
                                index
                              ]
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="departments">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Department Comparison
                  </CardTitle>
                  <CardDescription>Attendance rates by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-slate-50 rounded-lg p-4">
                    {/* This would be a real chart in a production app */}
                    <div className="w-full h-full flex items-end justify-between">
                      {[85, 78, 92, 75, 88, 82, 90, 86].map((value, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="bg-green-500 rounded-t-sm w-16" style={{ height: `${value * 0.7}%` }}></div>
                          <span className="text-xs mt-1 text-slate-600 text-center max-w-[70px] truncate">
                            {
                              [
                                "Computer Science",
                                "Mathematics",
                                "Physics",
                                "Chemistry",
                                "Biology",
                                "Engineering",
                                "Medicine",
                                "Law",
                              ][index]
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="justifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Justification Analysis
                  </CardTitle>
                  <CardDescription>Types of absence justifications</CardDescription>
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
            </TabsContent>

            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Course Analysis
                  </CardTitle>
                  <CardDescription>Attendance rates by course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { course: "CS301: Advanced Algorithms", attendance: 93 },
                      { course: "CS205: Database Systems", attendance: 95 },
                      { course: "CS401: Machine Learning", attendance: 88 },
                      { course: "CS102: Introduction to Programming", attendance: 82 },
                      { course: "MATH202: Linear Algebra", attendance: 87 },
                      { course: "PHYS101: Mechanics", attendance: 79 },
                      { course: "CHEM103: General Chemistry", attendance: 85 },
                      { course: "BIO101: Introduction to Biology", attendance: 91 },
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
