"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Video, ExternalLink } from "lucide-react"
import { StudentSidebar } from "../sidebar"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import Image from "next/image"

export default function SpecialLessonsPage() {
  const { t } = useLanguage()

  // Mock special lessons data
  const specialLessons = [
    {
      id: "1",
      title: "Advanced Database Concepts",
      course: "CS205: Database Systems",
      date: "2023-05-05",
      type: "PDF",
      size: "2.4 MB",
      description: "Comprehensive guide to advanced database concepts including normalization and query optimization.",
    },
    {
      id: "2",
      title: "Machine Learning Algorithms",
      course: "CS401: Machine Learning",
      date: "2023-05-03",
      type: "PDF",
      size: "3.1 MB",
      description: "Overview of common machine learning algorithms and their applications.",
    },
    {
      id: "3",
      title: "Programming Fundamentals",
      course: "CS102: Introduction to Programming",
      date: "2023-04-28",
      type: "PDF",
      size: "1.8 MB",
      description: "Introduction to programming concepts and basic algorithms.",
    },
    {
      id: "4",
      title: "Database Design Tutorial",
      course: "CS205: Database Systems",
      date: "2023-04-25",
      type: "Video",
      size: "45 min",
      description: "Step-by-step tutorial on designing efficient database schemas.",
    },
    {
      id: "5",
      title: "Neural Networks Explained",
      course: "CS401: Machine Learning",
      date: "2023-04-20",
      type: "Video",
      size: "32 min",
      description: "Visual explanation of neural networks and deep learning concepts.",
    },
    {
      id: "6",
      title: "Algorithm Complexity Analysis",
      course: "CS301: Advanced Algorithms",
      date: "2023-04-15",
      type: "PDF",
      size: "2.2 MB",
      description: "Guide to analyzing time and space complexity of algorithms.",
    },
    {
      id: "7",
      title: "Interactive Sorting Algorithms",
      course: "CS301: Advanced Algorithms",
      date: "2023-04-10",
      type: "Link",
      url: "https://visualgo.net/en/sorting",
      description: "Interactive visualization of various sorting algorithms.",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "Video":
        return <Video className="h-5 w-5 text-red-500" />
      case "Link":
        return <ExternalLink className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-slate-500" />
    }
  }

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
            <h1 className="text-xl font-bold text-slate-800">{t("student.specialLessons")}</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">{t("student.specialLessons")}</h2>
            <p className="text-slate-600">{t("student.uploadedMaterials")}</p>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Materials</TabsTrigger>
              <TabsTrigger value="cs301">Advanced Algorithms</TabsTrigger>
              <TabsTrigger value="cs205">Database Systems</TabsTrigger>
              <TabsTrigger value="cs401">Machine Learning</TabsTrigger>
              <TabsTrigger value="cs102">Introduction to Programming</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialLessons.map((lesson) => (
                  <Card key={lesson.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {getTypeIcon(lesson.type)}
                          <CardTitle className="ml-2 text-lg">{lesson.title}</CardTitle>
                        </div>
                        <Badge variant="outline">{lesson.type}</Badge>
                      </div>
                      <CardDescription>{lesson.course}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 mb-4">{lesson.description}</p>
                      <div className="flex justify-between items-center text-sm text-slate-500">
                        <span>Added: {lesson.date}</span>
                        <span>{lesson.size}</span>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-4">
                      {lesson.type === "Link" ? (
                        <Button variant="outline" className="w-full" asChild>
                          <a href={lesson.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Link
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cs301">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialLessons
                  .filter((lesson) => lesson.course === "CS301: Advanced Algorithms")
                  .map((lesson) => (
                    <Card key={lesson.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            {getTypeIcon(lesson.type)}
                            <CardTitle className="ml-2 text-lg">{lesson.title}</CardTitle>
                          </div>
                          <Badge variant="outline">{lesson.type}</Badge>
                        </div>
                        <CardDescription>{lesson.course}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 mb-4">{lesson.description}</p>
                        <div className="flex justify-between items-center text-sm text-slate-500">
                          <span>Added: {lesson.date}</span>
                          <span>{lesson.size}</span>
                        </div>
                      </CardContent>
                      <div className="px-6 pb-4">
                        {lesson.type === "Link" ? (
                          <Button variant="outline" className="w-full" asChild>
                            <a href={lesson.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open Link
                            </a>
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Similar content for other tabs */}
            <TabsContent value="cs205">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialLessons
                  .filter((lesson) => lesson.course === "CS205: Database Systems")
                  .map((lesson) => (
                    <Card key={lesson.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            {getTypeIcon(lesson.type)}
                            <CardTitle className="ml-2 text-lg">{lesson.title}</CardTitle>
                          </div>
                          <Badge variant="outline">{lesson.type}</Badge>
                        </div>
                        <CardDescription>{lesson.course}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 mb-4">{lesson.description}</p>
                        <div className="flex justify-between items-center text-sm text-slate-500">
                          <span>Added: {lesson.date}</span>
                          <span>{lesson.size}</span>
                        </div>
                      </CardContent>
                      <div className="px-6 pb-4">
                        {lesson.type === "Link" ? (
                          <Button variant="outline" className="w-full" asChild>
                            <a href={lesson.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open Link
                            </a>
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="cs401">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialLessons
                  .filter((lesson) => lesson.course === "CS401: Machine Learning")
                  .map((lesson) => (
                    <Card key={lesson.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            {getTypeIcon(lesson.type)}
                            <CardTitle className="ml-2 text-lg">{lesson.title}</CardTitle>
                          </div>
                          <Badge variant="outline">{lesson.type}</Badge>
                        </div>
                        <CardDescription>{lesson.course}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 mb-4">{lesson.description}</p>
                        <div className="flex justify-between items-center text-sm text-slate-500">
                          <span>Added: {lesson.date}</span>
                          <span>{lesson.size}</span>
                        </div>
                      </CardContent>
                      <div className="px-6 pb-4">
                        {lesson.type === "Link" ? (
                          <Button variant="outline" className="w-full" asChild>
                            <a href={lesson.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open Link
                            </a>
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="cs102">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialLessons
                  .filter((lesson) => lesson.course === "CS102: Introduction to Programming")
                  .map((lesson) => (
                    <Card key={lesson.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            {getTypeIcon(lesson.type)}
                            <CardTitle className="ml-2 text-lg">{lesson.title}</CardTitle>
                          </div>
                          <Badge variant="outline">{lesson.type}</Badge>
                        </div>
                        <CardDescription>{lesson.course}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 mb-4">{lesson.description}</p>
                        <div className="flex justify-between items-center text-sm text-slate-500">
                          <span>Added: {lesson.date}</span>
                          <span>{lesson.size}</span>
                        </div>
                      </CardContent>
                      <div className="px-6 pb-4">
                        {lesson.type === "Link" ? (
                          <Button variant="outline" className="w-full" asChild>
                            <a href={lesson.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open Link
                            </a>
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
