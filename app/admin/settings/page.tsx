"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminSidebar } from "../sidebar"
import { useToast } from "@/components/ui/use-toast"
import { Settings, Bell, Shield, Database, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SettingsPage() {
  const { toast } = useToast()
  const [generalSettings, setGeneralSettings] = useState({
    universityName: "Abbas Laghrour University Khenchela",
    academicYear: "2022-2023",
    semester: "Spring",
    timezone: "Africa/Algiers",
    language: "en",
  })

  const [attendanceSettings, setAttendanceSettings] = useState({
    maxTDAbsences: 2,
    maxCOURAbsences: 5,
    qrCodeValidity: 10,
    allowLateAttendance: true,
    lateAttendanceThreshold: 15,
    autoRefreshQR: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    absenceWarnings: true,
    justificationUpdates: true,
    systemAnnouncements: true,
    dailyReports: false,
    weeklyReports: true,
  })

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully.",
    })
  }

  const handleSaveAttendance = () => {
    toast({
      title: "Settings Saved",
      description: "Attendance settings have been updated successfully.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Settings Saved",
      description: "Notification settings have been updated successfully.",
    })
  }

  const handleResetSettings = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
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
            <h1 className="text-xl font-bold text-slate-800">Settings</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
            <p className="text-slate-600">Configure system parameters and rules</p>
          </div>

          <Tabs defaultValue="general">
            <TabsList className="mb-6">
              <TabsTrigger value="general">
                <Settings className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="attendance">
                <Calendar className="h-4 w-4 mr-2" />
                Attendance
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="database">
                <Database className="h-4 w-4 mr-2" />
                Database
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Basic system configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="university-name">University Name</Label>
                      <Input
                        id="university-name"
                        value={generalSettings.universityName}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, universityName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="academic-year">Academic Year</Label>
                      <Input
                        id="academic-year"
                        value={generalSettings.academicYear}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, academicYear: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Current Semester</Label>
                      <Select
                        value={generalSettings.semester}
                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, semester: value })}
                      >
                        <SelectTrigger id="semester">
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fall">Fall</SelectItem>
                          <SelectItem value="Spring">Spring</SelectItem>
                          <SelectItem value="Summer">Summer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={generalSettings.timezone}
                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                      >
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Algiers">Africa/Algiers (GMT+1)</SelectItem>
                          <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Select
                        value={generalSettings.language}
                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, language: value })}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleResetSettings}>
                    Reset to Default
                  </Button>
                  <Button onClick={handleSaveGeneral}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Settings</CardTitle>
                  <CardDescription>Configure attendance rules and parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-td-absences">Maximum TD Absences</Label>
                      <Input
                        id="max-td-absences"
                        type="number"
                        min="1"
                        max="10"
                        value={attendanceSettings.maxTDAbsences}
                        onChange={(e) =>
                          setAttendanceSettings({
                            ...attendanceSettings,
                            maxTDAbsences: Number.parseInt(e.target.value),
                          })
                        }
                      />
                      <p className="text-xs text-slate-500">
                        Maximum number of absences allowed for TD sessions before penalties
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-cour-absences">Maximum COUR Absences</Label>
                      <Input
                        id="max-cour-absences"
                        type="number"
                        min="1"
                        max="10"
                        value={attendanceSettings.maxCOURAbsences}
                        onChange={(e) =>
                          setAttendanceSettings({
                            ...attendanceSettings,
                            maxCOURAbsences: Number.parseInt(e.target.value),
                          })
                        }
                      />
                      <p className="text-xs text-slate-500">
                        Maximum number of absences allowed for COUR sessions before penalties
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qr-validity">QR Code Validity (minutes)</Label>
                      <Input
                        id="qr-validity"
                        type="number"
                        min="1"
                        max="60"
                        value={attendanceSettings.qrCodeValidity}
                        onChange={(e) =>
                          setAttendanceSettings({
                            ...attendanceSettings,
                            qrCodeValidity: Number.parseInt(e.target.value),
                          })
                        }
                      />
                      <p className="text-xs text-slate-500">
                        How long a generated QR code remains valid for attendance
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="late-threshold">Late Attendance Threshold (minutes)</Label>
                      <Input
                        id="late-threshold"
                        type="number"
                        min="1"
                        max="30"
                        value={attendanceSettings.lateAttendanceThreshold}
                        onChange={(e) =>
                          setAttendanceSettings({
                            ...attendanceSettings,
                            lateAttendanceThreshold: Number.parseInt(e.target.value),
                          })
                        }
                      />
                      <p className="text-xs text-slate-500">Maximum minutes late that still count as present</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-late">Allow Late Attendance</Label>
                        <p className="text-xs text-slate-500">
                          Allow students to register attendance after class has started
                        </p>
                      </div>
                      <Switch
                        id="allow-late"
                        checked={attendanceSettings.allowLateAttendance}
                        onCheckedChange={(checked) =>
                          setAttendanceSettings({ ...attendanceSettings, allowLateAttendance: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-refresh">Auto-refresh QR Codes</Label>
                        <p className="text-xs text-slate-500">Automatically refresh QR codes when they expire</p>
                      </div>
                      <Switch
                        id="auto-refresh"
                        checked={attendanceSettings.autoRefreshQR}
                        onCheckedChange={(checked) =>
                          setAttendanceSettings({ ...attendanceSettings, autoRefreshQR: checked })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleResetSettings}>
                    Reset to Default
                  </Button>
                  <Button onClick={handleSaveAttendance}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure system notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-xs text-slate-500">Send notifications via email to users</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="absence-warnings">Absence Warnings</Label>
                        <p className="text-xs text-slate-500">Send warnings when students approach absence limits</p>
                      </div>
                      <Switch
                        id="absence-warnings"
                        checked={notificationSettings.absenceWarnings}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, absenceWarnings: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="justification-updates">Justification Updates</Label>
                        <p className="text-xs text-slate-500">Notify when student justifications are updated</p>
                      </div>
                      <Switch
                        id="justification-updates"
                        checked={notificationSettings.justificationUpdates}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, justificationUpdates: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="system-announcements">System Announcements</Label>
                        <p className="text-xs text-slate-500">Receive system announcements and updates</p>
                      </div>
                      <Switch
                        id="system-announcements"
                        checked={notificationSettings.systemAnnouncements}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, systemAnnouncements: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="daily-reports">Daily Reports</Label>
                        <p className="text-xs text-slate-500">Receive daily reports via email</p>
                      </div>
                      <Switch
                        id="daily-reports"
                        checked={notificationSettings.dailyReports}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, dailyReports: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekly-reports">Weekly Reports</Label>
                        <p className="text-xs text-slate-500">Receive weekly reports via email</p>
                      </div>
                      <Switch
                        id="weekly-reports"
                        checked={notificationSettings.weeklyReports}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleResetSettings}>
                    Reset to Default
                  </Button>
                  <Button onClick={handleSaveNotifications}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure security parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">{/* Security settings content here */}</CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleResetSettings}>
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() =>
                      toast({
                        title: "Security Settings Saved",
                        description: "Security settings have been updated successfully.",
                      })
                    }
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle>Database Settings</CardTitle>
                  <CardDescription>Configure database parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">{/* Database settings content here */}</CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleResetSettings}>
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() =>
                      toast({
                        title: "Database Settings Saved",
                        description: "Database settings have been updated successfully.",
                      })
                    }
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
