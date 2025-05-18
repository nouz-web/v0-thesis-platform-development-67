"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Upload, Check, X } from "lucide-react"
import { StudentSidebar } from "../sidebar"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import Image from "next/image"

export default function JustificationPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [selectedCourse, setSelectedCourse] = useState("")
  const [absenceDate, setAbsenceDate] = useState("")
  const [reason, setReason] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      handleFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      handleFile(selectedFile)
    }
  }

  const handleFile = (selectedFile: File) => {
    // Check file type
    const validTypes = ["application/pdf", "image/jpeg", "image/png"]
    if (!validTypes.includes(selectedFile.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF, JPG, or PNG file.",
      })
      return
    }

    // Check file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
      })
      return
    }

    setFile(selectedFile)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCourse || !absenceDate || !reason || !file) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all fields and upload a document.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to upload the file and submit the justification
      // const formData = new FormData()
      // formData.append("file", file)
      // formData.append("course", selectedCourse)
      // formData.append("date", absenceDate)
      // formData.append("reason", reason)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSuccess(true)
      toast({
        title: "Justification submitted",
        description: "Your absence justification has been submitted successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "An error occurred while submitting your justification. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSelectedCourse("")
    setAbsenceDate("")
    setReason("")
    setFile(null)
    setIsSuccess(false)
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
            <h1 className="text-xl font-bold text-slate-800">{t("justification.submit")}</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-3xl mx-auto">
            {isSuccess ? (
              <Card>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>{t("justification.success")}</CardTitle>
                  <CardDescription>{t("justification.successDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-500">{t("justification.course")}:</span>
                      <span className="font-medium">
                        {selectedCourse === "cs301"
                          ? "CS301: Advanced Algorithms"
                          : selectedCourse === "cs205"
                            ? "CS205: Database Systems"
                            : selectedCourse === "cs401"
                              ? "CS401: Machine Learning"
                              : "CS102: Introduction to Programming"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-500">{t("justification.date")}:</span>
                      <span className="font-medium">{absenceDate}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-500">{t("justification.reason")}:</span>
                      <span className="font-medium">{reason}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">{t("justification.document")}:</span>
                      <span className="font-medium">{file?.name}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetForm}>
                    {t("justification.submitButton")}
                  </Button>
                  <Button asChild>
                    <Link href="/student">{t("common.dashboard")}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{t("justification.submit")}</CardTitle>
                  <CardDescription>{t("justification.submitDesc")}</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="course">{t("justification.course")}</Label>
                      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger id="course">
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs301">CS301: Advanced Algorithms</SelectItem>
                          <SelectItem value="cs205">CS205: Database Systems</SelectItem>
                          <SelectItem value="cs401">CS401: Machine Learning</SelectItem>
                          <SelectItem value="cs102">CS102: Introduction to Programming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">{t("justification.date")}</Label>
                      <Input
                        id="date"
                        type="date"
                        value={absenceDate}
                        onChange={(e) => setAbsenceDate(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">{t("justification.reason")}</Label>
                      <Select value={reason} onValueChange={setReason}>
                        <SelectTrigger id="reason">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="family">Family Emergency</SelectItem>
                          <SelectItem value="academic">Academic Conflict</SelectItem>
                          <SelectItem value="transport">Transportation Issue</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {reason === "other" && (
                      <div className="space-y-2">
                        <Label htmlFor="other-reason">Specify Reason</Label>
                        <Textarea id="other-reason" placeholder="Please specify your reason for absence" />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="document">{t("justification.document")}</Label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center ${
                          isDragging ? "border-primary bg-primary/5" : "border-slate-200"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        {file ? (
                          <div className="flex items-center justify-center gap-2">
                            <FileText className="h-6 w-6 text-slate-500" />
                            <span className="font-medium">{file.name}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              onClick={() => setFile(null)}
                              className="ml-2"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-600 mb-1">{t("justification.dragDrop")}</p>
                            <p className="text-xs text-slate-500">{t("justification.fileTypes")}</p>
                            <Input
                              id="document"
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleFileChange}
                            />
                            <Button
                              variant="outline"
                              type="button"
                              className="mt-4"
                              onClick={() => document.getElementById("document")?.click()}
                            >
                              {t("justification.uploadDocument")}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? t("common.loading") : t("justification.submitButton")}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
