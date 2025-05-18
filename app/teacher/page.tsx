import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, Home, QrCode, Settings, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TeacherDashboard } from "./dashboard"
import { TeacherSidebar } from "./sidebar"

export default function TeacherPage() {
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
            <h1 className="text-xl font-bold text-slate-800">Teacher Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-slate-600" />
              </div>
              <span className="text-sm font-medium">Dr. Ahmed</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
            <p className="text-slate-600">Welcome to the teacher portal</p>
          </div>

          <Tabs defaultValue="dashboard">
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="qr-code">
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </TabsTrigger>
              <TabsTrigger value="attendance">
                <Users className="h-4 w-4 mr-2" />
                Attendance
              </TabsTrigger>
              <TabsTrigger value="justifications">
                <FileText className="h-4 w-4 mr-2" />
                Justifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <TeacherDashboard />
            </TabsContent>

            <TabsContent value="qr-code">
              <Card>
                <CardHeader>
                  <CardTitle>Generate QR Code</CardTitle>
                  <CardDescription>Create a QR code for your current session</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">QR code generation interface will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                  <CardDescription>View and manage student attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Attendance records interface will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="justifications">
              <Card>
                <CardHeader>
                  <CardTitle>Absence Justifications</CardTitle>
                  <CardDescription>Review and approve student absence justifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Justifications interface will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
