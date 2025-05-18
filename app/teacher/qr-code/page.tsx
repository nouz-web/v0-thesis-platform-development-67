"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { QrCode, Download, Share2, Clock, RefreshCw } from "lucide-react"
import { TeacherSidebar } from "../sidebar"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"

export default function QRCodePage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [selectedCourse, setSelectedCourse] = useState("")
  const [sessionType, setSessionType] = useState("lecture")
  const [validity, setValidity] = useState("10")
  const [qrGenerated, setQrGenerated] = useState(false)
  const [qrValue, setQrValue] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    if (qrGenerated && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (qrGenerated && timeLeft === 0) {
      // Auto-refresh QR code when time expires
      handleGenerateQR()
    }
  }, [qrGenerated, timeLeft])

  const handleGenerateQR = () => {
    if (selectedCourse) {
      // In a real app, this would be an API call to generate a unique QR code
      const timestamp = new Date().getTime()
      const randomValue = Math.random().toString(36).substring(2, 8)
      const newQrValue = `${selectedCourse}_${sessionType}_${timestamp}_${randomValue}_${refreshCount}`

      setQrValue(newQrValue)
      setQrGenerated(true)
      setTimeLeft(Number.parseInt(validity) * 60) // Convert minutes to seconds
      setRefreshCount(refreshCount + 1)

      toast({
        title: "QR Code Generated",
        description: `QR code for ${selectedCourse} has been generated. It will refresh in ${validity} minutes.`,
      })
    }
  }

  const handleDownload = () => {
    // For SVG, we need a different approach to download
    const svgElement = document.getElementById("qr-code")
    if (svgElement) {
      // Create a canvas element
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      // Create an image element to draw the SVG to canvas
      const img = new Image()
      const svgData = new XMLSerializer().serializeToString(svgElement)
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const url = URL.createObjectURL(svgBlob)

      img.onload = () => {
        // Set canvas dimensions
        canvas.width = img.width
        canvas.height = img.height

        // Draw image to canvas
        ctx.drawImage(img, 0, 0)

        // Convert canvas to PNG
        const pngUrl = canvas.toDataURL("image/png")

        // Create download link
        const link = document.createElement("a")
        link.href = pngUrl
        link.download = `qr-code-${selectedCourse}-${new Date().toISOString().slice(0, 10)}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Clean up
        URL.revokeObjectURL(url)
      }

      img.src = url
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

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
            <h1 className="text-xl font-bold text-slate-800">{t("qrCode.generate")}</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="h-5 w-5 mr-2" />
                  {t("qrCode.generate")}
                </CardTitle>
                <CardDescription>{t("qrCode.generateDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="course">{t("qrCode.selectCourse")}</Label>
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
                      <Label htmlFor="session-type">{t("qrCode.sessionType")}</Label>
                      <Select value={sessionType} onValueChange={setSessionType}>
                        <SelectTrigger id="session-type">
                          <SelectValue placeholder="Select session type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lecture">COUR</SelectItem>
                          <SelectItem value="lab">TD</SelectItem>
                          <SelectItem value="tutorial">TP</SelectItem>
                          <SelectItem value="exam">Exam</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="validity">{t("qrCode.validity")}</Label>
                      <Select value={validity} onValueChange={setValidity}>
                        <SelectTrigger id="validity">
                          <SelectValue placeholder="Select validity period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full" onClick={handleGenerateQR} disabled={!selectedCourse}>
                      {qrGenerated ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Refresh QR Code
                        </>
                      ) : (
                        t("qrCode.generate")
                      )}
                    </Button>
                  </div>

                  <div className="flex flex-col items-center justify-center border rounded-lg p-6 bg-white">
                    {qrGenerated ? (
                      <>
                        <div className="text-center mb-4">
                          <h3 className="font-medium text-lg">
                            {selectedCourse === "cs301"
                              ? "CS301: Advanced Algorithms"
                              : selectedCourse === "cs205"
                                ? "CS205: Database Systems"
                                : selectedCourse === "cs401"
                                  ? "CS401: Machine Learning"
                                  : "CS102: Introduction to Programming"}
                            {" - "}
                            {sessionType === "lecture"
                              ? "COUR"
                              : sessionType === "lab"
                                ? "TD"
                                : sessionType === "tutorial"
                                  ? "TP"
                                  : "Exam"}
                          </h3>
                          <p className="text-sm text-slate-500 flex items-center justify-center mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatTime(timeLeft)} remaining
                          </p>
                          <p className="text-xs text-slate-400 mt-1">{new Date().toLocaleString()}</p>
                        </div>

                        <div className="bg-white p-2 border rounded-lg mb-4">
                          <QRCodeSVG id="qr-code" value={qrValue} size={200} level="H" includeMargin={true} />
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleDownload}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <QrCode className="w-24 h-24 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">
                          {t("qrCode.selectCourse")} and click "{t("qrCode.generate")}" to create a unique QR code for
                          your class session
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t px-6 py-4">
                <div className="text-sm text-slate-500">
                  <p className="font-medium mb-1">{t("qrCode.howItWorks")}</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>{t("qrCode.step1")}</li>
                    <li>{t("qrCode.step2")}</li>
                    <li>{t("qrCode.step3")}</li>
                    <li>{t("qrCode.step4")}</li>
                    <li>{t("qrCode.step5")}</li>
                  </ol>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
