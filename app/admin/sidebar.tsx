"use client"

import { Button } from "@/components/ui/button"
import { BarChart, Calendar, FileText, Home, LogOut, Settings, Users, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-sm text-slate-400">Absence Management</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Button variant={isActive("/admin") ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/admin">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </li>
          <li>
            <Button variant={isActive("/admin/users") ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/admin/users">
                <Users className="h-4 w-4 mr-2" />
                User Management
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/admin/reports") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/reports">
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/admin/statistics") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/statistics">
                <BarChart className="h-4 w-4 mr-2" />
                Statistics
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/admin/calendar") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Academic Calendar
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/admin/settings") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={isActive("/admin/announcements") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/announcements">
                <Bell className="h-4 w-4 mr-2" />
                Announcements
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
