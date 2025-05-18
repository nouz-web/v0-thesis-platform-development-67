"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, BookOpen, Users, UserCog, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()
  const { t, dir } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    // If user is authenticated, redirect to their role-specific dashboard
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        router.push("/admin")
      } else if (user.role === "teacher") {
        router.push("/teacher")
      } else if (user.role === "student") {
        router.push("/student")
      }
    }
  }, [isAuthenticated, user, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100" dir={dir}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_universite-rBCWJvlJdIulKoDqALIzWAGKTycOkW.png"
              alt={t("common.university")}
              width={180}
              height={60}
              className="h-16 w-auto"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-slate-800">{t("common.welcome")}</h1>
              <p className="text-sm text-slate-600"> University Khenchela 4.0 </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Bell className="h-4 w-4 mr-2" />
              {t("common.notifications")}
            </Button>
            <Button variant="outline" size="sm" className="md:hidden">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">{t("home.welcome")}</h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            {t("home.subtitle")}
            <br />
            {t("home.selectRole")}
          </p>
        </section>

        {/* User Role Selection */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/admin" className="block">
            <Card className="h-full transition-all hover:shadow-md hover:border-slate-400">
              <CardHeader className="text-center pb-2">
                <UserCog className="h-16 w-16 mx-auto text-slate-700" />
                <CardTitle className="mt-4 text-xl">{t("roles.admin")}</CardTitle>
                <CardDescription>{t("roles.adminDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                <ul className="list-disc list-inside space-y-1">
                  <li>{t("admin.userManagement")}</li>
                  <li>{t("admin.reports")}</li>
                  <li>{t("admin.settings")}</li>
                  <li>{t("admin.statsOverview")}</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{t("common.dashboard")}</Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/teacher" className="block">
            <Card className="h-full transition-all hover:shadow-md hover:border-slate-400">
              <CardHeader className="text-center pb-2">
                <BookOpen className="h-16 w-16 mx-auto text-slate-700" />
                <CardTitle className="mt-4 text-xl">{t("roles.teacher")}</CardTitle>
                <CardDescription>{t("roles.teacherDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                <ul className="list-disc list-inside space-y-1">
                  <li>{t("teacher.generateQR")}</li>
                  <li>{t("teacher.viewAttendance")}</li>
                  <li>{t("teacher.pendingJustifications")}</li>
                  <li>{t("teacher.attendanceStats")}</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{t("common.dashboard")}</Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/student" className="block">
            <Card className="h-full transition-all hover:shadow-md hover:border-slate-400">
              <CardHeader className="text-center pb-2">
                <Users className="h-16 w-16 mx-auto text-slate-700" />
                <CardTitle className="mt-4 text-xl">{t("roles.student")}</CardTitle>
                <CardDescription>{t("roles.studentDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                <ul className="list-disc list-inside space-y-1">
                  <li>{t("student.scanQR")}</li>
                  <li>{t("student.myAbsences")}</li>
                  <li>{t("student.submitJustification")}</li>
                  <li>{t("student.specialLessons")}</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{t("common.dashboard")}</Button>
              </CardFooter>
            </Card>
          </Link>
        </section>

        {/* Statistics and Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Statistics */}
          <section className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  {t("home.statistics")}
                </CardTitle>
                <CardDescription>{t("home.currentStats")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-600 mb-1">{t("home.totalStudents")}</p>
                    <p className="text-3xl font-bold text-slate-800">1,245</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-600 mb-1">{t("home.todaySessions")}</p>
                    <p className="text-3xl font-bold text-slate-800">42</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-600 mb-1">{t("home.attendanceRate")}</p>
                    <p className="text-3xl font-bold text-slate-800">87%</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">{t("home.trends")}</h4>
                  <div className="h-40 bg-slate-50 rounded-lg flex items-end justify-between p-4">
                    {[65, 70, 85, 75, 90, 80, 87].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="bg-slate-600 rounded-t-sm w-8" style={{ height: `${value}%` }}></div>
                        <span className="text-xs mt-1 text-slate-600">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Announcements */}
          <section>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  {t("home.announcements")}
                </CardTitle>
                <CardDescription>{t("home.latestUpdates")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-slate-800">System Maintenance</h4>
                      <Badge variant="outline" className="text-xs">
                        Today
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      The  will be under maintenance tonight from 2 AM to 4 AM.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4 py-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-slate-800">New Absence Policy</h4>
                      <Badge variant="outline" className="text-xs">
                        2 days ago
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      The university has updated its absence policy. Please check the documentation.
                    </p>
                  </div>

                  <div className="border-l-4 border-amber-500 pl-4 py-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-slate-800">End of Semester</h4>
                      <Badge variant="outline" className="text-xs">
                        1 week ago
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      Reminder: The end of semester attendance reports are due next Friday.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t("home.viewAll")}
                </Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">{t("common.university")}</h3>
              <p className="text-slate-300 text-sm">
                Khenchela, Algeria
                <br />
                Absence Management Platform
                <br />
                University 4.0 Initiative
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="#" className="hover:text-white">
                    University Website
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Academic Calendar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact 
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">System Information</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Version: 1.0.0</li>
                <li>Last Updated: May 9, 2023</li>
                <li>© 2025 Abbas Laghrour University</li>
                <li>All Rights Reserved</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
