"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "../sidebar"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"

export default function AnnouncementsPage() {
  const { toast } = useToast()
  const [announcements, setAnnouncements] = useState([
    {
      id: "1",
      title: "System Maintenance",
      content: "The system will be under maintenance tonight from 2 AM to 4 AM.",
      priority: "high",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      title: "New Absence Policy",
      content: "The university has updated its absence policy. Please check the documentation.",
      priority: "normal",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      title: "End of Semester",
      content: "Reminder: The end of semester attendance reports are due next Friday.",
      priority: "low",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ])

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    priority: "normal",
    expiresAt: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
  })

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both a title and content for the announcement.",
      })
      return
    }

    // In a real app, this would be an API call
    const announcement = {
      id: Date.now().toString(),
      ...newAnnouncement,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(newAnnouncement.expiresAt).toISOString(),
    }

    setAnnouncements([announcement, ...announcements])
    setNewAnnouncement({
      title: "",
      content: "",
      priority: "normal",
      expiresAt: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
    })

    toast({
      title: "Announcement created",
      description: "Your announcement has been published successfully.",
    })
  }

  const handleDeleteAnnouncement = (id: string) => {
    // In a real app, this would be an API call
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id))

    toast({
      title: "Announcement deleted",
      description: "The announcement has been removed.",
    })
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "normal":
        return <Badge variant="default">Normal</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">Low</Badge>
    }
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
            <h1 className="text-xl font-bold text-slate-800">Announcements Management</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Manage Announcements</h2>
            <p className="text-slate-600">Create and manage announcements for the platform</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create Announcement Form */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Announcement
                </CardTitle>
                <CardDescription>Add a new announcement to the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    placeholder="Announcement title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    placeholder="Announcement content"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newAnnouncement.priority}
                    onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, priority: value })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expires">Expires At</Label>
                  <Input
                    id="expires"
                    type="date"
                    value={newAnnouncement.expiresAt}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, expiresAt: e.target.value })}
                  />
                </div>
                <Button className="w-full" onClick={handleCreateAnnouncement}>
                  Create Announcement
                </Button>
              </CardContent>
            </Card>

            {/* Announcements List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Current Announcements
                </CardTitle>
                <CardDescription>Manage existing announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {announcements.map((announcement) => (
                      <TableRow key={announcement.id}>
                        <TableCell className="font-medium">{announcement.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{announcement.content}</TableCell>
                        <TableCell>{getPriorityBadge(announcement.priority)}</TableCell>
                        <TableCell>{new Date(announcement.expiresAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteAnnouncement(announcement.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
