import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, Home, QrCode, Settings, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { StudentDashboard } from "./dashboard"
import { StudentSidebar } from "./sidebar"

export default function StudentPage() {
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
            <h1 className="text-xl font-bold text-slate-800">Student Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <Users className="h-4 w-4 text-slate-600" />
              </div>
              <span className="text-sm font-medium">Mohammed</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
            <p className="text-slate-600">Welcome to the student portal</p>
          </div>

          <Tabs defaultValue="dashboard">
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="scan-qr">
                <QrCode className="h-4 w-4 mr-2" />
                Scan QR Code
              </TabsTrigger>
              <TabsTrigger value="absences">
                <Calendar className="h-4 w-4 mr-2" />
                My Absences
              </TabsTrigger>
              <TabsTrigger value="justifications">
                <FileText className="h-4 w-4 mr-2" />
                Submit Justification
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <StudentDashboard />
            </TabsContent>

            <TabsContent value="scan-qr">
              <Card>
                <CardHeader>
                  <CardTitle>Scan QR Code</CardTitle>
                  <CardDescription>Scan the QR code to register your attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">QR code scanning interface will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="absences">
              <Card>
                <CardHeader>
                  <CardTitle>My Absences</CardTitle>
                  <CardDescription>View your absence history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Absence history interface will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="justifications">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Justification</CardTitle>
                  <CardDescription>Submit documents to justify your absences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Justification submission interface will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
