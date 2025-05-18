"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, FileText, Home, LogOut, QrCode, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function StudentSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold">Student Portal</h2>
        <p className="text-sm text-slate-400">Absence Management</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Button variant={isActive("/student") ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/student">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/student/scan-qr") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/student/scan-qr">
                <QrCode className="h-4 w-4 mr-2" />
                Scan QR Code
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/student/absences") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/student/absences">
                <Calendar className="h-4 w-4 mr-2" />
                My Absences
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/student/justifications") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/student/justifications">
                <FileText className="h-4 w-4 mr-2" />
                Submit Justification
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/student/courses") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/student/courses">
                <BookOpen className="h-4 w-4 mr-2" />
                My Courses
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/student/profile") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/student/profile">
                <Users className="h-4 w-4 mr-2" />
                My Profile
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
