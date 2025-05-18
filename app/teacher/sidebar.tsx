"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, FileText, Home, LogOut, QrCode, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function TeacherSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold">Teacher Portal</h2>
        <p className="text-sm text-slate-400">Absence Management</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Button variant={isActive("/teacher") ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/teacher">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/teacher/qr-code") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/teacher/qr-code">
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/teacher/attendance") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/teacher/attendance">
                <Users className="h-4 w-4 mr-2" />
                Attendance Records
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/teacher/justifications") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/teacher/justifications">
                <FileText className="h-4 w-4 mr-2" />
                Justifications
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/teacher/courses") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/teacher/courses">
                <BookOpen className="h-4 w-4 mr-2" />
                My Courses
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/teacher/calendar") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/teacher/calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Link>
            </Button>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
